"use client";

import { ArrowRight, ChevronDown, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { TariffCard } from "@/components/cards/tariff-card";
import { useComparison } from "@/components/comparison-context";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Tables } from "@/lib/supabase/types";
import { useTariffFilters } from "@/hooks/use-tariff-filters";

interface SelectionClientPageProps {
  initialTariffs: Tables<"tariffs">[];
  initialRegions: string[];
}

export function SelectionClientPage({
  initialTariffs,
  initialRegions,
}: SelectionClientPageProps) {
  const router = useRouter();
  const { addToComparison, clearComparison } = useComparison();
  const {
    topResults,
    additionalResults,
    filters,
    setBusinessType,
    setMonthlyTurnover,
    setMonthlyPayments,
    setRegion,
    calculateRecommendations,
    setShowResults,
  } = useTariffFilters({ initialTariffs });

  const [isLoading, setIsLoading] = useState(false);
  const [showMoreResults, setShowMoreResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    calculateRecommendations();
    setShowMoreResults(false);
  };

  const handleCompareTop3 = () => {
    clearComparison();
    topResults.forEach((tariff) => {
      addToComparison(tariff);
    });
    router.push("/comparison");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background-secondary">
        <div className="container-custom py-8 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Подбор РКО под ваш бизнес
            </h1>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Ответьте на несколько вопросов — мы найдём лучшие варианты
              расчётно-кассового обслуживания для вас
            </p>
          </div>

          {/* Selection Form */}
          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="text-xl">
                Параметры вашего бизнеса
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Type */}
                <div className="space-y-2">
                  <Label htmlFor="businessType">Тип бизнеса</Label>
                  <Select value={filters.businessType} onValueChange={setBusinessType}>
                    <SelectTrigger id="businessType">
                      <SelectValue placeholder="Выберите тип бизнеса" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ip">ИП</SelectItem>
                      <SelectItem value="ooo">ООО</SelectItem>
                      <SelectItem value="samozanyatye">Самозанятые</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Monthly Turnover */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label htmlFor="turnover">Ежемесячный оборот</Label>
                    <span className="text-sm text-foreground-secondary">
                      {filters.monthlyTurnover.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <Slider
                    id="turnover"
                    min={50000}
                    max={5000000}
                    step={50000}
                    value={[filters.monthlyTurnover]}
                    onValueChange={(value) => setMonthlyTurnover(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground-muted">
                    <span>50 000 ₽</span>
                    <span>5 000 000 ₽</span>
                  </div>
                </div>

                {/* Monthly Payments */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label htmlFor="payments">Количество платежей в месяц</Label>
                    <span className="text-sm text-foreground-secondary">
                      {filters.monthlyPayments}
                    </span>
                  </div>
                  <Slider
                    id="payments"
                    min={5}
                    max={100}
                    step={5}
                    value={[filters.monthlyPayments]}
                    onValueChange={(value) => setMonthlyPayments(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground-muted">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region">Регион</Label>
                  <Select value={filters.region} onValueChange={setRegion}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Выберите регион" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Подбираем...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Подобрать тариф
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {filters.showResults && topResults.length > 0 && (
            <>
              {/* Top 3 Results */}
              <div className="max-w-5xl mx-auto mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Рекомендации
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleCompareTop3}
                    className="bg-transparent"
                  >
                    Сравнить топ-3
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {topResults.map((tariff, index) => (
                    <TariffCard
                      key={tariff.id}
                      tariff={tariff}
                      showBankInfo
                    />
                  ))}
                </div>
              </div>

              {/* Additional Results */}
              {additionalResults.length > 0 && (
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Другие подходящие варианты
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMoreResults(!showMoreResults)}
                    >
                      {showMoreResults ? (
                        <>
                          Скрыть
                          <ChevronDown className="h-4 w-4 ml-1 rotate-180" />
                        </>
                      ) : (
                        <>
                          Показать ещё
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                  {(showMoreResults ? additionalResults : additionalResults.slice(0, 3)).map(
                    (tariff) => (
                      <TariffCard key={tariff.id} tariff={tariff} showBankInfo />
                    )
                  )}
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {filters.showResults && topResults.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-foreground-secondary mb-4">
                По вашим параметрам не найдено подходящих тарифов
              </p>
              <Button onClick={() => setShowResults(false)}>
                Изменить параметры
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ComparisonPanel />
    </div>
  );
}
