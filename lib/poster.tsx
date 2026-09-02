"use client";

import { forwardRef } from "react";

import { money } from "@/lib/money";
import {
  PAPERS,
  type DecoId,
  type MenuItem,
  type PaperId,
} from "@/lib/types";

type Props = {
  name: string;
  kidName: string;
  headline: string;
  subhead: string;
  paper: PaperId;
  deco: DecoId;
  corner?: string;
  venmo?: string;
  menu: MenuItem[];
  width?: number;
};

export const StandPoster = forwardRef<SVGSVGElement, Props>(function StandPoster(
  { name, kidName, headline, subhead, paper, deco, corner, venmo, menu, width = 320 },
  ref,
) {
  const colors = PAPERS[paper];
  const title = (headline.trim() || name.trim() || "LEMONADE").toUpperCase();
  const line = subhead.trim() || "OPEN TODAY";
  const live = menu.filter((item) => !item.soldOut).slice(0, 5);
  const titleSize = title.length > 14 ? 54 : title.length > 9 ? 68 : 84;

  return (
    <svg
      ref={ref}
      viewBox="0 0 850 1100"
      width={width}
      height={Math.round(width * (1100 / 850))}
      role="img"
      aria-label={`${title} yard poster`}
    >
      <rect width="850" height="1100" fill={colors.fill} />
      <path
        d="M28 36 Q 40 22 70 30 H 780 Q 820 24 826 70 V 1030 Q 832 1074 790 1070 H 70 Q 28 1078 24 1034 V 70 Q 18 28 28 36 Z"
        fill="none"
        stroke={colors.ink}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M48 56 H 802 V 1044 H 48 Z"
        fill="none"
        stroke={colors.ink}
        strokeOpacity="0.25"
        strokeWidth="3"
        strokeDasharray="10 12"
      />

      <Decorations deco={deco} ink={colors.ink} />

      <text
        x="425"
        y="210"
        textAnchor="middle"
        fill={colors.ink}
        fontSize={titleSize}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        transform="rotate(-2 425 210)"
      >
        {title.length > 22 ? `${title.slice(0, 21)}…` : title}
      </text>
      <text
        x="430"
        y="300"
        textAnchor="middle"
        fill={colors.ink}
        fontSize="42"
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        transform="rotate(1.5 430 300)"
      >
        {line.length > 28 ? `${line.slice(0, 27)}…` : line}
      </text>

      <g transform="rotate(-1.5 425 620)">
        <rect x="130" y="360" width="590" height={220 + live.length * 52} rx="8" fill="#fffdf6" />
        <rect
          x="130"
          y="360"
          width="590"
          height={220 + live.length * 52}
          rx="8"
          fill="none"
          stroke={colors.ink}
          strokeWidth="6"
        />
        <rect x="160" y="348" width="70" height="28" rx="3" fill="#f3e2a0" stroke={colors.ink} strokeWidth="3" />
        <rect x="620" y="348" width="70" height="28" rx="3" fill="#f3e2a0" stroke={colors.ink} strokeWidth="3" />
        <text
          x="425"
          y="430"
          textAnchor="middle"
          fill={colors.ink}
          fontSize="36"
          fontWeight="800"
          fontFamily="Fredoka, Nunito, sans-serif"
        >
          THE MENU
        </text>
        {live.map((item, index) => (
          <g key={item.id}>
            <text
              x="180"
              y={500 + index * 52}
              fill={colors.ink}
              fontSize="32"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
            >
              {item.name.length > 18 ? `${item.name.slice(0, 17)}…` : item.name}
            </text>
            <text
              x="670"
              y={500 + index * 52}
              textAnchor="end"
              fill={colors.ink}
              fontSize="32"
              fontWeight="800"
              fontFamily="Fredoka, Nunito, sans-serif"
            >
              {money(item.price)}
            </text>
          </g>
        ))}
      </g>

      {corner ? (
        <text
          x="425"
          y="980"
          textAnchor="middle"
          fill={colors.ink}
          fontSize="28"
          fontWeight="800"
          fontFamily="Nunito, sans-serif"
        >
          {corner.length > 40 ? `${corner.slice(0, 39)}…` : corner}
        </text>
      ) : (
        <text
          x="425"
          y="980"
          textAnchor="middle"
          fill={colors.ink}
          fontSize="28"
          fontWeight="800"
          fontFamily="Nunito, sans-serif"
        >
          Look for the table
        </text>
      )}
      <text
        x="425"
        y="1030"
        textAnchor="middle"
        fill={colors.ink}
        fontSize="24"
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

function Decorations({ deco, ink }: { deco: DecoId; ink: string }) {
  if (deco === "stars") {
    return (
      <g fill={ink}>
        <Star x={90} y={120} />
        <Star x={760} y={140} />
        <Star x={80} y={860} />
        <Star x={770} y={880} />
      </g>
    );
  }
  if (deco === "suns") {
    return (
      <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
        <Sun x={90} y={130} />
        <Sun x={760} y={150} />
      </g>
    );
  }
  if (deco === "arrows") {
    return (
      <g fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round">
        <path d="M80 920 L200 820 L80 800" />
        <path d="M770 200 L650 280 L770 300" />
      </g>
    );
  }
  if (deco === "hearts") {
    return (
      <g fill={ink}>
        <Heart x={90} y={140} />
        <Heart x={760} y={160} />
        <Heart x={90} y={900} />
        <Heart x={760} y={900} />
      </g>
    );
  }
  return (
    <g fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round">
      <path d="M100 180 q 10 30 -6 50" />
      <path d="M130 190 q 8 28 -4 46" />
      <path d="M750 180 q -10 30 6 50" />
      <path d="M720 190 q -8 28 4 46" />
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
