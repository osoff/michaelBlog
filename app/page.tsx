import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { getPosts } from "@/services/posts";
import { getCategories } from "@/services/categories";
import { formatDate } from "@/helpers";

export const revalidate = 0;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "demo-project-id";

  const allCategories = [
    { title: "Все", slug: { current: "all" } },
    ...categories,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
            Современные IT решения для Вашего бизнеса
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Знакомим Вас с актуальными решениями для управления собственным
            бизнесом и достижением максимального результата
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Поиск статей..." className="pl-10" />
            </div>
            <Button>Найти</Button>
          </div>
        </div>
      </section>

      {!isSanityConfigured && (
        <section className="py-8 bg-yellow-50 border-y border-yellow-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                🚀 Настройте Sanity CMS
              </h2>
              <p className="text-yellow-700 mb-4">
                Для полноценной работы блога настройте переменные окружения
                Sanity. Сейчас отображаются демо-данные.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/studio">Открыть CMS Studio</Link>
                </Button>
                <Button asChild>
                  <Link href="https://sanity.io" target="_blank">
                    Создать проект Sanity
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category) => (
              <Badge
                key={category.slug.current}
                variant={
                  category.slug.current === "all" ? "default" : "secondary"
                }
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {category.title}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Статьи не найдены</h2>
              <p className="text-muted-foreground mb-6">
                Пока что статей нет. Добавьте их через Sanity CMS.
              </p>
              <Button asChild>
                <Link href="/studio">Открыть CMS</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug.current}`} key={post._id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={
                          post.previewImage
                            ? urlFor(post.previewImage).url()
                            : "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-wrap gap-1">
                          {post.categories?.map((category) => (
                            <Badge
                              key={category._id}
                              variant="secondary"
                              className={
                                category.color
                                  ? `bg-${category.color}-100 text-${category.color}-800 dark:bg-${category.color}-900 dark:text-${category.color}-200`
                                  : ""
                              }>
                              {category.title}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground shrink-0">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime} мин
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Загрузить еще статьи
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
