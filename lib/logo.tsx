"use client";

import { forwardRef, useId } from "react";

import { money } from "@/lib/money";
import { PALETTES, type BadgeId, type MascotId, type MenuItem, type PaletteId } from "@/lib/types";

type LogoProps = {
  name: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  size?: number;
};

type Colors = (typeof PALETTES)[PaletteId];

export const StandLogo = forwardRef<SVGSVGElement, LogoProps>(function StandLogo(
  { name, palette, badge, mascot, size = 280 },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const colors = PALETTES[palette];
  const label = stickerLabel(name);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 320"
      width={size}
      height={size}
      role="img"
      aria-label={`${label} logo`}
    >
      <LogoDefs uid={uid} ink={colors.ink} />
      <g filter={`url(#${uid}-shadow)`}>
        <LogoMark colors={colors} badge={badge} mascot={mascot} label={label} />
      </g>
    </svg>
  );
});

type SignProps = {
  name: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  menu: MenuItem[];
  corner?: string;
  venmo?: string;
  width?: number;
};

export const StandSign = forwardRef<SVGSVGElement, SignProps>(function StandSign(
  { name, palette, badge, mascot, menu, corner, venmo, width = 320 },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const colors = PALETTES[palette];
  const label = stickerLabel(name);
  const live = menu.filter((item) => !item.soldOut);
  const height = 1100;
  const pageWidth = 850;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${pageWidth} ${height}`}
      width={width}
      height={Math.round(width * (height / pageWidth))}
      role="img"
      aria-label={`${label} table sign`}
    >
      <LogoDefs uid={uid} ink={colors.ink} />
      <rect width={pageWidth} height={height} fill="#fffdf6" />
      <g transform="translate(185 36)">
        <g filter={`url(#${uid}-shadow)`}>
          <LogoMark colors={colors} badge={badge} mascot={mascot} label={label} />
        </g>
      </g>
      <text
        x="425"
        y="420"
        textAnchor="middle"
        fill={colors.ink}
        fontSize="52"
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        letterSpacing="6"
      >
        OPEN
      </text>
      {corner ? (
        <text
          x="425"
          y="468"
          textAnchor="middle"
          fill={colors.ink}
          fontSize="26"
          fontWeight="700"
          fontFamily="Nunito, sans-serif"
        >
          {corner.length > 42 ? `${corner.slice(0, 41)}…` : corner}
        </text>
      ) : null}
      {live.slice(0, 6).map((item, index) => {
        const y = 540 + index * (live.length > 4 ? 52 : 62);
        return (
          <g key={item.id}>
            <text
              x="110"
              y={y}
              fill={colors.ink}
              fontSize="36"
              fontWeight="800"
              fontFamily="Fredoka, Nunito, sans-serif"
            >
              {item.name.length > 22 ? `${item.name.slice(0, 21)}…` : item.name}
            </text>
            <text
              x="740"
              y={y}
              textAnchor="end"
              fill={colors.ink}
              fontSize="36"
              fontWeight="800"
              fontFamily="Fredoka, Nunito, sans-serif"
            >
              {money(item.price)}
            </text>
            <line
              x1="110"
              y1={y + 14}
              x2="740"
              y2={y + 14}
              stroke={colors.ink}
              strokeOpacity="0.12"
              strokeWidth="3"
            />
          </g>
        );
      })}
      <text
        x="425"
        y="1020"
        textAnchor="middle"
        fill={colors.ink}
        fontSize="28"
        fontWeight="800"
        fontFamily="Nunito, sans-serif"
      >
        Cash is great
      </text>
    </svg>
  );
});

function LogoDefs({ uid, ink }: { uid: string; ink: string }) {
  return (
    <defs>
      <filter id={`${uid}-shadow`} x="-18%" y="-12%" width="136%" height="140%">
        <feDropShadow dx="0" dy="9" stdDeviation="7" floodColor={ink} floodOpacity="0.2" />
      </filter>
    </defs>
  );
}

function LogoMark({
  colors,
  badge,
  mascot,
  label,
}: {
  colors: Colors;
  badge: BadgeId;
  mascot: MascotId;
  label: string;
}) {
  const fontSize = label.length > 16 ? 17 : label.length > 11 ? 21 : 26;

  return (
    <g>
      <DieCut badge={badge} fill="white" />
      <DieCut badge={badge} fill="none" stroke={colors.ink} strokeWidth={10} />
      <InnerBadge badge={badge} fill={colors.pop} />
      <Tape x={58} y={22} rotate={-16} />
      <Tape x={214} y={26} rotate={14} />
      <g transform="translate(160 132)">
        {mascot === "lemon" && <Lemon ink={colors.ink} shine={colors.shine} leaf={colors.leaf} />}
        {mascot === "cup" && <Cup ink={colors.ink} shine={colors.shine} leaf={colors.leaf} />}
        {mascot === "sun" && <Sun ink={colors.ink} shine={colors.shine} />}
        {mascot === "bolt" && <Bolt ink={colors.ink} shine={colors.shine} />}
      </g>
      <path
        d="M42 228h236l-14 24 14 24H42l14-24z"
        fill={colors.paper}
        stroke={colors.ink}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <text
        key={label}
        x="160"
        y="264"
        textAnchor="middle"
        fill={colors.ink}
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        letterSpacing="0.6"
      >
        {label}
      </text>
    </g>
  );
}

function DieCut({
  badge,
  fill,
  stroke,
  strokeWidth,
}: {
  badge: BadgeId;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const strokeProps = { fill, stroke, strokeWidth, strokeLinejoin: "round" as const };

  if (badge === "circle") {
    return <path d={scallopPath(160, 148, 118, 18)} {...strokeProps} />;
  }
  if (badge === "ticket") {
    return <path d={TICKET_PATH} {...strokeProps} />;
  }
  if (badge === "banner") {
    return <path d="M52 36h216l-28 112 28 112H52l28-112z" {...strokeProps} />;
  }
  return <path d="M160 28l124 120-124 120L36 148z" {...strokeProps} />;
}

function InnerBadge({ badge, fill }: { badge: BadgeId; fill: string }) {
  if (badge === "circle") return <circle cx="160" cy="148" r="98" fill={fill} />;
  if (badge === "ticket") return <rect x="56" y="56" width="208" height="208" rx="28" fill={fill} />;
  if (badge === "banner") return <path d="M72 56h176l-22 104 22 104H72l22-104z" fill={fill} />;
  return <path d="M160 52l96 96-96 96-96-96z" fill={fill} />;
}

function Tape({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <rect
      x={x}
      y={y}
      width="50"
      height="20"
      rx="3"
      fill="#f3e2a0"
      stroke="#2A2416"
      strokeWidth="3"
      transform={`rotate(${rotate} ${x + 25} ${y + 10})`}
    />
  );
}

function Lemon({ ink, shine, leaf }: { ink: string; shine: string; leaf: string }) {
  return (
    <g>
      <ellipse cx="6" cy="10" rx="58" ry="42" fill={ink} opacity="0.1" />
      <ellipse cx="0" cy="0" rx="56" ry="40" fill={shine} stroke={ink} strokeWidth="7" />
      <ellipse cx="-14" cy="-10" rx="16" ry="9" fill="white" opacity="0.7" />
      <path d="M18-38c16-20 40-16 44 0" fill="none" stroke={leaf} strokeWidth="8" strokeLinecap="round" />
      <path d="M32-42c3-16 16-20 20-8" fill={leaf} stroke={ink} strokeWidth="3.5" />
      <circle cx="-16" cy="-2" r="5" fill={ink} />
      <circle cx="16" cy="-2" r="5" fill={ink} />
      <circle cx="-16" cy="-3.5" r="1.6" fill="white" />
      <circle cx="16" cy="-3.5" r="1.6" fill="white" />
      <path d="M-18 16c10 14 26 14 36 0" fill="none" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
    </g>
  );
}

function Cup({ ink, shine, leaf }: { ink: string; shine: string; leaf: string }) {
  return (
    <g>
      <path d="M-36-20h72l-12 78H-24z" fill={shine} stroke={ink} strokeWidth="7" strokeLinejoin="round" />
      <path d="M36-8h20c9 14 9 32 0 46H32" fill="none" stroke={ink} strokeWidth="7" />
      <ellipse cx="0" cy="-20" rx="36" ry="12" fill={leaf} stroke={ink} strokeWidth="4" />
      <path d="M8-48c2-16 18-18 18-4" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
      <rect x="4" y="-62" width="10" height="16" rx="3" fill={ink} />
      <circle cx="-10" cy="8" r="4" fill={ink} />
      <circle cx="10" cy="8" r="4" fill={ink} />
      <path d="M-10 20c6 8 14 8 20 0" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Sun({ ink, shine }: { ink: string; shine: string }) {
  return (
    <g>
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index * Math.PI) / 4 - Math.PI / 2;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        return (
          <polygon
            key={index}
            points={`${x * 34},${y * 34} ${x * 62 - y * 6},${y * 62 + x * 6} ${x * 62 + y * 6},${y * 62 - x * 6}`}
            fill={shine}
            stroke={ink}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        );
      })}
      <circle cx="0" cy="0" r="32" fill={shine} stroke={ink} strokeWidth="7" />
      <circle cx="-11" cy="-4" r="5" fill={ink} />
      <circle cx="11" cy="-4" r="5" fill={ink} />
      <circle cx="-11" cy="-5.4" r="1.5" fill="white" />
      <circle cx="11" cy="-5.4" r="1.5" fill="white" />
      <path d="M-12 12c7 10 17 10 24 0" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Bolt({ ink, shine }: { ink: string; shine: string }) {
  return (
    <g>
      <path
        d="M16-54L-32 6h24L-6 56l52-66H22z"
        fill={shine}
        stroke={ink}
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M-4-6h18" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <circle cx="-2" cy="2" r="3.5" fill={ink} />
      <circle cx="12" cy="2" r="3.5" fill={ink} />
    </g>
  );
}

const TICKET_PATH =
  "M56 38H264Q282 38 282 56V142A18 18 0 0 0 282 178V264Q282 282 264 282H56Q38 282 38 264V178A18 18 0 0 1 38 142V56Q38 38 56 38Z";

function scallopPath(cx: number, cy: number, radius: number, bumps: number) {
  const parts: string[] = [];
  for (let index = 0; index < bumps; index += 1) {
    const start = (index / bumps) * Math.PI * 2 - Math.PI / 2;
    const end = ((index + 1) / bumps) * Math.PI * 2 - Math.PI / 2;
    const mid = (start + end) / 2;
    const x0 = cx + radius * Math.cos(start);
    const y0 = cy + radius * Math.sin(start);
    const x1 = cx + radius * Math.cos(end);
    const y1 = cy + radius * Math.sin(end);
    const bump = radius + 9;
    const xm = cx + bump * Math.cos(mid);
    const ym = cy + bump * Math.sin(mid);
    parts.push(index === 0 ? `M ${x0.toFixed(1)} ${y0.toFixed(1)}` : "");
    parts.push(`Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
  }
  return `${parts.join(" ")} Z`;
}

function stickerLabel(name: string) {
  const label = (name.trim() || "MY STAND").toUpperCase();
  return label.length > 20 ? `${label.slice(0, 19)}…` : label;
}
