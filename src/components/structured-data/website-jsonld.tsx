export function WebsiteJsonLd() {
	const structuredData = {
		"@context": "https://schema.org" as const,
		"@type": "WebSite" as const,
		name: "РКО Сравни",
		description: "Сравнение тарифов РКО всех банков России",
		url: "https://rko-sravni.ru",
		potentialAction: {
			"@type": "SearchAction" as const,
			target: "https://rko-sravni.ru/banks?q={search_term_string}",
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization" as const,
			name: "РКО Сравни",
			logo: {
				"@type": "ImageObject" as const,
				url: "https://rko-sravni.ru/logo.png",
			},
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
