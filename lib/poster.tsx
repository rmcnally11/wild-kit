"use client";

import { forwardRef } from "react";

import { money } from "@/lib/money";
import {
  PAPERS,
  SHEETS,
  type DecoId,
  type MenuItem,
  type PaperId,
  type SheetId,
} from "@/lib/types";

type Props = {
  name: string;
  kidName: string;
  headline: string;
  subhead: string;
  paper: PaperId;
  deco: DecoId;
  sheet?: SheetId;
  corner?: string;
  venmo?: string;
  menu: MenuItem[];
};

export const StandPoster = forwardRef<SVGSVGElement, Props>(function StandPoster(
  { name, kidName, headline, subhead, paper, deco, sheet = "tabloid", corner, venmo, menu },
  ref,
) {
  const colors = PAPERS[paper];
  const { w, h } = SHEETS[sheet].view;
  const title = (headline.trim() || name.trim() || "LEMONADE").toUpperCase();
  const line = subhead.trim() || "OPEN TODAY";
  const live = menu.filter((item) => !item.soldOut).slice(0, 5);
  const scale = h / 1100;
  const titleSize = (title.length > 14 ? 54 : title.length > 9 ? 68 : 84) * scale;
  const cx = w / 2;
  const y = (part: number) => part * h;

  const menuTop = y(0.33);
  const menuHeight = Math.max(y(0.22), 160 * scale + live.length * 52 * scale);
  const row = 52 * scale;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${title} yard poster, ${SHEETS[sheet].short}`}
      className="block h-auto w-full print:h-full print:w-full"
    >
      <rect width={w} height={h} fill={colors.fill} />
      <path
        d={`M28 36 Q 40 22 70 30 H ${w - 70} Q ${w - 30} 24 ${w - 24} 70 V ${h - 70} Q ${w - 18} ${h - 26} ${w - 60} ${h - 30} H 70 Q 28 ${h - 22} 24 ${h - 66} V 70 Q 18 28 28 36 Z`}
        fill="none"
        stroke={colors.ink}
        strokeWidth={8}
        strokeLinejoin="round"
      />
      <path
        d={`M48 56 H ${w - 48} V ${h - 56} H 48 Z`}
        fill="none"
        stroke={colors.ink}
        strokeOpacity="0.25"
        strokeWidth="3"
        strokeDasharray="10 12"
      />

      <Decorations deco={deco} ink={colors.ink} w={w} h={h} />

      <text
        x={cx}
        y={y(0.19)}
        textAnchor="middle"
        fill={colors.ink}
        fontSize={titleSize}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        transform={`rotate(-2 ${cx} ${y(0.19)})`}
      >
        {title.length > 22 ? `${title.slice(0, 21)}…` : title}
      </text>
      <text
        x={cx + 5}
        y={y(0.275)}
        textAnchor="middle"
        fill={colors.ink}
        fontSize={42 * scale}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        transform={`rotate(1.5 ${cx + 5} ${y(0.275)})`}
      >
        {line.length > 28 ? `${line.slice(0, 27)}…` : line}
      </text>

      <g transform={`rotate(-1.5 ${cx} ${menuTop + menuHeight / 2})`}>
        <rect
          x={130}
          y={menuTop}
          width={590}
          height={menuHeight}
          rx="8"
          fill="#fffdf6"
        />
        <rect
          x={130}
          y={menuTop}
          width={590}
          height={menuHeight}
          rx="8"
          fill="none"
          stroke={colors.ink}
          strokeWidth="6"
        />
        <rect
          x={160}
          y={menuTop - 12}
          width="70"
          height="28"
          rx="3"
          fill="#f3e2a0"
          stroke={colors.ink}
          strokeWidth="3"
        />
        <rect
          x={620}
          y={menuTop - 12}
          width="70"
          height="28"
          rx="3"
          fill="#f3e2a0"
          stroke={colors.ink}
          strokeWidth="3"
        />
        <text
          x={cx}
          y={menuTop + 70 * scale}
          textAnchor="middle"
          fill={colors.ink}
          fontSize={36 * scale}
          fontWeight="800"
          fontFamily="Fredoka, Nunito, sans-serif"
        >
          THE MENU
        </text>
        {live.map((item, index) => (
          <g key={item.id}>
            <text
              x={180}
              y={menuTop + 140 * scale + index * row}
              fill={colors.ink}
              fontSize={32 * scale}
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
            >
              {item.name.length > 18 ? `${item.name.slice(0, 17)}…` : item.name}
            </text>
            <text
              x={670}
              y={menuTop + 140 * scale + index * row}
              textAnchor="end"
              fill={colors.ink}
              fontSize={32 * scale}
              fontWeight="800"
              fontFamily="Fredoka, Nunito, sans-serif"
            >
              {money(item.price)}
            </text>
          </g>
        ))}
      </g>

      <text
        x={cx}
        y={y(0.89)}
        textAnchor="middle"
        fill={colors.ink}
        fontSize={28 * scale}
        fontWeight="800"
        fontFamily="Nunito, sans-serif"
      >
        {corner
          ? corner.length > 40
            ? `${corner.slice(0, 39)}…`
            : corner
          : "Look for the table"}
      </text>
      <text
        x={cx}
        y={y(0.935)}
        textAnchor="middle"
        fill={colors.ink}
        fontSize={24 * scale}
        fontWeight="700"
        fontFamily="Nunito, sans-serif"
      >
        {venmo
          ? `Cash or Venmo ${venmo}`
          : kidName
            ? `Ask for ${kidName}`
            : "Cash is great"}
      </text>
    </svg>
  );
});

function Decorations({
  deco,
  ink,
  w,
  h,
}: {
  deco: DecoId;
  ink: string;
  w: number;
  h: number;
}) {
  if (deco === "stars") {
    return (
      <g fill={ink}>
        <Star x={90} y={h * 0.11} />
        <Star x={w - 90} y={h * 0.13} />
        <Star x={80} y={h * 0.78} />
        <Star x={w - 80} y={h * 0.8} />
      </g>
    );
  }
  if (deco === "suns") {
    return (
      <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
        <Sun x={90} y={h * 0.12} />
        <Sun x={w - 90} y={h * 0.14} />
      </g>
    );
  }
  if (deco === "arrows") {
    return (
      <g fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round">
        <path d={`M80 ${h * 0.84} L200 ${h * 0.74} L80 ${h * 0.73}`} />
        <path d={`M${w - 80} ${h * 0.18} L${w - 200} ${h * 0.25} L${w - 80} ${h * 0.27}`} />
      </g>
    );
  }
  if (deco === "hearts") {
    return (
      <g fill={ink}>
        <Heart x={90} y={h * 0.13} />
        <Heart x={w - 90} y={h * 0.145} />
        <Heart x={90} y={h * 0.82} />
        <Heart x={w - 90} y={h * 0.82} />
      </g>
    );
  }
  return (
    <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
      <path d={`M100 ${h * 0.16} q 10 30 -6 50`} />
      <path d={`M130 ${h * 0.17} q 8 28 -4 46`} />
      <path d={`M${w - 100} ${h * 0.16} q -10 30 6 50`} />
      <path d={`M${w - 130} ${h * 0.17} q -8 28 4 46`} />
    </g>
  );
}

function Star({ x, y }: { x: number; y: number }) {
  return (
    <polygon points={`${x},${y - 22} ${x + 8},${y - 6} ${x + 24},${y - 6} ${x + 12},${y + 6} ${x + 16},${y + 22} ${x},${y + 12} ${x - 16},${y + 22} ${x - 12},${y + 6} ${x - 24},${y - 6} ${x - 8},${y - 6}`} />
  );
}

function Sun({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" />
      <line x1={x} y1={y - 30} x2={x} y2={y - 22} />
      <line x1={x} y1={y + 22} x2={x} y2={y + 30} />
      <line x1={x - 30} y1={y} x2={x - 22} y2={y} />
      <line x1={x + 22} y1={y} x2={x + 30} y2={y} />
    </g>
  );
}

function Heart({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y + 16} C${x - 28} ${y - 6}, ${x - 12} ${y - 24}, ${x} ${y - 8} C${x + 12} ${y - 24}, ${x + 28} ${y - 6}, ${x} ${y + 16}Z`}
    />
  );
}
