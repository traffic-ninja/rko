interface BreadcrumbItem {
	name: string;
	url: string;
}

interface BreadcrumbJsonLdProps {
	items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
	const structuredData = {
		"@context": "https://schema.org" as const,
		"@type": "BreadcrumbList" as const,
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem" as const,
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
