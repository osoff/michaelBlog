import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              УправУчет
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Главная
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary">
                Услуги
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                О блоге
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary">
                Контакты
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Есть вопросы по управленческому учету, предложения или хотите стать автором? 
              Мы всегда рады услышать от финансовых профессионалов!
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
                <Button className="w-full">
                  Отправить сообщение
                </Button>
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
                      <p className="text-muted-foreground">hello@upravuchet.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
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
                    Мы ищем финансовых директоров, контролеров и аналитиков, готовых поделиться 
                    практическим опытом в области управленческого учета.
                  </p>
                  <Button variant="outline" className="w-full">
                    Узнать больше
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>
                    Часто задаваемые вопросы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">Какие темы вы освещаете?</p>
                    <p className="text-muted-foreground text-sm">Бюджетирование, анализ затрат, KPI, управленческая отчетность.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Можно ли получить консультацию?</p>
                    <p className="text-muted-foreground text-sm">Да, наши эксперты проводят консультации по управленческому учету.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Есть ли рассылка?</p>
                    <p className="text-muted-foreground text-sm">Да, подпишитесь на главной странице.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-lg mb-4">DevBlog</h3>
              <p className="text-muted-foreground">
                Современный блог о веб-разработке, технологиях и лучших практиках.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">React</Link></li>
                <li><Link href="#" className="hover:text-primary">Next.js</Link></li>
                <li><Link href="#" className="hover:text-primary">TypeScript</Link></li>
                <li><Link href="#" className="hover:text-primary">CSS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Документация</Link></li>
                <li><Link href="#" className="hover:text-primary">Примеры кода</Link></li>
                <li><Link href="#" className="hover:text-primary">Туториалы</Link></li>
                <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Email</Link></li>
                <li><Link href="#" className="hover:text-primary">Twitter</Link></li>
                <li><Link href="#" className="hover:text-primary">GitHub</Link></li>
                <li><Link href="#" className="hover:text-primary">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DevBlog. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
