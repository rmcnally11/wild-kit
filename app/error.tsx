"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 py-20 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Blown out</p>
      <h1 className="font-heading mt-3 text-4xl">Something failed fetching water.</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {error.message || "The tide or weather request did not come back."}
      </p>
      <Button className="mt-6 w-fit" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
