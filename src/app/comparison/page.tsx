import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ComparisonClientPage } from "./comparison-client-page";
import type { Tables } from "@/lib/supabase/types";
import { ComparisonSkeleton } from "@/components/ui/comparison-skeleton";

export const metadata: Metadata = {
  title: "Сравнение тарифов РКО — Сравните условия банков",
  description: "Сравните тарифы РКО разных банков в одной таблице. Ключевые условия, комиссии, лимиты. Выберите лучший вариант для вашего бизнеса.",
  keywords: "сравнение РКО, сравнение тарифов банков, таблица РКО, сравнить условия банков, РКО сравнить тарифы",
  openGraph: {
    title: "Сравнение тарифов РКО",
    description: "Сравните тарифы РКО разных банков в одной таблице.",
    locale: "ru_RU",
    type: "website",
    siteName: "РКО Сравни",
  },
  twitter: {
    card: "summary_large_image",
    title: "Сравнение тарифов РКО",
    description: "Сравните тарифы РКО разных банков в одной таблице.",
  },
};

export default async function ComparisonPage() {
  const supabase = await createClient();

  const { data: tariffs, error: tariffsError } = await supabase
    .from("tariffs")
    .select("*");

  if (tariffsError) {
    console.error("Ошибка при загрузке тарифов для сравнения:", tariffsError);
    return <div>Ошибка загрузки тарифов.</div>;
  }

  return (
    <Suspense fallback={<ComparisonSkeleton />}>
      <ComparisonClientPage initialTariffs={tariffs as Tables<'tariffs'>[] || []} />
    </Suspense>
  );
}
