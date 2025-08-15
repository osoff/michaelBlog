import { getPosts } from "@/services/posts";
import { getCategories } from "@/services/categories";
import { PostsFilter } from "@/components/posts-filter";
import { PostsSection } from "@/components/posts-section";
import { PostsProvider } from "@/components/posts-context";

export const revalidate = 0;

export default async function ArticlesPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
            Все статьи
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Изучайте актуальные IT решения и технологии для развития вашего
            бизнеса
          </p>
        </div>
      </section>

      {/* Posts Filter and Posts Section */}
      <PostsProvider initialPosts={posts}>
        <PostsFilter posts={posts} categories={categories} />
      </PostsProvider>
    </div>
  );
}
