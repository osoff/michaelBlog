"use client";

import { useState, useEffect, useCallback } from "react";
import { Post } from "@/lib/types";

interface UseSearchPostsProps {
  initialPosts: Post[];
}

export function useSearchPosts({ initialPosts }: UseSearchPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPosts = useCallback(
    async (search: string, category: string) => {
      // Если нет фильтров, возвращаем все посты
      if (!search.trim() && category === "all") {
        setPosts(initialPosts);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (search.trim()) params.append("search", search);
        if (category !== "all") params.append("category", category);

        const response = await fetch(`/api/posts/search?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to search posts");
        }

        const searchResults = await response.json();
        setPosts(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setPosts(initialPosts); // Fallback to initial posts
      } finally {
        setIsLoading(false);
      }
    },
    [initialPosts]
  );

  return {
    posts,
    isLoading,
    error,
    searchPosts,
  };
}
