import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { Mail, Phone, Linkedin } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider>
          <ThemeWrapper>
            <Navigation />
            {children}
            <footer className="bg-muted py-12 mt-16">
              <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                  <div>
                    <h3 className="font-bold text-lg mb-4">INOVEX</h3>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Услуги</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Управленческий учет
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          IT аутсорсинг
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Бюджетирование
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Автоматизация
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Ресурсы</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Блог
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Кейсы
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          Шаблоны
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-primary">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Контакты</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <a
                          target="_blank"
                          href="mailto:mb@1tvb.ru"
                          className="hover:text-primary">
                          <Mail />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="tel:+79123328609"
                          className="hover:text-primary">
                          <Phone />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="#"
                          className="hover:text-primary">
                          <Linkedin />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://t.me/mb_tvb"
                          className="hover:text-primary">
                          <FaTelegram className="h-6 w-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://api.whatsapp.com/send/?phone=%2B79123328609&text&type=phone_number&app_absent=0"
                          className="hover:text-primary">
                          <FaWhatsapp className="h-6 w-6" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                  <p>&copy; 2024 INOVEX. Все права защищены.</p>
                </div>
              </div>
            </footer>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
