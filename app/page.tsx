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
import { client, postsQuery, categoriesQuery, urlFor } from "@/lib/sanity";
import { Post, Category } from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(postsQuery);
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Возвращаем демо-данные если Sanity не настроен
    return getDemoPosts();
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch(categoriesQuery);
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Возвращаем демо-категории если Sanity не настроен
    return getDemoCategories();
  }
}

// Демо-данные для разработки
function getDemoPosts(): Post[] {
  return [
    {
      _id: "demo-1",
      title: "Бюджетирование в условиях неопределенности: практические подходы",
      slug: { current: "budgeting-uncertainty-methods" },
      excerpt:
        "Рассматриваем современные методы составления бюджетов и прогнозирования в условиях экономической нестабильности.",
      mainImage: null,
      publishedAt: "2024-12-15T10:00:00Z",
      readTime: 7,
      featured: true,
      category: {
        title: "Бюджетирование",
        slug: { current: "budgeting" },
        color: "blue",
      },
      author: {
        name: "Елена Финансова",
        slug: { current: "elena-finansova" },
        role: "CFO",
      },
    },
    {
      _id: "demo-2",
      title: "ABC-анализ: пошаговое руководство по внедрению",
      slug: { current: "abc-analysis-implementation" },
      excerpt:
        "Подробное руководство по внедрению ABC-анализа для оптимизации затрат и повышения эффективности бизнеса.",
      mainImage: null,
      publishedAt: "2024-12-12T10:00:00Z",
      readTime: 9,
      category: {
        title: "Анализ затрат",
        slug: { current: "cost-analysis" },
        color: "green",
      },
      author: {
        name: "Михаил Аналитиков",
        slug: { current: "mikhail-analitikov" },
        role: "Финансовый аналитик",
      },
    },
  ];
}

function getDemoCategories(): Category[] {
  return [
    {
      title: "Бюджетирование",
      slug: { current: "budgeting" },
      color: "blue",
    },
    {
      title: "Анализ затрат",
      slug: { current: "cost-analysis" },
      color: "green",
    },
    {
      title: "KPI",
      slug: { current: "kpi" },
      color: "purple",
    },
    {
      title: "Отчетность",
      slug: { current: "reporting" },
      color: "red",
    },
  ];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
            <div className="flex items-center space-x-4">
              <ColorSchemeToggle />
              <ThemeToggle />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Современный блог об управленческом учете
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Изучайте методы управленческого учета, финансовую аналитику и
            инструменты для принятия управленческих решений
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
                <Card
                  key={post._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={"/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category.title}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} мин
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
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

      {/* Footer */}
      <footer className="bg-muted py-12">
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
                    Примеры кода
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
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    GitHub
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
