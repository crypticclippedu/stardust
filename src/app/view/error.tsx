"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
// biome-ignore lint:
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex h-[32rem] w-96 flex-col items-center justify-center gap-4">
				<div className="mb-4 flex items-center justify-center text-left text-2xl font-bold">
					<Sparkles />
					<span className="ml-2 text-2xl font-bold">Stardust</span>
				</div>
				<p className="text-center text-4xl font-bold text-primary">Session Error</p>
				<div className="flex flex-col items-center justify-center gap-4">
					<p className="text-center">Digest: {error.digest ?? "null"}</p>
					{error.message ? (
						<code className="text-center text-lg font-bold text-destructive">{error.message}</code>
					) : null}
					<Button className="text-center" onClick={reset}>
						Reset
					</Button>
					<p className="text-xs text-muted-foreground">
						More details are in the {typeof window === "undefined" ? "terminal" : "browser"} console
					</p>
				</div>
			</div>
		</div>
	);
}
