import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Users,
  Zap,
  BarChart3,
  Settings,
  GraduationCap,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/services/services";
import { ServiceIcon } from "@/components/service-icon";
import { urlFor } from "@/lib/sanity";

const advantages = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Опытная команда",
    description: "Более 50 успешных проектов внедрения",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Соблюдение сроков",
    description: "Гарантируем выполнение в установленные сроки",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Гарантия качества",
    description: "Постгарантийная поддержка 12 месяцев",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Быстрый результат",
    description: "Первые результаты уже через месяц работы",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наши услуги</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Комплексные решения для построения эффективной системы
              управленческого учета и автоматизации финансовых процессов в вашей
              компании
            </p>
          </section>

          {/* Services Grid */}
          <section className="mb-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service._id}
                  className={`relative overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col ${service.popular ? "ring-2 ring-primary" : ""}`}>
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Популярно
                      </Badge>
                    </div>
                  )}

                  <div className="aspect-video relative">
                    <Image
                      src={
                        urlFor(service.mainImage)
                          .width(400)
                          .height(300)
                          .url() || "/placeholder.svg"
                      }
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-primary">
                        <ServiceIcon icon={service.icon} />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Что входит:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-muted-foreground">Срок: </span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-primary">
                          {service.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button className="flex-1">Заказать</Button>
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Advantages Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Почему выбирают нас
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((advantage, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {advantage.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Как мы работаем
            </h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Анализ</h3>
                <p className="text-sm text-muted-foreground">
                  Изучаем текущее состояние и потребности вашего бизнеса
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Планирование</h3>
                <p className="text-sm text-muted-foreground">
                  Разрабатываем детальный план внедрения решения
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Внедрение</h3>
                <p className="text-sm text-muted-foreground">
                  Поэтапно внедряем систему с минимальными рисками
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Поддержка</h3>
                <p className="text-sm text-muted-foreground">
                  Обеспечиваем техническую поддержку и развитие системы
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-muted rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Готовы начать проект?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Свяжитесь с нами для бесплатной консультации и получите
              персональное предложение по автоматизации управленческого учета в
              вашей компании
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Получить консультацию</Button>
              <Button variant="outline" size="lg">
                Скачать презентацию
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
