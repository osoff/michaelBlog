"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface FilterParams {
  search?: string;
  category?: string;
  page?: number;
}

export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "all",
      page: parseInt(searchParams.get("page") || "1", 10),
    }),
    [searchParams]
  );

  const updateParams = useCallback(
    (newParams: Partial<FilterParams>) => {
      const params = new URLSearchParams(searchParams);

      // Обновляем параметры
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "page" && value === 1) {
            params.delete(key); // Убираем page=1 из URL
          } else {
            params.set(key, String(value));
          }
        } else {
          params.delete(key);
        }
      });

      // Сбрасываем страницу при изменении фильтров
      if (newParams.search !== undefined || newParams.category !== undefined) {
        params.delete("page");
      }

      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl || window.location.pathname, { scroll: false });
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(window.location.pathname, { scroll: false });
  }, [router]);

  return {
    currentParams,
    updateParams,
    clearFilters,
  };
}
