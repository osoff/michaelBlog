"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Post, Category } from "@/lib/types";
import { usePosts } from "./posts-context";
import { useUrlParams } from "@/hooks/use-url-params";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchPosts } from "@/hooks/use-search-posts";
import { PostsSection } from "./posts-section";

interface PostsFilterProps {
  posts: Post[];
  categories: Category[];
}

export function PostsFilter({ posts, categories }: PostsFilterProps) {
  const { currentParams, updateParams, clearFilters } = useUrlParams();
  const { setFilteredPosts, setIsLoading } = usePosts();

  const [searchInput, setSearchInput] = useState(currentParams.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    posts: searchResults,
    isLoading,
    searchPosts,
  } = useSearchPosts({
    initialPosts: posts,
  });

  const allCategories = [
    { title: "Все", slug: { current: "all" } },
    ...categories,
  ];

  // Выполняем поиск при изменении фильтров
  useEffect(() => {
    // Всегда выполняем поиск при изменении фильтров
    searchPosts(debouncedSearch, currentParams.category);
  }, [debouncedSearch, currentParams.category, searchPosts]);

  // Обновляем контекст при изменении результатов поиска
  useEffect(() => {
    setFilteredPosts(searchResults);
  }, [searchResults, setFilteredPosts]);

  // Обновляем URL при изменении debounced поиска
  useEffect(() => {
    if (debouncedSearch !== currentParams.search) {
      updateParams({ search: debouncedSearch });
    }
  }, [debouncedSearch, currentParams.search, updateParams]);

  const hasActiveFilters =
    currentParams.category !== "all" || debouncedSearch.trim() !== "";

  return (
    <>
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Поиск */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск статей..."
                  className="pl-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {searchInput.trim() !== "" && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchInput("");
                    updateParams({ search: "" });
                  }}
                  className="shrink-0">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Категории */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allCategories.map((category) => (
                <Badge
                  key={category.slug.current}
                  variant={
                    category.slug.current === currentParams.category
                      ? "default"
                      : "secondary"
                  }
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    if (category.slug.current === currentParams.category)
                      return; // Не делаем ничего если категория уже активна

                    if (category.slug.current === "all") {
                      // При нажатии на "Все" сбрасываем только фильтр категории
                      updateParams({ category: "all" });
                    } else {
                      // При нажатии на категорию обновляем только категорию
                      updateParams({ category: category.slug.current });
                    }
                  }}>
                  {category.title}
                </Badge>
              ))}
            </div>

            {/* Информация о результатах */}
            {hasActiveFilters && (
              <div className="text-center text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Загрузка...
                  </div>
                ) : (
                  `Найдено ${searchResults.length} из ${posts.length} статей`
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <PostsSection posts={posts} isLoading={isLoading} />
    </>
  );
}
