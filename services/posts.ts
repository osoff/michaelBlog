import { client, postsQuery } from "@/lib/sanity";
import { Post } from "@/lib/types";

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(postsQuery);
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
}
