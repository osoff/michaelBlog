"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Post } from "@/lib/types";

interface PostsContextType {
  filteredPosts: Post[];
  setFilteredPosts: (posts: Post[]) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({
  children,
  initialPosts,
}: {
  children: ReactNode;
  initialPosts: Post[];
}) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  return (
    <PostsContext.Provider value={{ filteredPosts, setFilteredPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
