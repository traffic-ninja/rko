import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

export default function BankNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background-secondary">
        <div className="text-center px-4">
          <Building2 className="h-16 w-16 text-foreground-muted mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Банк не найден</h1>
          <p className="text-foreground-secondary mb-8">
            Возможно, страница была удалена или вы перешли по неверной ссылке
          </p>
          <Button asChild>
            <Link href="/banks">Вернуться к каталогу</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
