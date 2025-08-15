import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/services/posts";
import { getCategories } from "@/services/categories";
import { urlFor } from "@/lib/sanity";
import { formatDate } from "@/helpers";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, User, CalendarDays } from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const [posts] = await Promise.all([getPosts(), getCategories()]);

  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "demo-project-id";

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
            <Button asChild size="lg">
              <Link href="/articles">Все статьи</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Наши услуги</Link>
            </Button>
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

      {/* Latest Posts Section */}
      <section id="posts" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Последние статьи
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ознакомьтесь с нашими последними публикациями
            </p>
            <Button asChild size="lg">
              <Link href="/articles">Смотреть все статьи</Link>
            </Button>
          </div>

          {/* Latest Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <Link href={`/blog/${post.slug.current}`} key={post._id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
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
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-wrap gap-1">
                        {post.categories?.map((category) => (
                          <Badge
                            key={category.title}
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
                  <CardContent className="mt-auto">
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
        </div>
      </section>
    </div>
  );
}
