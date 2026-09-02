import { PALETTES, type BadgeId, type MascotId, type PaletteId } from "@/lib/types";

export function StandLogo({
  name,
  palette,
  badge,
  mascot,
  size = 220,
}: {
  name: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  size?: number;
}) {
  const colors = PALETTES[palette];
  const label = name.trim() || "My Stand";

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label={`${label} logo`}
    >
      <rect width="240" height="240" rx="36" fill={colors.paper} />
      {badge === "circle" && (
        <circle cx="120" cy="108" r="78" fill={colors.pop} />
      )}
      {badge === "ticket" && (
        <rect x="36" y="36" width="168" height="148" rx="28" fill={colors.pop} />
      )}
      {badge === "banner" && (
        <path d="M28 48h184l-16 72 16 72H28l16-72z" fill={colors.pop} />
      )}
      {badge === "diamond" && (
        <path d="M120 22l86 86-86 86-86-86z" fill={colors.pop} />
      )}
      <g transform="translate(120 96)">
        {mascot === "lemon" && (
          <g>
            <ellipse cx="0" cy="0" rx="34" ry="26" fill={colors.paper} stroke={colors.ink} strokeWidth="4" />
            <path d="M8-26c8-10 22-10 26-2" fill="none" stroke={colors.leaf} strokeWidth="5" />
            <circle cx="-10" cy="-2" r="2" fill={colors.ink} />
            <circle cx="10" cy="-2" r="2" fill={colors.ink} />
            <path d="M-8 8c6 6 10 6 16 0" fill="none" stroke={colors.ink} strokeWidth="3" />
          </g>
        )}
        {mascot === "cup" && (
          <g>
            <path d="M-22-18h44l-6 48h-32z" fill={colors.paper} stroke={colors.ink} strokeWidth="4" />
            <path d="M22-10h12c4 8 4 18 0 26h-10" fill="none" stroke={colors.ink} strokeWidth="4" />
            <ellipse cx="0" cy="-18" rx="22" ry="7" fill={colors.leaf} />
          </g>
        )}
        {mascot === "sun" && (
          <g>
            <circle cx="0" cy="0" r="22" fill={colors.paper} stroke={colors.ink} strokeWidth="4" />
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = (index * Math.PI) / 4;
              return (
                <line
                  key={index}
                  x1={Math.cos(angle) * 30}
                  y1={Math.sin(angle) * 30}
                  x2={Math.cos(angle) * 40}
                  y2={Math.sin(angle) * 40}
                  stroke={colors.ink}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}
      </g>
      <text
        x="120"
        y="208"
        textAnchor="middle"
        fill={colors.ink}
        fontSize={label.length > 14 ? 16 : 20}
        fontWeight="800"
        fontFamily="Fredoka, Nunito, sans-serif"
      >
        {label.length > 18 ? `${label.slice(0, 17)}…` : label}
      </text>
    </svg>
  );
}
