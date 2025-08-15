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

export async function searchPosts(
  search?: string,
  category?: string
): Promise<Post[]> {
  try {
    let query = postsQuery;

    // Добавляем фильтры в GROQ запрос
    const filters = [];

    if (search && search.trim()) {
      filters.push(`(
        title match "*${search}*" ||
        excerpt match "*${search}*" ||
        author->name match "*${search}*" ||
        categories[]->title match "*${search}*"
      )`);
    }

    if (category && category !== "all") {
      // Сначала найдем ID категории по slug
      const categoryId = await client.fetch(
        `*[_type == "category" && slug.current == "${category}"][0]._id`
      );
      if (categoryId) {
        filters.push(`"${categoryId}" in categories[]._ref`);
      }
    }

    if (filters.length > 0) {
      query = query.replace(
        '*[_type == "post"]',
        `*[_type == "post" && ${filters.join(" && ")}]`
      );
    }

    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error("Error searching posts");
  }
}
