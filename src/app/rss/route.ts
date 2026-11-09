import { renderRss } from "@/lib/rss";
import { getRequestLocale } from "@/lib/server-locale";

export const dynamic = "force-dynamic";

export async function GET() {
  const locale = await getRequestLocale();
  return new Response(renderRss(locale), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
