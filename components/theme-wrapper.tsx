"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && theme) {
      console.log("Применяем тему:", theme, "resolvedTheme:", resolvedTheme);

      // Удаляем все предыдущие цветовые классы и dark
      document.documentElement.classList.remove(
        "neutral",
        "blue",
        "orange",
        "violet",
        "neutral-dark",
        "blue-dark",
        "orange-dark",
        "violet-dark",
        "dark"
      );

      // Добавляем текущую тему напрямую
      document.documentElement.classList.add(theme);

      console.log("Классы на html:", document.documentElement.className);
    }
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
