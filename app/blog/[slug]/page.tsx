import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CalendarDays, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client, postQuery, relatedPostsQuery, urlFor } from "@/lib/sanity";
import { Post } from "@/lib/types";
import { PortableTextRenderer } from "@/components/portable-text";
import { notFound } from "next/navigation";

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(postQuery, { slug });
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(
  categoryIds: string[],
  currentSlug: string
): Promise<Post[]> {
  try {
    // Получаем посты, которые имеют хотя бы одну из категорий текущего поста
    const relatedPosts = await client.fetch(
      `
      *[_type == "post" && slug.current != $currentSlug && count(categories[]._ref in $categoryIds) > 0] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        mainImage,
        previewImage,
        categories[]->{
          title,
          slug,
          color
        }
      }
    `,
      { categoryIds, currentSlug }
    );

    return relatedPosts || [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    post.categories?.map((cat) => cat._id!) || [],
    post.slug.current
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к статьям
          </Link>

          {/* Article Header */}
          <article className="prose prose-gray dark:prose-invert max-w-none">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories?.map((category) => (
                  <Badge
                    key={category._id}
                    className={
                      category.color
                        ? `bg-${category.color}-100 text-${category.color}-800 dark:${category.color}-900 dark:text-${category.color}-200`
                        : ""
                    }>
                    {category.title}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {post.author.name}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {/* <Clock className="w-4 h-4 mr-1" /> */}
                    Время чтения - {post.readTime} мин
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.mainImage && (
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <Image
                  src={
                    urlFor(post.mainImage).width(1200).height(600).url() ||
                    "/placeholder.svg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <PortableTextRenderer content={post.content || []} />
            </div>
          </article>

          <Separator className="my-12" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={
                          urlFor(relatedPost.mainImage)
                            .width(400)
                            .height(300)
                            .url() || "/placeholder.svg"
                        }
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 hover:text-primary">
                        <Link href={`/blog/${relatedPost.slug.current}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
