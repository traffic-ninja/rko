import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BankClientPage } from "./bank-client-page";
import { createClient } from "@/lib/supabase/server";
import { BankJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import type { Bank, Tariff } from "@/lib/supabase/types";

interface BankPageProps {
  params: Promise<{ bankId: string }>;
}

export async function generateMetadata({ params }: BankPageProps): Promise<Metadata> {
  const { bankId } = await params;
  const supabase = await createClient();

  const { data: bank } = await supabase
    .from("banks")
    .select("*")
    .eq("id", bankId)
    .single();

  if (!bank) {
    return {
      title: "Банк не найден",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rko-sravni.ru";
  const priceText = bank.min_price === 0 ? "бесплатно" : `от ${bank.min_price.toLocaleString("ru-RU")}₽`;

  return {
    title: `${bank.name} — РКО, тарифы и условия | РКО Сравни`,
    description: `${bank.description} ${bank.tariff_count} тарифов, ${priceText}/мес. Рейтинг ${bank.rating || "N/A"}.`,
    openGraph: {
      title: `${bank.name} — РКО ${priceText}/мес`,
      description: `${bank.description} ${bank.tariff_count} тарифов. Рейтинг ${bank.rating || "N/A"}.`,
      images: [
        {
          url: `${siteUrl}/og/banks/${bank.id}.png`,
          width: 1200,
          height: 630,
          alt: `РКО в банке ${bank.name}`,
        },
      ],
      locale: "ru_RU",
      type: "website",
      siteName: "РКО Сравни",
    },
    twitter: {
      card: "summary_large_image",
      title: `${bank.name} — РКО ${priceText}/мес`,
      description: `${bank.description} ${bank.tariff_count} тарифов.`,
      images: [`${siteUrl}/og/banks/${bank.id}.png`],
    },
  };
}

export default async function BankPage({ params }: BankPageProps) {
  const { bankId } = await params;
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

  return (
    <>
      <BankJsonLd bank={bank as Bank} />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "/" },
          { name: "Банки", url: "/banks" },
          { name: bank.name, url: `/banks/${bank.id}` },
        ]}
      />
      <BankClientPage
        initialBank={bank as Bank}
        initialBankTariffs={(bankTariffs || []) as Tariff[]}
      />
    </>
  );
}
