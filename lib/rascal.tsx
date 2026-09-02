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

function RascalFace({ pose }: { pose: Pose }) {
  return (
    <g>
      {pose === "boss" && (
        <path d="M28 86 Q 60 104 92 86 L 88 118 H 32 Z" fill="#FFF6E8" stroke="#1C1A19" strokeWidth="4" />
      )}
      {pose === "scheme" && (
        <g transform="rotate(18 98 78)">
          <rect x="90" y="48" width="14" height="44" rx="3" fill="#E85D75" stroke="#1C1A19" strokeWidth="3" />
          <circle cx="97" cy="46" r="6" fill="#FFF6E8" stroke="#1C1A19" strokeWidth="3" />
        </g>
      )}
      <ellipse cx="38" cy="38" rx="16" ry="18" fill="#8E8680" stroke="#1C1A19" strokeWidth="4" />
      <path d="M48 28 L 54 18 L 42 24 Z" fill="#8E8680" stroke="#1C1A19" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="82" cy="36" rx="16" ry="18" fill="#8E8680" stroke="#1C1A19" strokeWidth="4" />
      <ellipse cx="38" cy="40" rx="8" ry="9" fill="#FFF6E8" />
      <ellipse cx="82" cy="38" rx="8" ry="9" fill="#FFF6E8" />
      <ellipse cx="60" cy="64" rx="34" ry="32" fill="#B7AFA6" stroke="#1C1A19" strokeWidth="4" />
      <ellipse cx="60" cy="74" rx="20" ry="16" fill="#FFF6E8" />
      <g transform="rotate(-8 60 58)">
        <path d="M26 56 Q 60 44 94 56 Q 94 72 60 70 Q 26 72 26 56 Z" fill="#1C1A19" />
        <circle cx="46" cy="58" r="10" fill="#FFF6E8" />
        <circle cx="74" cy="58" r="10" fill="#FFF6E8" />
        <circle cx="47" cy="59" r="5" fill="#1C1A19" />
        <circle cx="75" cy="59" r="5" fill="#1C1A19" />
        <circle cx="44" cy="56" r="1.6" fill="#FFF6E8" />
        <circle cx="72" cy="56" r="1.6" fill="#FFF6E8" />
      </g>
      <ellipse cx="60" cy="72" rx="5" ry="4" fill="#1C1A19" />
      {pose === "done" ? (
        <>
          <path d="M48 80 Q 60 90 72 80" fill="none" stroke="#1C1A19" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 78 Q 48 84 52 78" fill="none" stroke="#E85D75" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 78 Q 72 84 76 78" fill="none" stroke="#E85D75" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <path d="M50 80 Q 60 88 70 80" fill="none" stroke="#1C1A19" strokeWidth="3" strokeLinecap="round" />
      )}
      {pose === "boss" && (
        <path d="M40 92 H 80" fill="none" stroke="#1C1A19" strokeWidth="3" />
      )}
    </g>
  );
}

export function RascalBadge({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <rect width="120" height="120" fill="#F5C518" />
      <g transform="translate(0 4)">
        <RascalFace pose="boss" />
      </g>
    </svg>
  );
}
