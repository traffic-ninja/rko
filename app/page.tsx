import Link from "next/link"
import { ArrowRight, Zap, Clock, Shield, DollarSign, Building2, Calculator, BarChart3 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ComparisonPanel } from "@/components/layout/comparison-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BankCard } from "@/components/cards/bank-card"
import { PromotionCard } from "@/components/cards/promotion-card"
import { BlogCard } from "@/components/cards/blog-card"
import { HeroSelectionForm } from "@/components/home/hero-selection-form"
import { banks, promotions, blogPosts } from "@/lib/mock-data"

const advantages = [
  {
    icon: Zap,
    title: "Актуальные данные",
    description: "Регулярно обновляем информацию о тарифах всех банков",
  },
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Сравните все условия в одном месте за несколько минут",
  },
  {
    icon: Shield,
    title: "Честное сравнение",
    description: "Независимый анализ без скрытых предпочтений",
  },
  {
    icon: DollarSign,
    title: "Бесплатно",
    description: "Пользуйтесь сервисом без каких-либо затрат",
  },
]

const steps = [
  {
    icon: Building2,
    step: 1,
    title: "Введите параметры",
    description: "Укажите тип бизнеса, оборот и количество операций",
  },
  {
    icon: Calculator,
    step: 2,
    title: "Получите рекомендации",
    description: "Система подберёт топ-3 подходящих тарифа",
  },
  {
    icon: BarChart3,
    step: 3,
    title: "Откройте РКО",
    description: "Перейдите на сайт банка и оформите счёт",
  },
]

export default function HomePage() {
  const topBanks = banks.slice(0, 6)
  const topPromotions = promotions.slice(0, 4)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
                  Сравните тарифы РКО всех банков России
                </h1>
                <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
                  Подберите оптимальное расчётно-кассовое обслуживание для вашего бизнеса. Актуальные условия, честное
                  сравнение, умный подбор.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="/selection">
                      Подобрать РКО
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/banks">Все банки</Link>
                  </Button>
                </div>
              </div>
              <div>
                <HeroSelectionForm />
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Почему выбирают нас</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item) => (
                <Card key={item.title} className="text-center">
                  <CardContent className="pt-6 pb-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Banks Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Популярные банки</h2>
              <Button asChild variant="ghost">
                <Link href="/banks">
                  Все банки
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topBanks.map((bank) => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Как это работает</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/selection">
                  Попробовать сейчас
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Promotions Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Спецпредложения</h2>
              <Button asChild variant="ghost">
                <Link href="/promotions">
                  Все акции
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topPromotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Последние статьи</h2>
              <Button asChild variant="ghost">
                <Link href="/blog">
                  Все статьи
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ComparisonPanel />
    </div>
  )
}
