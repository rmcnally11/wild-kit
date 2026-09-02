export default function HomeLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="h-6 w-48 animate-pulse rounded bg-secondary" />
      <div className="mt-6 h-20 w-full max-w-2xl animate-pulse rounded bg-secondary" />
      <div className="mt-10 h-64 animate-pulse rounded-3xl bg-card" />
    </div>
  );
}
