export default function PlannerLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="h-8 w-40 animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-14 w-2/3 animate-pulse rounded bg-secondary" />
      <div className="mt-8 h-64 animate-pulse rounded-2xl bg-card" />
      <p className="mt-6 text-sm text-muted-foreground">Pulling NOAA tides and scoring windows…</p>
    </div>
  );
}
