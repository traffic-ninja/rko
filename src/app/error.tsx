"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function RouteError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Route error:", error);
	}, [error]);

	const router = useRouter();

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center p-4">
			<div className="max-w-md w-full">
				<Alert variant="destructive" className="mb-6">
					<div className="flex items-center gap-3">
						<svg
							className="h-5 w-5 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<AlertDescription className="text-base font-semibold">
							Ошибка загрузки
						</AlertDescription>
					</div>
					<AlertDescription className="mt-2 text-sm">
						Произошла ошибка при загрузке содержимого. Пожалуйста, попробуйте
						снова.
					</AlertDescription>
				</Alert>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button onClick={reset} variant="default" className="flex-1">
						Попробовать снова
					</Button>
					<Button
						onClick={() => router.push("/")}
						variant="outline"
						className="flex-1"
					>
						На главную
					</Button>
				</div>

				{error.digest && (
					<p className="mt-4 text-xs text-muted-foreground text-center">
						Код ошибки: {error.digest}
					</p>
				)}
			</div>
		</div>
	);
}
