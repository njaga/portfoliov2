import { NextResponse } from "next/server";

// Preview-only temporary endpoint for checking an ambiguous character
// in the server-side Turnstile secret. Remove this route after diagnosis.
export const dynamic = "force-dynamic";

async function verifySecret(secret: string) {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: "not-a-valid-turnstile-response-token-for-diagnostics",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const data = await response.json() as { success?: boolean; "error-codes"?: string[] };
    return {
      httpStatus: response.status,
      codes: Array.isArray(data["error-codes"]) ? data["error-codes"] : [],
    };
  } catch {
    return { httpStatus: 0, codes: ["request-failed"] };
  }
}

export async function GET(request: Request) {
  if (
    process.env.VERCEL_ENV !== "preview" ||
    new URL(request.url).searchParams.get("audit") !== "turnstile-audit-nov-9"
  ) {
    return new Response(null, { status: 404 });
  }

  const stored = process.env.TURNSTILE_SECRET_KEY || "";
  if (!stored) return NextResponse.json({ error: "secret-not-configured" }, { status: 503 });

  const variants = [
    ["stored", stored],
    ["letter-l-instead-of-one", stored.replace("bk14", "bkl4")],
    ["zero-instead-of-o", stored.replace("dbo", "db0")],
    ["letter-l-and-zero", stored.replace("bk14", "bkl4").replace("dbo", "db0")],
  ] as const;
  const results = [];
  for (const [name, value] of variants) {
    results.push({ name, ...(await verifySecret(value)) });
  }
  return NextResponse.json({ results }, { headers: { "Cache-Control": "no-store" } });
}
