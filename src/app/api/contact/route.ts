import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
  captchaToken: z.string().min(1).max(2048),
  website: z.string().max(0).optional(),
  locale: z.enum(["fr", "en"]).default("fr"),
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const encoded: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return encoded[char];
  });
}

type TurnstileResult =
  | { success: true }
  | { success: false; reason: "config" | "expired" | "invalid" | "unavailable" };

async function validateTurnstile(token: string, secret: string): Promise<TurnstileResult> {
  try {
    // Cloudflare supports both JSON and urlencoded requests. JSON keeps the
    // wire format unambiguous, and Siteverify always responds with JSON.
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secret.trim(), response: token }),
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      }
    );

    // Siteverify may return useful error-codes with HTTP 400 (not only 200).
    // Inspect them before classifying the failure. Never log tokens or secrets.
    let data: { success?: boolean; "error-codes"?: string[] };
    try {
      data = await response.json();
    } catch {
      console.error("[contact] Turnstile returned non-JSON response", {
        status: response.status,
      });
      return { success: false, reason: "unavailable" };
    }

    const codes = Array.isArray(data["error-codes"]) ? data["error-codes"] : [];
    if (response.ok && data.success === true) return { success: true };

    console.warn("[contact] Turnstile Siteverify rejected request", {
      status: response.status,
      codes,
    });

    if (
      codes.some((code) =>
        ["invalid-input-secret", "missing-input-secret", "invalid-widget-id", "invalid-parsed-secret", "bad-request"].includes(code)
      )
    ) {
      return { success: false, reason: "config" };
    }
    if (codes.includes("timeout-or-duplicate")) {
      return { success: false, reason: "expired" };
    }
    if (codes.includes("invalid-input-response") || codes.includes("missing-input-response")) {
      return { success: false, reason: "invalid" };
    }
    if (!response.ok && response.status === 400) {
      return { success: false, reason: "config" };
    }
    return { success: false, reason: "unavailable" };
  } catch (error) {
    console.error("[contact] Turnstile verification request failed", {
      error: error instanceof Error ? error.name : "Unknown",
    });
    return { success: false, reason: "unavailable" };
  }
}

export async function POST(request: NextRequest) {
  // Reject cross-site browser submissions, without trusting this check as bot protection.
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 9000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 9000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = contactSchema.safeParse(payload);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return NextResponse.json({ error: "Contact service unavailable" }, { status: 503 });
  }

  const { name, email, subject, message, captchaToken, locale } = validated.data;
  const verification = await validateTurnstile(captchaToken, secret);
  if (!verification.success) {
    const responses = {
      config: { status: 503, code: "captcha_config", error: "Security verification configuration error" },
      expired: { status: 403, code: "captcha_expired", error: "Security verification expired. Please retry" },
      invalid: { status: 403, code: "captcha_invalid", error: "Security verification failed. Please retry" },
      unavailable: { status: 503, code: "captcha_unavailable", error: "Security verification temporarily unavailable" },
    } as const;
    const failure = responses[verification.reason];
    return NextResponse.json(
      { error: failure.error, code: failure.code },
      { status: failure.status }
    );
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const fields = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  };
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Dakar",
  }).format(new Date());

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "contact@ndiagandiaye.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px">
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Subject:</strong> ${fields.subject}</p>
        <p style="white-space:pre-wrap">${fields.message}</p>
        <p>${escapeHtml(date)} (Dakar)</p></div>`,
      text: `New portfolio message\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n\n${date} (Dakar)`,
    });

    // The main message is already delivered; a confirmation failure must not
    // cause duplicate submissions.
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: locale === "fr" ? "Message reçu — Ndiaga Ndiaye" : "Message received — Ndiaga Ndiaye",
        text: locale === "fr"
          ? `Bonjour ${name},\n\nJ'ai bien reçu votre message. Je vous répondrai dès que possible.\n\nNdiaga Ndiaye`
          : `Hello ${name},\n\nI have received your message. I'll get back to you as soon as possible.\n\nNdiaga Ndiaye`,
      });
    } catch {
      console.warn("Contact confirmation email could not be delivered.");
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch {
    console.error("Portfolio contact SMTP delivery failed.");
    return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
  }
}
