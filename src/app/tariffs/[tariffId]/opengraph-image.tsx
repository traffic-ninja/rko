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
	params: Promise<{ tariffId: string }>;
}) {
	const { tariffId } = await params;
	const supabase = await createClient();

	const { data: tariff } = await supabase
		.from("tariffs")
		.select("*, banks(name)")
		.eq("id", tariffId)
		.single();

	if (!tariff) {
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
				<h1 style={{ fontSize: "72px", color: "#94a3b8" }}>Тариф не найден</h1>
			</div>,
			{ ...size }
		);
	}

	const bankName = (tariff.banks as { name: string })?.name || "Банк";

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
					marginBottom: "30px",
				}}
			>
				<div
					style={{
						fontSize: "32px",
						color: "#2563eb",
						fontWeight: "600",
						backgroundColor: "#dbeafe",
						padding: "10px 30px",
						borderRadius: "30px",
						marginRight: "20px",
					}}
				>
					{bankName}
				</div>
				{tariff.is_recommended && (
					<div
						style={{
							fontSize: "24px",
							color: "#f59e0b",
							backgroundColor: "#fef3c7",
							padding: "8px 20px",
							borderRadius: "20px",
						}}
					>
						★ Рекомендуем
					</div>
				)}
			</div>
			<h1
				style={{
					fontSize: "64px",
					fontWeight: "bold",
					color: "#0f172a",
					marginBottom: "20px",
					textAlign: "center",
				}}
			>
				{tariff.name}
			</h1>
			<p
				style={{
					fontSize: "48px",
					color: "#2563eb",
					fontWeight: "bold",
					marginBottom: "30px",
				}}
			>
				{tariff.price_label}
			</p>
			<div
				style={{
					display: "flex",
					gap: "40px",
					fontSize: "28px",
					color: "#64748b",
				}}
			>
				<span>{tariff.free_transfers} бесплатных переводов</span>
				<span>•</span>
				<span>{tariff.operations_limit} платежей/мес</span>
			</div>
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
