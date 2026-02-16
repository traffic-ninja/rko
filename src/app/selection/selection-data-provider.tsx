import { createClient } from "@/lib/supabase/server";
import { SelectionClientPage } from "./selection-client-page"; // Импортируем оригинальный клиентский компонент
import type { Tables } from "@/lib/supabase/types"; // Импортируем типы из Supabase

export default async function SelectionDataProvider() {
  const supabase = await createClient();

  const [
    { data: tariffsData, error: tariffsError },
    { data: banksData, error: banksError },
  ] = await Promise.all([
    supabase.from("tariffs").select("*"),
    supabase.from("banks").select("regions"),
  ]);

  if (tariffsError) {
    console.error("Ошибка при загрузке тарифов:", tariffsError);
    return <div>Ошибка загрузки тарифов.</div>;
  }

  if (banksError) {
    console.error("Ошибка при загрузке банков:", banksError);
    return <div>Ошибка загрузки банков.</div>;
  }

  // Извлекаем уникальные регионы из полученных банков
  const allRegions = banksData.flatMap((bank) => bank.regions || []);
  const uniqueRegions = Array.from(new Set(allRegions));

  return (
    <SelectionClientPage
      initialTariffs={tariffsData as Tables<'tariffs'>[] || []}
      initialRegions={uniqueRegions}
    />
  );
}
