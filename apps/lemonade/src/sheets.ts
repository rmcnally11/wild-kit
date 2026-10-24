import {
  COLORS,
  FIRST_APP,
  LEMON_SUPPLIES,
  SITE,
  fieldColor,
} from "@/brand";
import { BOARDS, drawingSvg } from "@/poster";
import { money, type Stand } from "@/store";

export type SheetKind = "poster" | "menu" | "cards" | "sign";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(body: string, paper: string, ink = COLORS.ink, page = "letter portrait") {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${FIRST_APP}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito:wght@600;800&display=swap" rel="stylesheet" />
  <style>
    @page { size: ${page}; margin: 0; }
    html, body { margin: 0; background: ${paper}; color: ${ink}; }
    body { font-family: Nunito, system-ui, sans-serif; }
    h1, h2 { font-family: Fredoka, system-ui, sans-serif; font-weight: 700; margin: 0; }
    html, body { width: 100%; height: 100%; }
    .sheet { min-height: 100vh; width: 100%; height: 100%; box-sizing: border-box; padding: 0.55in; position: relative; overflow: hidden; }
    .kicker { font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; font-size: 13px; margin: 0 0 8px; }
    .line { font-weight: 600; font-size: 18px; margin: 8px 0 0; }
    .row { display: flex; justify-content: space-between; gap: 16px; border-bottom: 2px solid ${ink}; padding: 10px 0; font-weight: 800; font-size: 22px; }
    .foot { margin-top: 28px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
    .hero { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; }
    .mark { flex: 0 0 auto; }
    .lemon { width: 140px; height: 140px; border-radius: 999px; border: 7px solid ${ink}; background: ${COLORS.cream}; position: relative; }
    .lemon .leaf { position: absolute; top: 14px; left: 52px; width: 28px; height: 16px; border-radius: 10px; background: ${COLORS.leaf}; transform: rotate(-18deg); }
    .lemon .shine { position: absolute; top: 52px; left: 52px; width: 28px; height: 28px; border-radius: 999px; background: ${COLORS.lemonade}; }
    .ticket { width: 168px; height: 104px; border-radius: 18px; border: 7px solid ${ink}; background: ${COLORS.cream}; position: relative; }
    .ticket:before, .ticket:after { content: ""; position: absolute; top: 36px; width: 26px; height: 26px; border-radius: 999px; background: ${paper}; border: 6px solid ${ink}; }
    .ticket:before { left: -16px; }
    .ticket:after { right: -16px; }
    .ticket .pip { position: absolute; top: 36px; left: 68px; width: 22px; height: 22px; border-radius: 999px; background: ${COLORS.raspberry}; border: 4px solid ${ink}; }
    .banner { width: 150px; height: 64px; border: 7px solid ${ink}; background: ${COLORS.cream}; border-radius: 8px; position: relative; }
    .banner:after { content: ""; position: absolute; right: 8px; bottom: -22px; border-left: 18px solid transparent; border-right: 18px solid transparent; border-top: 20px solid ${ink}; }
    .no-print { margin: 0 0 16px; }
    .btn { font-family: Nunito, system-ui, sans-serif; font-weight: 800; font-size: 16px; background: ${COLORS.lemonade}; color: ${ink}; border: 0; border-radius: 14px; padding: 12px 18px; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="no-print"><button class="btn" onclick="window.print()">Print this sheet</button></div>
    ${body}
  </div>
</body>
</html>`;
}

export function buildSheet(kind: SheetKind, stand: Stand) {
  const name = esc(stand.standName.trim() || "Lemonade Stand");
  const kid = esc(stand.kidName.trim() || "Kids");
  const field = fieldColor(stand.template);
  const items = stand.menu.filter((item) => item.name.trim());
  const packed = LEMON_SUPPLIES.filter((item) => stand.supplies.includes(item.id));
  const crew = stand.crew.filter((job) => job.who.trim());

  if (kind === "poster") {
    const board = BOARDS[stand.poster.board];
    const page = `${board.inches.w}in ${board.inches.h}in`;
    const rows = items
      .map((item) => `<div class="row"><span>${esc(item.name)}</span><span>${money(item.price)}</span></div>`)
      .join("");
    const people = crew.length
      ? `<p class="line">${crew.map((job) => `${esc(job.who)} · ${esc(job.role)}`).join(" · ")}</p>`
      : "";
    const recipe = stand.todaysRecipe
      ? `<p class="line">Today's pitcher: ${esc(stand.todaysRecipe)}</p>`
      : "";
    const art = drawingSvg(stand.poster, 1000, Math.round(1000 * (board.inches.h / board.inches.w)), field, stand.template);
    return wrap(
      `${art}
       <div class="hero" style="position:relative;z-index:1">
         <div>
           <p class="kicker">This Saturday · ${board.short}</p>
           <h1 style="font-size: 64px; line-height: 0.95;">${name}</h1>
           <p class="line">${kid} invents it. You make it real.</p>
         </div>
       </div>
       ${recipe}
       ${rows}
       ${people}
       <p class="foot">${board.ask} Wild Kit · ${SITE}</p>`,
      field,
      COLORS.ink,
      page,
    );
  }

  if (kind === "sign") return openSignHtml();

  if (kind === "menu") {
    const rows = items
      .map((item) => `<div class="row"><span>${esc(item.name)}</span><span>${money(item.price)}</span></div>`)
      .join("");
    const pack = packed.length
      ? `<p class="line" style="margin-top:24px">Packed from the house: ${packed.map((item) => esc(item.name)).join(" · ")}</p>`
      : "";
    return wrap(
      `<p class="kicker">${FIRST_APP}</p>
       <h1 style="font-size: 52px; line-height: 0.95;">${name}</h1>
       <p class="line">What you sell. Prices ${kid === "Kids" ? "the kid" : kid} set.</p>
       <div style="margin-top: 24px">${rows}</div>
       ${pack}
       <p class="foot">Tape it to the table. Then leave the phone.</p>`,
      COLORS.cream,
    );
  }

  const cards = items
    .map(
      (item) => `<div class="card">
        <p class="ck">${name}</p>
        <h2>${esc(item.name)}</h2>
        <p class="cp">${money(item.price)}</p>
      </div>`,
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${FIRST_APP} · price cards</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Nunito:wght@800&display=swap" rel="stylesheet" />
  <style>
    @page { size: letter portrait; margin: 0.35in; }
    html, body { margin: 0; background: ${COLORS.cream}; color: ${COLORS.ink}; }
    .no-print { margin: 0 0 12px; }
    .btn { font-family: Nunito, system-ui, sans-serif; font-weight: 800; background: ${COLORS.lemonade}; color: ${COLORS.ink}; border: 0; border-radius: 14px; padding: 12px 18px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { background: ${field}; border: 4px solid ${COLORS.ink}; border-radius: 22px; min-height: 220px; padding: 18px; box-sizing: border-box; }
    .ck { font-family: Nunito, system-ui, sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; margin: 0; }
    h2 { font-family: Fredoka, system-ui, sans-serif; font-size: 36px; line-height: 0.95; margin: 10px 0 0; }
    .cp { font-family: Fredoka, system-ui, sans-serif; font-size: 42px; margin: 16px 0 0; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print"><button class="btn" onclick="window.print()">Print this sheet</button></div>
  <div class="grid">${cards}</div>
</body>
</html>`;
}

export const SHEET_COPY: Record<SheetKind, { title: string; line: string }> = {
  poster: { title: "Poster", line: "Draw it. Print it at home. Tape it to the table." },
  menu: { title: "Menu", line: "What you sell. Prices the kid set." },
  cards: { title: "Price cards", line: "One card per cup. Crooked is fine." },
  sign: { title: "Open sign", line: "Fold on the line. Stand it up." },
};

function openSignHtml() {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${FIRST_APP} · open sign</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Nunito:wght@800&display=swap" rel="stylesheet" />
  <style>
    @page { size: 8.5in 11in; margin: 0; }
    html, body { margin: 0; width: 8.5in; height: 11in; background: ${COLORS.lemonade}; color: ${COLORS.ink}; }
    body { font-family: Nunito, system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { position: absolute; z-index: 3; left: 0.4in; top: 0.3in; }
    .btn { font-family: Nunito, system-ui, sans-serif; font-weight: 800; font-size: 16px; background: ${COLORS.cream}; color: ${COLORS.ink}; border: 0; border-radius: 14px; padding: 12px 18px; }
    .sheet { position: relative; width: 8.5in; height: 11in; overflow: hidden; }
    .half { position: absolute; left: 0; width: 8.5in; height: 5.5in; }
    .top { top: 0; }
    .bottom { top: 5.5in; background: ${COLORS.ink}; }
    .face { box-sizing: border-box; width: 8.5in; height: 5.5in; padding: 0.42in 0.6in 0.55in; display: flex; flex-direction: column; justify-content: space-between; }
    .top .face { transform: rotate(180deg); transform-origin: center; background: ${COLORS.lemonade}; color: ${COLORS.ink}; }
    .bottom .face { background: ${COLORS.ink}; color: ${COLORS.cream}; }
    h1 { font-family: Fredoka, system-ui, sans-serif; font-weight: 700; font-size: 78px; line-height: 0.9; letter-spacing: -0.03em; margin: 0; }
    h1 span { display: block; }
    .mark { height: 2.05in; width: auto; align-self: flex-end; }
    .fold { position: absolute; z-index: 2; left: 0.6in; right: 0.6in; top: 5.5in; transform: translateY(-50%); display: flex; align-items: center; gap: 10px; }
    .ticks { position: relative; flex: 1; height: 2px; background-image: repeating-linear-gradient(90deg, ${COLORS.ink} 0 7px, transparent 7px 13px); }
    .ticks:after { content: ""; position: absolute; left: 0; right: 0; top: 3px; height: 2px; background-image: repeating-linear-gradient(90deg, ${COLORS.cream} 0 7px, transparent 7px 13px); }
    .fold p { margin: 0; background: ${COLORS.cream}; color: ${COLORS.ink}; font-weight: 800; font-size: 15px; line-height: 1.2; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print"><button class="btn" onclick="window.print()">Print this sheet</button></div>
  <div class="sheet">
    <section class="half top" aria-label="We’re open">
      <div class="face">
        <h1><span>We’re</span><span>open</span></h1>
        ${waveSvg()}
      </div>
    </section>
    <div class="fold">
      <span class="ticks"></span>
      <p>Fold on the line. Stand it up.</p>
      <span class="ticks"></span>
    </div>
    <section class="half bottom" aria-label="Back soon">
      <div class="face">
        <h1><span>Back</span><span>soon</span></h1>
        ${napSvg()}
      </div>
    </section>
  </div>
</body>
</html>`;
}

function waveSvg() {
  return `<svg class="mark" viewBox="0 0 168 124" role="img" aria-label="Rascal waving">
    <path d="M78 98 C 58 90 36 72 30 52" fill="none" stroke="#1C1A19" stroke-width="16" stroke-linecap="round" />
    <path d="M78 98 C 58 90 36 72 30 52" fill="none" stroke="#B7AFA6" stroke-width="10" stroke-linecap="round" />
    <g transform="translate(48 2)">${faceSvg("wave")}</g>
    <ellipse cx="16" cy="30" rx="5" ry="8" fill="#FFF6E8" stroke="#1C1A19" stroke-width="3" transform="rotate(-32 16 30)" />
    <ellipse cx="27" cy="20" rx="5" ry="8.5" fill="#FFF6E8" stroke="#1C1A19" stroke-width="3" />
    <ellipse cx="38" cy="27" rx="4.6" ry="7.2" fill="#FFF6E8" stroke="#1C1A19" stroke-width="3" transform="rotate(28 38 27)" />
    <ellipse cx="28" cy="42" rx="14" ry="13" fill="#B7AFA6" stroke="#1C1A19" stroke-width="4" />
    <ellipse cx="24" cy="39" rx="6.5" ry="5" fill="#FFF6E8" />
  </svg>`;
}

function napSvg() {
  return `<svg class="mark" viewBox="6 2 108 116" role="img" aria-label="Rascal napping">
    <ellipse cx="60" cy="66" rx="50" ry="52" fill="#FFF6E8" />
    ${faceSvg("nap")}
  </svg>`;
}

function faceSvg(pose: "wave" | "nap") {
  const eyes =
    pose === "nap"
      ? `<path d="M32 60 Q 44 50 55 60" fill="none" stroke="#FFF6E8" stroke-width="3.5" stroke-linecap="round" />
         <path d="M66 58 Q 77 48 87 58" fill="none" stroke="#FFF6E8" stroke-width="3.5" stroke-linecap="round" />`
      : `<ellipse cx="44" cy="58" rx="12" ry="11" fill="#FFF6E8" />
         <ellipse cx="76" cy="56" rx="10" ry="12" fill="#FFF6E8" />
         <circle cx="46" cy="59" r="5.5" fill="#1C1A19" />
         <circle cx="76" cy="57" r="4.6" fill="#1C1A19" />
         <circle cx="43" cy="56" r="1.8" fill="#FFF6E8" />
         <circle cx="73.5" cy="54.5" r="1.5" fill="#FFF6E8" />
         <path d="M32 46 Q 44 40 52 46" fill="none" stroke="#1C1A19" stroke-width="3" stroke-linecap="round" />`;
  const mouth =
    pose === "nap"
      ? `<path d="M50 84 Q 61 87 72 83" fill="none" stroke="#1C1A19" stroke-width="3" stroke-linecap="round" />`
      : `<path d="M48 82 Q 62 90 74 80" fill="none" stroke="#1C1A19" stroke-width="3" stroke-linecap="round" />`;
  return `<g>
    <ellipse cx="34" cy="36" rx="15" ry="20" fill="#8E8680" stroke="#1C1A19" stroke-width="4" />
    <ellipse cx="34" cy="38" rx="7" ry="10" fill="#FFF6E8" />
    <ellipse cx="86" cy="34" rx="14" ry="17" fill="#8E8680" stroke="#1C1A19" stroke-width="4" />
    <ellipse cx="86" cy="36" rx="6.5" ry="8" fill="#FFF6E8" />
    <path d="M46 24 L 58 10 L 44 22 Z" fill="#8E8680" stroke="#1C1A19" stroke-width="3" stroke-linejoin="round" />
    <ellipse cx="58" cy="66" rx="36" ry="33" fill="#B7AFA6" stroke="#1C1A19" stroke-width="4" />
    <ellipse cx="60" cy="78" rx="20" ry="16" fill="#FFF6E8" />
    <g transform="rotate(-16 60 58)">
      <path d="M22 56 Q 60 40 98 54 Q 98 74 60 72 Q 22 74 22 56 Z" fill="#1C1A19" />
      ${eyes}
    </g>
    <ellipse cx="61" cy="74" rx="5.5" ry="4" fill="#1C1A19" />
    ${mouth}
  </g>`;
}
