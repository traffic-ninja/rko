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
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const supabase = await createClient();

	const { data: post } = await supabase
		.from("blog_posts")
		.select("*")
		.eq("slug", slug)
		.single();

	if (!post) {
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
				<h1 style={{ fontSize: "72px", color: "#94a3b8" }}>
					Статья не найдена
				</h1>
			</div>,
			{ ...size }
		);
	}

	const categoryLabels: Record<string, string> = {
		news: "Новости",
		guides: "Гайды",
		reviews: "Обзоры",
		comparisons: "Сравнения",
	};
	const category = categoryLabels[post.category] || post.category;

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
					fontSize: "28px",
					color: "#64748b",
					backgroundColor: "#f1f5f9",
					padding: "10px 30px",
					borderRadius: "30px",
					marginBottom: "30px",
				}}
			>
				{category}
			</div>
			<h1
				style={{
					fontSize: "56px",
					fontWeight: "bold",
					color: "#0f172a",
					marginBottom: "30px",
					textAlign: "center",
					lineHeight: 1.2,
				}}
			>
				{post.title}
			</h1>
			<p
				style={{
					fontSize: "28px",
					color: "#64748b",
					textAlign: "center",
					maxWidth: "800px",
					marginBottom: "40px",
				}}
			>
				{post.excerpt}
			</p>
			<div
				style={{
					display: "flex",
					gap: "40px",
					fontSize: "24px",
					color: "#94a3b8",
				}}
			>
				<span>{post.author_name}</span>
				<span>•</span>
				<span>{post.read_time} мин</span>
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
