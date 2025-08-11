"use client";

import * as React from "react";
import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorSchemes = [
  {
    name: "neutral",
    label: "По умолчанию",
    activeColor: "0 0% 45.1%",
  },
  {
    name: "blue",
    label: "Синий",
    activeColor: "221.2 83.2% 53.3%",
  },
  {
    name: "orange",
    label: "Оранжевый",
    activeColor: "24.6 95% 53.1%",
  },
  {
    name: "violet",
    label: "Фиолетовый",
    activeColor: "262.1 83.3% 57.8%",
  },
];

export function ColorSchemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Извлекаем цветовую схему из текущей темы
  const currentScheme =
    colorSchemes.find((scheme) => theme?.includes(scheme.name)) ||
    colorSchemes[0];

  const handleSchemeChange = (schemeName: string) => {
    // Сохраняем текущий режим (светлый/темный)
    const isDark = theme?.includes("dark");
    const newTheme = isDark ? `${schemeName}-dark` : schemeName;
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Выбрать цветовую схему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {colorSchemes.map((scheme) => {
          const isActive = currentScheme.name === scheme.name;
          return (
            <DropdownMenuItem
              key={scheme.name}
              className="flex items-center gap-2"
              onClick={() => handleSchemeChange(scheme.name)}>
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: `hsl(${scheme.activeColor})`,
                }}
              />
              <span className="flex-1">{scheme.label}</span>
              {isActive && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
