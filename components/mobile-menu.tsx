"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Открыть меню">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary py-2"
                onClick={toggleMenu}>
                Главная
              </Link>
              <Link
                href="/articles"
                className="text-muted-foreground hover:text-primary py-2"
                onClick={toggleMenu}>
                Статьи
              </Link>
              <Link
                href="/services"
                className="text-muted-foreground hover:text-primary py-2"
                onClick={toggleMenu}>
                Услуги
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary py-2"
                onClick={toggleMenu}>
                О блоге
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary py-2"
                onClick={toggleMenu}>
                Контакты
              </Link>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Тема:</span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
