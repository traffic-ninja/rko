"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ComparisonPanel } from "@/components/layout/comparison-panel"
import { BankCard } from "@/components/cards/bank-card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { banks } from "@/lib/mock-data"
import { Filter, X } from "lucide-react"

type SortOption = "popularity" | "alphabet" | "price"

export default function BanksPage() {
  const [businessType, setBusinessType] = useState<string[]>([])
  const [hasFreeTariff, setHasFreeTariff] = useState(false)
  const [hasOnlineOpening, setHasOnlineOpening] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("popularity")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBanks = useMemo(() => {
    let result = [...banks]

    // Filter by free tariff
    if (hasFreeTariff) {
      result = result.filter((bank) => bank.hasFreeTariff)
    }

    // Filter by online opening
    if (hasOnlineOpening) {
      result = result.filter((bank) => bank.hasOnlineOpening)
    }

    // Sort
    switch (sortBy) {
      case "alphabet":
        result.sort((a, b) => a.name.localeCompare(b.name, "ru"))
        break
      case "price":
        result.sort((a, b) => a.minPrice - b.minPrice)
        break
      case "popularity":
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
    }

    return result
  }, [hasFreeTariff, hasOnlineOpening, sortBy])

  const clearFilters = () => {
    setBusinessType([])
    setHasFreeTariff(false)
    setHasOnlineOpening(false)
    setSortBy("popularity")
  }

  const hasActiveFilters = hasFreeTariff || hasOnlineOpening || businessType.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background-secondary">
        <div className="container-custom py-8 md:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Все банки с РКО</h1>
            <p className="text-foreground-secondary">
              Полный каталог банков с расчётно-кассовым обслуживанием для бизнеса
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="bg-background rounded-xl border border-border p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                className="md:hidden bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
                {hasActiveFilters && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    !
                  </span>
                )}
              </Button>

              {/* Filters */}
              <div
                className={`${showFilters ? "block" : "hidden"} md:flex md:items-center md:gap-6 space-y-4 md:space-y-0`}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="freeTariff"
                    checked={hasFreeTariff}
                    onCheckedChange={(checked) => setHasFreeTariff(checked === true)}
                  />
                  <Label htmlFor="freeTariff" className="text-sm cursor-pointer">
                    Есть бесплатный тариф
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="onlineOpening"
                    checked={hasOnlineOpening}
                    onCheckedChange={(checked) => setHasOnlineOpening(checked === true)}
                  />
                  <Label htmlFor="onlineOpening" className="text-sm cursor-pointer">
                    Онлайн-открытие
                  </Label>
                </div>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-foreground-secondary">
                    <X className="h-4 w-4 mr-1" />
                    Сбросить
                  </Button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm text-foreground-secondary whitespace-nowrap">
                  Сортировка:
                </Label>
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger id="sort" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">По популярности</SelectItem>
                    <SelectItem value="alphabet">По алфавиту</SelectItem>
                    <SelectItem value="price">По цене</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredBanks.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBanks.map((bank) => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-foreground-secondary mb-4">Банков с такими условиями не найдено</p>
              <Button onClick={clearFilters}>Сбросить фильтры</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ComparisonPanel />
    </div>
  )
}
