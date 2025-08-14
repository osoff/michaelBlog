import { categoriesQuery, client } from "@/lib/sanity";
import { Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch(categoriesQuery);
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }
}
