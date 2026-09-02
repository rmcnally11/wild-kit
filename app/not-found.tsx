import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-20 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Off the chart</p>
      <h1 className="font-heading mt-3 text-5xl">That page is not on this coast.</h1>
      <p className="mt-4 text-muted-foreground">
        The tide table does not have this URL. Head back to the planner and pick a station.
      </p>
      <Button asChild className="mt-6">
        <Link href="/planner">Open the planner</Link>
      </Button>
    </div>
  );
}
