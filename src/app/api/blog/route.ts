import { NextResponse } from "next/server";

import { getAllPosts } from "@/data/blog";

export async function GET() {
    try {
        const posts = getAllPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
} 