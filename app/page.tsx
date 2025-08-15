import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPosts } from "@/services/posts";
import { getCategories } from "@/services/categories";
import { PostsFilter } from "@/components/posts-filter";
import { PostsSection } from "@/components/posts-section";
import { PostsProvider } from "@/components/posts-context";

export const revalidate = 0;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

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
              <Link href="#posts">Читать статьи</Link>
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

      {/* Posts Filter and Posts Section */}
      <PostsProvider initialPosts={posts}>
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <PostsFilter posts={posts} categories={categories} />
          </div>
        </section>

        {/* Blog Posts */}
        <PostsSection posts={posts} />
      </PostsProvider>
    </div>
  );
}
