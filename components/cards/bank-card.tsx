import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Bank } from "@/lib/types"

interface BankCardProps {
  bank: Bank
}

export function BankCard({ bank }: BankCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-250 cursor-pointer">
      <Link href={`/banks/${bank.id}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={bank.logo || "/placeholder.svg"}
              alt={bank.name}
              className="h-12 w-12 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{bank.name}</h3>
                {bank.hasFreeTariff && (
                  <Badge variant="success" className="shrink-0">
                    Есть бесплатный
                  </Badge>
                )}
              </div>
              {bank.rating && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium text-foreground">{bank.rating}</span>
                </div>
              )}
              <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">{bank.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted">
                    от{" "}
                    <span className="text-lg font-bold text-foreground">
                      {bank.minPrice === 0 ? "Бесплатно" : `${bank.minPrice.toLocaleString("ru-RU")} ₽`}
                    </span>
                  </p>
                  <p className="text-xs text-foreground-muted">{bank.tariffCount} тарифов</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Подробнее
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
