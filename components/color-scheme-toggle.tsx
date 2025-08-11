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
    activeColor: "0 0% 45.1%",
  },
  {
    name: "blue",
    activeColor: "221.2 83.2% 53.3%",
  },
  {
    name: "orange",
    activeColor: "24.6 95% 53.1%",
  },
  {
    name: "violet",
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
      <DropdownMenuContent align="end" className="w-[120px]">
        <div className="grid grid-cols-2 gap-2 p-2">
          {colorSchemes.map((scheme) => {
            const isActive = currentScheme.name === scheme.name;
            return (
              <button
                key={scheme.name}
                className={`relative h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                  isActive ? "border-foreground" : "border-border"
                }`}
                style={{
                  backgroundColor: `hsl(${scheme.activeColor})`,
                }}
                onClick={() => handleSchemeChange(scheme.name)}
                title={scheme.name}>
                {isActive && (
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
