import type { Tables } from "@/lib/supabase/types";

interface ArticleJsonLdProps {
  post: Tables<"blog_posts">;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org" as const,
    "@type": "Article" as const,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image
      ? [post.image]
      : undefined,
    "datePublished": post.published_at,
    "author": {
      "@type": "Person" as const,
      "name": post.author_name,
    },
    "publisher": {
      "@type": "Organization" as const,
      "name": "РКО Сравни",
      "logo": {
        "@type": "ImageObject" as const,
        "url": "https://rko-sravni.ru/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage" as const,
      "@id": `https://rko-sravni.ru/blog/${post.slug}`,
    },
    "articleSection": post.category,
    "timeRequired": `PT${post.read_time}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
