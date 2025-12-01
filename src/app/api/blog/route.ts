import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAllPosts } from "@/data/blog";
import { defaultLocale } from "@/lib/i18n";

export async function GET() {
  try {
    // Récupérer la locale depuis les cookies
    const cookieStore = await cookies();
    const locale =
      (cookieStore.get("locale")?.value as "fr" | "en") || defaultLocale;

    const posts = getAllPosts(locale);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
