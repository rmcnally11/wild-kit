"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto grid min-h-dvh max-w-md content-center gap-4 px-5">
      <h1 className="font-display text-4xl">The pitcher tipped.</h1>
      <p className="text-muted-foreground">Try again. Your sales are still on this phone.</p>
      <Button className="h-12 rounded-2xl font-extrabold" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
