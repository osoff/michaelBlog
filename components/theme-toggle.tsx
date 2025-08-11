"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Загрузка темы</span>
      </Button>
    );
  }

  // Извлекаем цветовую схему из текущей темы
  const colorSchemes = ["neutral", "blue", "orange", "violet"];
  const currentScheme =
    colorSchemes.find((scheme) => theme?.includes(scheme)) || "neutral";

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? `${currentScheme}-dark` : currentScheme;
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange(false)}>
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange(true)}>
          Темная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
