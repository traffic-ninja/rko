import type { Tables } from "@/lib/supabase/types";

interface BankJsonLdProps {
  bank: Tables<"banks">;
}

export function BankJsonLd({ bank }: BankJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org" as const,
    "@type": "BankOrCreditUnion" as const,
    "name": bank.name,
    "description": bank.description,
    "logo": bank.logo,
    "image": bank.logo,
    "url": `https://rko-sravni.ru/banks/${bank.id}`,
    "address": {
      "@type": "PostalAddress" as const,
      "addressCountry": "RU",
    },
    "aggregateRating": bank.rating
      ? {
          "@type": "AggregateRating" as const,
          "ratingValue": bank.rating.toString(),
        }
      : undefined,
    "priceRange": bank.has_free_tariff
      ? "от 0₽"
      : `от ${bank.min_price}₽`,
    "openingHours": "24/7",
    "hasOfferCatalog": {
      "@type": "OfferCatalog" as const,
      "name": "Тарифы РКО",
      "itemListElement": [
        {
          "@type": "Offer" as const,
          "name": `${bank.name} — ${bank.tariff_count} тарифов`,
          "price": bank.min_price.toString(),
          "priceCurrency": "RUB",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
