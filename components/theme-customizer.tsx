"use client";

import * as React from "react";
import { Check, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
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

export function ThemeCustomizer() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Выбрать тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {themes.map((themeOption) => {
          const isActive = theme === themeOption.name;
          return (
            <DropdownMenuItem
              key={themeOption.name}
              className="flex items-center gap-2"
              onClick={() => setTheme(themeOption.name)}>
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: `hsl(${themeOption.activeColor})`,
                }}
              />
              <span className="flex-1">{themeOption.label}</span>
              {isActive && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
