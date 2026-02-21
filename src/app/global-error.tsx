"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		console.error("Global error:", error);
	}, [error]);

	return (
		<html lang="ru">
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
					<div className="max-w-md text-center">
						<div className="mb-6 flex justify-center">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
								<svg
									className="h-8 w-8 text-destructive"
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
							</div>
						</div>
						<h1 className="mb-4 text-2xl font-bold text-foreground">
							Произошла ошибка
						</h1>
						<p className="mb-6 text-foreground-secondary">
							К сожалению, произошла непредвиденная ошибка. Пожалуйста,
							попробуйте обновить страницу или повторите попытку позже.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
							<Button onClick={reset} variant="default">
								Попробовать снова
							</Button>
							<Button onClick={() => router.push("/")} variant="outline">
								На главную
							</Button>
						</div>
						{error.digest && (
							<p className="mt-4 text-xs text-muted-foreground">
								Код ошибки: {error.digest}
							</p>
						)}
					</div>
				</div>
			</body>
		</html>
	);
}
