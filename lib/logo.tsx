import { forwardRef } from "react";

import { PALETTES, type BadgeId, type MascotId, type PaletteId } from "@/lib/types";

type Props = {
  name: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  size?: number;
};

export const StandLogo = forwardRef<SVGSVGElement, Props>(function StandLogo(
  { name, palette, badge, mascot, size = 280 },
  ref,
) {
  const colors = PALETTES[palette];
  const label = (name.trim() || "MY STAND").toUpperCase();
  const fontSize = label.length > 16 ? 18 : label.length > 11 ? 22 : 28;

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 320"
      width={size}
      height={size}
      role="img"
      aria-label={`${label} logo`}
    >
      <defs>
        <filter id="sticker-shadow" x="-12%" y="-8%" width="130%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor={colors.ink} floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#sticker-shadow)">
        <rect x="18" y="18" width="284" height="284" rx="48" fill="white" />
        <rect
          x="18"
          y="18"
          width="284"
          height="284"
          rx="48"
          fill="none"
          stroke={colors.ink}
          strokeWidth="10"
        />
      </g>

      {badge === "circle" && (
        <circle cx="160" cy="142" r="96" fill={colors.pop} />
      )}
      {badge === "ticket" && (
        <rect x="52" y="52" width="216" height="186" rx="36" fill={colors.pop} />
      )}
      {badge === "banner" && (
        <path d="M44 56h232l-22 88 22 88H44l22-88z" fill={colors.pop} />
      )}
      {badge === "diamond" && (
        <path d="M160 40l108 102-108 102L52 142z" fill={colors.pop} />
      )}

      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * Math.PI) / 6 - Math.PI / 2;
        return (
          <line
            key={index}
            x1={160 + Math.cos(angle) * 72}
            y1={138 + Math.sin(angle) * 72}
            x2={160 + Math.cos(angle) * 104}
            y2={138 + Math.sin(angle) * 104}
            stroke={colors.ink}
            strokeOpacity="0.16"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}

      <g transform="translate(160 132)">
        {mascot === "lemon" && <Lemon ink={colors.ink} shine={colors.shine} leaf={colors.leaf} />}
        {mascot === "cup" && <Cup ink={colors.ink} shine={colors.shine} leaf={colors.leaf} />}
        {mascot === "sun" && <Sun ink={colors.ink} shine={colors.shine} />}
        {mascot === "bolt" && <Bolt ink={colors.ink} shine={colors.shine} />}
      </g>

      <rect x="46" y="236" width="228" height="50" rx="12" fill={colors.paper} stroke={colors.ink} strokeWidth="5" />
      <text
        x="160"
        y="270"
        textAnchor="middle"
        fill={colors.ink}
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
        letterSpacing="0.5"
      >
        {label.length > 20 ? `${label.slice(0, 19)}…` : label}
      </text>
    </svg>
  );
});

function Lemon({ ink, shine, leaf }: { ink: string; shine: string; leaf: string }) {
  return (
    <g>
      <ellipse cx="4" cy="6" rx="54" ry="40" fill={ink} opacity="0.12" />
      <ellipse cx="0" cy="0" rx="52" ry="38" fill={shine} stroke={ink} strokeWidth="7" />
      <ellipse cx="-8" cy="-6" rx="18" ry="10" fill="white" opacity="0.55" />
      <path d="M14-36c14-18 36-16 42-2" fill="none" stroke={leaf} strokeWidth="8" strokeLinecap="round" />
      <path d="M28-40c2-14 14-18 18-8" fill={leaf} stroke={ink} strokeWidth="3" />
      <circle cx="-16" cy="-4" r="4" fill={ink} />
      <circle cx="14" cy="-4" r="4" fill={ink} />
      <path d="M-14 12c8 10 20 10 28 0" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Cup({ ink, shine, leaf }: { ink: string; shine: string; leaf: string }) {
  return (
    <g>
      <path d="M-34-22h68l-10 72H-24z" fill={shine} stroke={ink} strokeWidth="7" />
      <path d="M34-10h18c8 12 8 28 0 40H30" fill="none" stroke={ink} strokeWidth="7" />
      <ellipse cx="0" cy="-22" rx="34" ry="11" fill={leaf} stroke={ink} strokeWidth="4" />
      <path d="M-10-36c0-10 8-16 14-10" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <rect x="-8" y="8" width="16" height="8" rx="3" fill={ink} />
    </g>
  );
}

function Sun({ ink, shine }: { ink: string; shine: string }) {
  return (
    <g>
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index * Math.PI) / 4;
        return (
          <line
            key={index}
            x1={Math.cos(angle) * 38}
            y1={Math.sin(angle) * 38}
            x2={Math.cos(angle) * 58}
            y2={Math.sin(angle) * 58}
            stroke={ink}
            strokeWidth="8"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="0" cy="0" r="30" fill={shine} stroke={ink} strokeWidth="7" />
      <circle cx="-10" cy="-4" r="4" fill={ink} />
      <circle cx="10" cy="-4" r="4" fill={ink} />
      <path d="M-10 10c6 8 14 8 20 0" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Bolt({ ink, shine }: { ink: string; shine: string }) {
  return (
    <g>
      <path
        d="M12-52L-28 4h22L-8 52l48-62H18z"
        fill={shine}
        stroke={ink}
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M-2-8h16" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}
