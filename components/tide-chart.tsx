"use client";

import { formatClock } from "@/lib/format";
import type { BiteWindow, TideExtreme, TidePoint } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  tides: TidePoint[];
  extremes: TideExtreme[];
  windows: BiteWindow[];
  timeZone: string;
  highlightId?: string;
  nowIso: string;
};

export function TideChart({ tides, extremes, windows, timeZone, highlightId, nowIso }: Props) {
  const now = new Date(nowIso).getTime();
  const horizon = now + 48 * 3600 * 1000;
  const points = tides.filter((point) => {
    const t = new Date(point.time).getTime();
    return t >= now - 2 * 3600 * 1000 && t <= horizon;
  });

  if (points.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl bg-secondary/40 text-sm text-muted-foreground">
        Tide curve needs a couple of hours of predictions.
      </div>
    );
  }

  const width = 800;
  const height = 220;
  const padX = 16;
  const padY = 28;
  const minH = Math.min(...points.map((p) => p.heightFt));
  const maxH = Math.max(...points.map((p) => p.heightFt));
  const span = Math.max(0.6, maxH - minH);
  const t0 = new Date(points[0].time).getTime();
  const t1 = new Date(points[points.length - 1].time).getTime();

  const xOf = (iso: string) =>
    padX + ((new Date(iso).getTime() - t0) / (t1 - t0)) * (width - padX * 2);
  const yOf = (h: number) =>
    height - padY - ((h - minH) / span) * (height - padY * 2);

  const d = points
    .map((point, index) => {
      const cmd = index === 0 ? "M" : "L";
      return `${cmd}${xOf(point.time).toFixed(1)} ${yOf(point.heightFt).toFixed(1)}`;
    })
    .join(" ");

  const area = `${d} L${xOf(points[points.length - 1].time).toFixed(1)} ${height - 8} L${xOf(points[0].time).toFixed(1)} ${height - 8} Z`;
  const nowX = xOf(nowIso);

  const visibleWindows = windows.filter((window) => {
    const peak = new Date(window.peak).getTime();
    return peak >= t0 && peak <= t1 && window.grade !== "pass";
  });

  return (
    <div className="overflow-hidden rounded-xl bg-secondary/30 ring-1 ring-foreground/10">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full sm:h-60" role="img" aria-label="48-hour tide curve">
        <defs>
          <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.8 0.09 168)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="oklch(0.8 0.09 168)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {visibleWindows.map((window) => {
          const x1 = xOf(window.start);
          const x2 = xOf(window.end);
          const active = window.id === highlightId;
          return (
            <rect
              key={window.id}
              x={Math.min(x1, x2)}
              y={12}
              width={Math.max(4, Math.abs(x2 - x1))}
              height={height - 24}
              rx={6}
              fill="oklch(0.8 0.09 168)"
              opacity={active ? 0.18 : window.grade === "prime" ? 0.1 : 0.05}
            />
          );
        })}
        <path d={area} fill="url(#tideFill)" />
        <path
          d={d}
          fill="none"
          stroke="oklch(0.8 0.09 168)"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {Number.isFinite(nowX) && nowX > padX && nowX < width - padX && (
          <g>
            <line
              x1={nowX}
              x2={nowX}
              y1={10}
              y2={height - 10}
              stroke="oklch(0.76 0.12 58)"
              strokeDasharray="3 4"
              strokeWidth="1.5"
            />
            <text
              x={nowX + 6}
              y={22}
              fill="oklch(0.76 0.12 58)"
              fontSize="11"
            >
              now
            </text>
          </g>
        )}
        {extremes
          .filter((extreme) => {
            const t = new Date(extreme.time).getTime();
            return t >= t0 && t <= t1;
          })
          .map((extreme) => (
            <g key={extreme.time}>
              <circle
                cx={xOf(extreme.time)}
                cy={yOf(extreme.heightFt)}
                r="3.5"
                fill={extreme.type === "H" ? "oklch(0.86 0.06 180)" : "oklch(0.76 0.12 58)"}
              />
              <text
                x={xOf(extreme.time)}
                y={yOf(extreme.heightFt) + (extreme.type === "H" ? -10 : 16)}
                textAnchor="middle"
                fill="oklch(0.8 0.03 200)"
                fontSize="10"
              >
                {extreme.type === "H" ? "H" : "L"} {formatClock(extreme.time, timeZone)}
              </text>
            </g>
          ))}
      </svg>
      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-xs text-muted-foreground">
        <span>Next 48 hours</span>
        <span className={cn("flex items-center gap-3")}>
          <span>Foam bands are scored windows</span>
          <span className="hidden sm:inline">Heights in feet, MLLW</span>
        </span>
      </div>
    </div>
  );
}
