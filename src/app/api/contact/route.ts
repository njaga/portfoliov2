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

async function validateTurnstile(token: string, secret: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!response.ok) return false;
    const data: { success?: boolean } = await response.json();
    return data.success === true;
  } catch {
    return false; // Network errors must never bypass CAPTCHA validation.
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
  if (!(await validateTurnstile(captchaToken, secret))) {
    return NextResponse.json({ error: "Invalid or expired security verification" }, { status: 403 });
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
