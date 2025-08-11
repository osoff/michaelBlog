"use client";

import * as React from "react";
import { Moon, Sun, Check } from "lucide-react";
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
  const colorSchemes = [
    { name: "neutral", color: "0 0% 45.1%" },
    { name: "blue", color: "221.2 83.2% 53.3%" },
    { name: "orange", color: "24.6 95% 53.1%" },
    { name: "violet", color: "262.1 83.3% 57.8%" },
  ];
  const currentScheme =
    colorSchemes.find((scheme) => theme?.includes(scheme.name)) ||
    colorSchemes[0];

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? `${currentScheme.name}-dark` : currentScheme.name;
    setTheme(newTheme);
  };

  const handleSchemeChange = (schemeName: string) => {
    const isDark = theme?.includes("dark");
    const newTheme = isDark ? `${schemeName}-dark` : schemeName;
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
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => handleThemeChange(false)}>
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange(true)}>
          Темная
        </DropdownMenuItem>
        <div className="border-t mt-2 pt-2">
          <div className="flex justify-center gap-2">
            {colorSchemes.map((scheme) => {
              const isActive = currentScheme.name === scheme.name;
              return (
                <button
                  key={scheme.name}
                  className={`relative h-6 w-6 rounded-full border-2 transition-all hover:scale-110 ${
                    isActive ? "border-foreground" : "border-border"
                  }`}
                  style={{
                    backgroundColor: `hsl(${scheme.color})`,
                  }}
                  onClick={() => handleSchemeChange(scheme.name)}
                  title={scheme.name}>
                  {isActive && (
                    <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
