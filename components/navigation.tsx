"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Отслеживаем начало и завершение навигации
    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleComplete);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleComplete);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Loading Bar */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary">
          <div className="h-full bg-primary animate-pulse"></div>
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-bold text-xl">
              INOVEX
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              Главная
            </Link>
            <Link
              href="/articles"
              className={`transition-colors ${
                pathname === "/articles"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              Статьи
            </Link>
            <Link
              href="/services"
              className={`transition-colors ${
                pathname === "/services"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              Услуги
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              О блоге
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                pathname === "/contact"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              Контакты
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
