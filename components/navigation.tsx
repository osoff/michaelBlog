"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
