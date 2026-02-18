import type { Tables } from "@/lib/supabase/types";

interface TariffJsonLdProps {
  tariff: Tables<"tariffs">;
  bankName: string;
}

export function TariffJsonLd({ tariff, bankName }: TariffJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org" as const,
    "@type": "Product" as const,
    "name": tariff.name,
    "description": tariff.description,
    "url": `https://rko-sravni.ru/tariffs/${tariff.id}`,
    "brand": {
      "@type": "BankOrCreditUnion" as const,
      "name": bankName,
    },
    "offers": {
      "@type": "Offer" as const,
      "price": tariff.price.toString(),
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock" as const,
      "description": `${tariff.price_label}, ${tariff.operations_limit} платежей/мес`,
    },
    "featureList": tariff.features,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
