import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getAllPosts } from "@/data/blog";
import { defaultLocale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  try {
    const requested = request.nextUrl.searchParams.get("lang");
    const candidate = requested || request.cookies.get("locale")?.value;
    const locale = candidate === "fr" || candidate === "en" ? candidate : defaultLocale;

    const posts = getAllPosts(locale);
    return NextResponse.json(posts, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
