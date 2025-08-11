import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Есть вопросы по управленческому учету, предложения или хотите
              стать автором? Мы всегда рады услышать от финансовых
              профессионалов!
            </p>
          </section>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
                <CardDescription>
                  Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" placeholder="Ваша фамилия" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Тема</Label>
                  <Input id="subject" placeholder="Тема сообщения" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите нам подробнее..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full">Отправить сообщение</Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                  <CardDescription>
                    Другие способы связаться с нами
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        hello@upravuchet.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">
                        +7 (999) 123-45-67
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">Москва, Россия</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Стать автором</CardTitle>
                  <CardDescription>
                    Поделитесь опытом в управленческом учете
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Мы ищем финансовых директоров, контролеров и аналитиков,
                    готовых поделиться практическим опытом в области
                    управленческого учета.
                  </p>
                  <Button variant="outline" className="w-full">
                    Узнать больше
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>Часто задаваемые вопросы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">
                      Какие темы вы освещаете?
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Бюджетирование, анализ затрат, KPI, управленческая
                      отчетность.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Можно ли получить консультацию?
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Да, наши эксперты проводят консультации по управленческому
                      учету.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Есть ли рассылка?</p>
                    <p className="text-muted-foreground text-sm">
                      Да, подпишитесь на главной странице.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
