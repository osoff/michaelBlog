import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Проверяем наличие переменных окружения
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Using demo project.");
}

if (!dataset) {
  console.warn(
    "NEXT_PUBLIC_SANITY_DATASET is not set. Using production dataset."
  );
}

export const client = createClient({
  projectId: projectId || "demo-project-id",
  dataset: dataset || "production",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    previewImage,
    publishedAt,
    readTime,
    featured,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      slug,
      image,
      role
    }
  }
`;

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    previewImage,
    publishedAt,
    readTime,
    content,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      slug,
      image,
      role,
      bio,
      email,
      social
    },
    seo
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`;

export const relatedPostsQuery = `
  *[_type == "post" && category._ref == $categoryId && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    previewImage,
    category->{
      title,
      slug,
      color
    }
  }
`;
