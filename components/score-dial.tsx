import { cn } from "@/lib/utils";

export function ScoreDial({
  score,
  grade,
  size = "md",
}: {
  score: number;
  grade: "prime" | "good" | "fair" | "pass";
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? 132 : size === "sm" ? 64 : 88;
  const stroke = size === "lg" ? 10 : 8;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;

  return (
    <div
      className={cn(
        "relative grid place-items-center",
        size === "lg" && "size-[132px]",
        size === "md" && "size-[88px]",
        size === "sm" && "size-16",
      )}
    >
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="oklch(0.32 0.03 205)"
          strokeWidth={stroke}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={
            grade === "prime"
              ? "oklch(0.8 0.09 168)"
              : grade === "good"
                ? "oklch(0.76 0.12 58)"
                : grade === "fair"
                  ? "oklch(0.78 0.05 95)"
                  : "oklch(0.55 0.03 210)"
          }
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            "font-heading leading-none",
            size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl",
          )}
        >
          {score}
        </span>
      </div>
    </div>
  );
}
