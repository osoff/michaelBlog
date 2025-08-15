"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Post } from "@/lib/types";
import { formatDate } from "@/helpers";
import { usePosts } from "./posts-context";
import { useUrlParams } from "@/hooks/use-url-params";
import { Pagination } from "./pagination";

interface PostsSectionProps {
  posts: Post[];
}

export function PostsSection({ posts: initialPosts }: PostsSectionProps) {
  const { filteredPosts } = usePosts();
  const { currentParams } = useUrlParams();

  const POSTS_PER_PAGE = 9;
  const currentPage = currentParams.page;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <main id="posts" className="py-12">
      <div className="container mx-auto px-4">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Статьи не найдены</h2>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить параметры поиска.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
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

        {/* Пагинация */}
        {filteredPosts.length > POSTS_PER_PAGE && (
          <Pagination
            totalPosts={filteredPosts.length}
            postsPerPage={POSTS_PER_PAGE}
            currentPage={currentPage}
          />
        )}
      </div>
    </main>
  );
}
