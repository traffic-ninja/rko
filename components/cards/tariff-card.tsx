"use client"

import type React from "react"

import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Tariff } from "@/lib/types"
import { useComparison } from "@/components/comparison-context"

interface TariffCardProps {
  tariff: Tariff
  showBankInfo?: boolean
}

export function TariffCard({ tariff, showBankInfo = false }: TariffCardProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()
  const inComparison = isInComparison(tariff.id)

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inComparison) {
      removeFromComparison(tariff.id)
    } else {
      addToComparison(tariff)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-250">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {showBankInfo && (
              <img
                src={tariff.bankLogo || "/placeholder.svg"}
                alt={tariff.bankName}
                className="h-10 w-10 rounded-lg object-cover shrink-0"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{tariff.name}</h3>
                {tariff.isRecommended && <Badge variant="accent">Рекомендуем</Badge>}
              </div>
              {showBankInfo && <p className="text-sm text-foreground-secondary">{tariff.bankName}</p>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{tariff.priceLabel}</p>
          </div>
        </div>

        <p className="text-sm text-foreground-secondary mb-4">{tariff.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-foreground-secondary">Бесплатных платежей:</span>
            <span className="font-medium text-foreground">{tariff.freeTransfers}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground-secondary">Комиссия за перевод:</span>
            <span className="font-medium text-foreground">{tariff.transferCommission}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground-secondary">Снятие наличных:</span>
            <span className="font-medium text-foreground">{tariff.cashWithdrawalCommission}</span>
          </div>
        </div>

        {tariff.isRecommended && tariff.recommendationReason && (
          <div className="bg-accent/10 rounded-md p-3 mb-4">
            <p className="text-sm text-accent font-medium">{tariff.recommendationReason}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/tariffs/${tariff.id}`}>Подробнее</Link>
          </Button>
          <Button
            variant={inComparison ? "secondary" : "outline"}
            onClick={handleCompareClick}
            className="shrink-0"
            aria-label={inComparison ? "Убрать из сравнения" : "Добавить к сравнению"}
          >
            {inComparison ? (
              <>
                <Minus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Убрать</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Сравнить</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
