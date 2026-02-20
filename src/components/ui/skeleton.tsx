import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "text" | "circular" | "rectangular" | "rounded";
	width?: string | number;
	height?: string | number;
}

function Skeleton({
	className,
	variant = "rounded",
	width,
	height,
	style,
	...props
}: SkeletonProps) {
	return (
		<div
			className={cn("animate-pulse bg-muted", className, {
				"rounded-md": variant === "rounded",
				"rounded-full": variant === "circular",
				"rounded-sm": variant === "rectangular",
				"h-4 w-48": variant === "text", // default text line
			})}
			style={{
				width,
				height,
				...style,
			}}
			{...props}
		/>
	);
}

export { Skeleton };
