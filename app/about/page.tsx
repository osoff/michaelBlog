import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Елена Финансова",
    role: "Главный редактор",
    bio: "CFO с 12-летним опытом. Эксперт по бюджетированию, управленческой отчетности и финансовому планированию.",
    image: "/elena-finansova-portrait.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "elena@upravuchet.com"
    }
  },
  {
    name: "Михаил Аналитиков",
    role: "Финансовый аналитик",
    bio: "Специалист по управленческому учету и анализу затрат. Автор методик по внедрению ABC-анализа и процессного учета.",
    image: "/mikhail-analitikov-portrait.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "mikhail@upravuchet.com"
    }
  },
  {
    name: "Анна Метрикова",
    role: "Эксперт по KPI",
    bio: "Консультант по разработке систем показателей эффективности. Опыт внедрения сбалансированной системы показателей.",
    image: "/anna-metrikova-portrait.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "anna@upravuchet.com"
    }
  }
]

export default function AboutPage() {
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
              <Link href="/about" className="text-foreground hover:text-primary">
                О блоге
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
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
              О нашем блоге
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              УправУчет — это место, где финансовые директора, контролеры и аналитики делятся знаниями 
              и лучшими практиками в области управленческого учета.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Наша миссия</h2>
                <p className="text-muted-foreground mb-4">
                  Мы стремимся создать сообщество финансовых профессионалов, где каждый может найти 
                  актуальную информацию о современных методах управленческого учета и финансовой аналитики.
                </p>
                <p className="text-muted-foreground">
                  Наш блог охватывает широкий спектр тем: от базовых принципов учета затрат до сложных 
                  методов финансового моделирования, от традиционного бюджетирования до современных BI-решений.
                </p>
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/team-collaboration-coding.png"
                  alt="Команда разработчиков"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid gap-6 md:grid-cols-4 text-center">
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Статей</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground">Читателей</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <div className="text-muted-foreground">Авторов</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-muted-foreground">Года</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{member.role}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Link href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                        <Twitter className="w-5 h-5" />
                      </Link>
                      <Link href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                        <Linkedin className="w-5 h-5" />
                      </Link>
                      <Link href={member.social.github} className="text-muted-foreground hover:text-primary">
                        <Github className="w-5 h-5" />
                      </Link>
                      <Link href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-primary">
                        <Mail className="w-5 h-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Качество контента</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Мы публикуем только проверенную и актуальную информацию, 
                    которая действительно поможет разработчикам в их работе.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Открытость</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Мы приветствуем обратную связь и открыты для сотрудничества 
                    с разработчиками всех уровней.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Практичность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наши статьи содержат практические примеры и решения, 
                    которые можно применить в реальных проектах.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Сообщество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Мы строим сообщество, где каждый может учиться, 
                    делиться опытом и расти профессионально.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-lg mb-4">УправУчет</h3>
              <p className="text-muted-foreground">
                Блог об управленческом учете, финансах и лучших практиках.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Бюджетирование</Link></li>
                <li><Link href="#" className="hover:text-primary">Управленческая отчетность</Link></li>
                <li><Link href="#" className="hover:text-primary">Финансовый анализ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Документация</Link></li>
                <li><Link href="#" className="hover:text-primary">Примеры моделей</Link></li>
                <li><Link href="#" className="hover:text-primary">Туториалы</Link></li>
                <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Email</Link></li>
                <li><Link href="#" className="hover:text-primary">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 УправУчет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
