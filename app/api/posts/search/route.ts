import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/services/posts";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";

    const posts = await searchPosts(search, category);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
}
