/** The artifact on the homepage. Show the poster. Do not say print in the company mouth. */
export function CrookedPoster() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem]">
      <svg
        viewBox="0 0 280 340"
        role="img"
        aria-label="A crooked lemonade poster taped to the board"
        className="h-auto w-full drop-shadow-[8px_14px_0_rgba(28,26,25,0.12)]"
      >
        <rect x="18" y="22" width="248" height="300" rx="6" fill="#1C1A19" opacity="0.08" />
        <g transform="rotate(-5 140 170)">
          <rect x="28" y="28" width="224" height="284" rx="4" fill="#FFFAF0" stroke="#1C1A19" strokeWidth="5" />
          <rect x="40" y="44" width="200" height="252" fill="none" stroke="#EAD7A2" strokeWidth="2" />
          <text
            x="140"
            y="92"
            textAnchor="middle"
            fill="#1C1A19"
            fontFamily="Fredoka, ui-rounded, system-ui"
            fontSize="38"
            fontWeight="700"
          >
            LEMONADE
          </text>
          <text
            x="140"
            y="122"
            textAnchor="middle"
            fill="#E85D75"
            fontFamily="Fredoka, ui-rounded, system-ui"
            fontSize="22"
            fontWeight="600"
          >
            OPEN
          </text>
          <ellipse cx="140" cy="178" rx="38" ry="28" fill="#F5C518" stroke="#1C1A19" strokeWidth="4" />
          <rect x="128" y="150" width="24" height="18" rx="3" fill="#FFF6E8" stroke="#1C1A19" strokeWidth="3" />
          <path d="M176 170 h18 v16 h-8" fill="none" stroke="#1C1A19" strokeWidth="4" strokeLinecap="round" />
          <text
            x="140"
            y="238"
            textAnchor="middle"
            fill="#1C1A19"
            fontFamily="Fredoka, ui-rounded, system-ui"
            fontSize="48"
            fontWeight="700"
          >
            $1
          </text>
          <text
            x="140"
            y="268"
            textAnchor="middle"
            fill="#5B564F"
            fontFamily="Nunito, system-ui"
            fontSize="14"
            fontWeight="800"
          >
            Crooked is fine.
          </text>
        </g>
        <rect x="46" y="18" width="52" height="18" rx="2" fill="#EAD7A2" stroke="#1C1A19" strokeWidth="2" transform="rotate(-8 72 27)" />
        <rect x="186" y="36" width="48" height="16" rx="2" fill="#EAD7A2" stroke="#1C1A19" strokeWidth="2" transform="rotate(12 210 44)" />
      </svg>
      <figcaption className="sr-only">The poster is the product.</figcaption>
    </figure>
  );
}
