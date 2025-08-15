import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Zap, Shield } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { getServices } from "@/services/services";

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
      <div className="py-12">
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
                <ServiceCard key={service._id} service={service} />
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
      </div>
    </div>
  );
}
