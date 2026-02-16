import { createClient } from "@/lib/supabase/server";
import { PromotionsClientPage } from "./promotions-client-page";
import type { Tables } from "@/lib/supabase/types"; // Импортируем типы

export default async function PromotionsDataProvider() {
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
    <PromotionsClientPage
      initialPromotions={promotionsData as Tables<'promotions'>[] || []}
      initialBanks={banksData as Tables<'banks'>[] || []}
    />
  );
}
