type Pose = "boss" | "scheme" | "done";

export function Rascal({
  pose = "boss",
  size = 96,
  line,
}: {
  pose?: Pose;
  size?: number;
  line?: string;
}) {
  const label =
    line ||
    (pose === "scheme"
      ? "Draw it however you want."
      : pose === "done"
        ? "Go outside."
        : "You’re the boss of this stand.");

  return (
    <figure className="grid justify-items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        role="img"
        aria-label="Rascal"
      >
        <RascalFace pose={pose} />
      </svg>
      {line !== "" && (
        <figcaption className="max-w-[16rem] text-center font-display text-lg leading-tight">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export function RascalFace({ pose }: { pose: Pose }) {
  return (
    <g>
      {pose === "boss" && (
        <path
          d="M30 88 Q 58 108 90 86 L 86 118 H 34 Z"
          fill="#FFF6E8"
          stroke="#1C1A19"
          strokeWidth="4"
        />
      )}
      {pose === "scheme" && (
        <g transform="rotate(22 100 76)">
          <rect x="92" y="46" width="13" height="46" rx="3" fill="#E85D75" stroke="#1C1A19" strokeWidth="3" />
          <circle cx="98.5" cy="44" r="6" fill="#FFF6E8" stroke="#1C1A19" strokeWidth="3" />
        </g>
      )}
      {/* Ears — uneven on purpose */}
      <ellipse cx="34" cy="36" rx="15" ry="20" fill="#8E8680" stroke="#1C1A19" strokeWidth="4" />
      <ellipse cx="34" cy="38" rx="7" ry="10" fill="#FFF6E8" />
      <ellipse cx="86" cy="34" rx="14" ry="17" fill="#8E8680" stroke="#1C1A19" strokeWidth="4" />
      <ellipse cx="86" cy="36" rx="6.5" ry="8" fill="#FFF6E8" />
      <path d="M46 24 L 58 10 L 44 22 Z" fill="#8E8680" stroke="#1C1A19" strokeWidth="3" strokeLinejoin="round" />
      {/* Head */}
      <ellipse cx="58" cy="66" rx="36" ry="33" fill="#B7AFA6" stroke="#1C1A19" strokeWidth="4" />
      <ellipse cx="60" cy="78" rx="20" ry="16" fill="#FFF6E8" />
      {/* Crooked mask, too-awake eyes */}
      <g transform="rotate(-16 60 58)">
        <path d="M22 56 Q 60 40 98 54 Q 98 74 60 72 Q 22 74 22 56 Z" fill="#1C1A19" />
        <ellipse cx="44" cy="58" rx="12" ry="11" fill="#FFF6E8" />
        <ellipse cx="76" cy="56" rx="10" ry="12" fill="#FFF6E8" />
        <circle cx="46" cy="59" r="5.5" fill="#1C1A19" />
        <circle cx="76" cy="57" r="4.6" fill="#1C1A19" />
        <circle cx="43" cy="56" r="1.8" fill="#FFF6E8" />
        <circle cx="73.5" cy="54.5" r="1.5" fill="#FFF6E8" />
        <path d="M32 46 Q 44 40 52 46" fill="none" stroke="#1C1A19" strokeWidth="3" strokeLinecap="round" />
      </g>
      <ellipse cx="61" cy="74" rx="5.5" ry="4" fill="#1C1A19" />
      {pose === "done" ? (
        <>
          <path d="M48 82 Q 60 92 74 80" fill="none" stroke="#1C1A19" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 80 Q 48 86 52 80" fill="none" stroke="#E85D75" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 80 Q 72 86 76 80" fill="none" stroke="#E85D75" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <path d="M48 82 Q 62 90 74 80" fill="none" stroke="#1C1A19" strokeWidth="3" strokeLinecap="round" />
      )}
      {pose === "boss" && (
        <path d="M38 94 H 82" fill="none" stroke="#1C1A19" strokeWidth="3" />
      )}
    </g>
  );
}

export function RascalBadge({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden className="overflow-hidden rounded-lg">
      <rect width="120" height="120" rx="18" fill="#F5C518" />
      <g transform="translate(0 6) scale(0.96)">
        <RascalFace pose="boss" />
      </g>
    </svg>
  );
}

export function RascalHero({ size = 220 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Rascal, the Wild Kit foreman"
      className="overflow-hidden rounded-[1.6rem]"
    >
      <rect width="120" height="120" rx="22" fill="#F5C518" />
      <g transform="translate(2 8) scale(0.96)">
        <RascalFace pose="boss" />
      </g>
    </svg>
  );
}
