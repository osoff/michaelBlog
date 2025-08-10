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
  categoryId: string,
  currentSlug: string
): Promise<Post[]> {
  try {
    return await client.fetch(relatedPostsQuery, { categoryId, currentSlug });
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
    post.category._id!,
    post.slug.current
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              УправУчет
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary">
                Главная
              </Link>
              <Link
                href="/services"
                className="text-muted-foreground hover:text-primary">
                Услуги
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary">
                О блоге
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary">
                Контакты
              </Link>
            </nav>
          </div>
        </div>
        nvm
      </header>

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
              <Badge className="mb-4">{post.category.title}</Badge>
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
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} мин
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>

            {/* Featured Image */}
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

      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-lg mb-4">УправУчет</h3>
              <p className="text-muted-foreground">
                Современный блог об управленческом учете, финансовой аналитике и
                инструментах управления.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Бюджетирование
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Анализ затрат
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    KPI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Отчетность
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Документация
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Примеры моделей
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Туториалы
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 УправУчет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
