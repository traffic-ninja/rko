import { createClient } from "@/lib/supabase/server";
import { BankClientPage } from "./bank-client-page";
import { notFound } from "next/navigation";
import type { Bank, Tariff } from "@/lib/supabase/types";

interface BankDataProviderProps {
  params: { bankId: string };
}

export default async function BankDataProvider({ params }: BankDataProviderProps) {
  const { bankId } = params;
  const supabase = await createClient();

  const { data: bank, error: bankError } = await supabase
    .from("banks")
    .select("*")
    .eq("id", bankId)
    .single();

  if (bankError || !bank) {
    console.error("Ошибка при загрузке банка:", bankError);
    notFound();
  }

  const { data: bankTariffs, error: tariffsError } = await supabase
    .from("tariffs")
    .select("*")
    .eq("bank_id", bankId);

  if (tariffsError) {
    console.error("Ошибка при загрузке тарифов банка:", tariffsError);
  }
  const initialBankTariffs = bankTariffs || [];

  return (
    <BankClientPage
      initialBank={bank as Bank}
      initialBankTariffs={initialBankTariffs as Tariff[]}
    />
  );
}
