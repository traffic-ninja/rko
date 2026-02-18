import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { PromotionsClientPage } from "./promotions-client-page";
import type { Tables } from "@/lib/supabase/types";
import { PromotionsSkeleton } from "@/components/ui/promotion-skeleton";

// ISR: пересборка раз в час
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Спецпредложения и акции банков — РКО Сравни",
  description: "Актуальные акции и спецпредложения банков на РКО. Кэшбэк, бесплатное обслуживание, бонусы для новых клиентов. Успейте воспользоваться выгодными предложениями.",
  keywords: "акции РКО, спецпредложения банков, кэшбэк РКО, бесплатное обслуживание, бонусы банк",
  openGraph: {
    title: "Спецпредложения и акции банков на РКО",
    description: "Актуальные акции и спецпредложения банков на РКО. Кэшбэк, бесплатное обслуживание, бонусы.",
    locale: "ru_RU",
    type: "website",
    siteName: "РКО Сравни",
  },
  twitter: {
    card: "summary_large_image",
    title: "Спецпредложения и акции банков на РКО",
    description: "Актуальные акции и спецпредложения банков на РКО.",
  },
};

export default async function PromotionsPage() {
  const supabase = await createClient();

  const [
    { data: promotionsData, error: promotionsError },
    { data: banksData, error: banksError },
  ] = await Promise.all([
    supabase.from("promotions").select("*"),
    supabase.from("banks").select("id, name"),
  ]);

  if (promotionsError) {
    console.error("Ошибка при загрузке акций:", promotionsError);
    return <div>Ошибка загрузки акций.</div>;
  }

  if (banksError) {
    console.error("Ошибка при загрузке банков:", banksError);
    return <div>Ошибка загрузки банков.</div>;
  }

  return (
    <Suspense fallback={<PromotionsSkeleton />}>
      <PromotionsClientPage
        initialPromotions={promotionsData as Tables<'promotions'>[] || []}
        initialBanks={banksData as Tables<'banks'>[] || []}
      />
    </Suspense>
  );
}
