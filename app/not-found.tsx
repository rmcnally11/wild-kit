import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-dvh max-w-md content-center gap-4 px-5">
      <h1 className="font-display text-4xl">Wrong corner.</h1>
      <p className="text-muted-foreground">That page is not part of the stand.</p>
      <Link href="/" className="font-extrabold">
        Back to selling
      </Link>
    </div>
  );
}
