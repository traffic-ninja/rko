import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
	params,
}: {
	params: Promise<{ bankId: string }>;
}) {
	const { bankId } = await params;
	const supabase = await createClient();

	const { data: bank } = await supabase
		.from("banks")
		.select("*")
		.eq("id", bankId)
		.single();

	if (!bank) {
		return new ImageResponse(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#ffffff",
				}}
			>
				<h1 style={{ fontSize: "72px", color: "#94a3b8" }}>Банк не найден</h1>
			</div>,
			{ ...size }
		);
	}

	const priceText =
		bank.min_price === 0 ? "Бесплатно" : `от ${bank.min_price}₽/мес`;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#ffffff",
				padding: "60px",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "40px",
				}}
			>
				<div
					style={{
						width: "100px",
						height: "100px",
						backgroundColor: "#2563eb",
						borderRadius: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginRight: "30px",
					}}
				>
					<span
						style={{
							fontSize: "48px",
							color: "#ffffff",
							fontWeight: "bold",
						}}
					>
						{bank.name.charAt(0)}
					</span>
				</div>
			</div>
			<h1
				style={{
					fontSize: "72px",
					fontWeight: "bold",
					color: "#0f172a",
					marginBottom: "20px",
					textAlign: "center",
				}}
			>
				{bank.name}
			</h1>
			<p
				style={{
					fontSize: "36px",
					color: "#475569",
					textAlign: "center",
					marginBottom: "20px",
				}}
			>
				РКО {priceText}
			</p>
			<p
				style={{
					fontSize: "28px",
					color: "#94a3b8",
					marginTop: "20px",
				}}
			>
				{bank.tariff_count} тарифов • Рейтинг {bank.rating || "N/A"}
			</p>
			<div
				style={{
					position: "absolute",
					bottom: "40px",
					left: "60px",
					fontSize: "24px",
					color: "#2563eb",
					fontWeight: "600",
				}}
			>
				Сравни РКО
			</div>
		</div>,
		{
			...size,
		}
	);
}
