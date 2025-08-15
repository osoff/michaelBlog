"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useUrlParams } from "@/hooks/use-url-params";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
}

export function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
}: PaginationProps) {
  const { updateParams } = useUrlParams();

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParams({ page });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Показываем все страницы
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(i)}
            className="min-w-[40px]">
            {i}
          </Button>
        );
      }
    } else {
      // Показываем ограниченное количество страниц
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Первая страница
      if (startPage > 1) {
        pages.push(
          <Button
            key={1}
            variant="outline"
            size="sm"
            onClick={() => goToPage(1)}
            className="min-w-[40px]">
            1
          </Button>
        );

        if (startPage > 2) {
          pages.push(
            <span key="dots1" className="flex items-center px-2">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }
      }

      // Видимые страницы
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(i)}
            className="min-w-[40px]">
            {i}
          </Button>
        );
      }

      // Последняя страница
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="dots2" className="flex items-center px-2">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        pages.push(
          <Button
            key={totalPages}
            variant="outline"
            size="sm"
            onClick={() => goToPage(totalPages)}
            className="min-w-[40px]">
            {totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" />
        Назад
      </Button>

      <div className="flex items-center gap-1">{renderPageNumbers()}</div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1">
        Вперед
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
