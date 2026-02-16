import { createClient } from "@/lib/supabase/server";
import { ComparisonClientPage } from "./comparison-client-page";
import type { Tables } from "@/lib/supabase/types"; // Импортируем тип Tables

export default async function ComparisonDataProvider() {
  const supabase = await createClient();

  // Получаем все тарифы
  const { data: tariffs, error: tariffsError } = await supabase
    .from("tariffs")
    .select("*");

  if (tariffsError) {
    console.error("Ошибка при загрузке тарифов для сравнения:", tariffsError);
    return <div>Ошибка загрузки тарифов.</div>;
  }

  return (
    <ComparisonClientPage initialTariffs={tariffs as Tables<'tariffs'>[] || []} />
  );
}
