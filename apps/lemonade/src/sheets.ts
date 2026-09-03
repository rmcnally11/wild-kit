import {
  COLORS,
  FIRST_APP,
  LEMON_SUPPLIES,
  SITE,
  fieldColor,
} from "@/brand";
import { money, type Stand } from "@/store";

export type SheetKind = "poster" | "menu" | "cards";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(body: string, paper: string, ink = COLORS.ink) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${FIRST_APP}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito:wght@600;800&display=swap" rel="stylesheet" />
  <style>
    @page { size: letter portrait; margin: 0; }
    html, body { margin: 0; background: ${paper}; color: ${ink}; }
    body { font-family: Nunito, system-ui, sans-serif; }
    h1, h2 { font-family: Fredoka, system-ui, sans-serif; font-weight: 700; margin: 0; }
    .sheet { min-height: 100vh; box-sizing: border-box; padding: 0.55in; }
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
    const rows = items
      .map((item) => `<div class="row"><span>${esc(item.name)}</span><span>${money(item.price)}</span></div>`)
      .join("");
    const people = crew.length
      ? `<p class="line">${crew.map((job) => `${esc(job.who)} · ${esc(job.role)}`).join(" · ")}</p>`
      : "";
    const recipe = stand.todaysRecipe
      ? `<p class="line">Today's pitcher: ${esc(stand.todaysRecipe)}</p>`
      : "";
    const mark =
      stand.template === "berry"
        ? `<div class="mark ticket"><div class="pip"></div></div>`
        : stand.template === "sky"
          ? `<div class="mark banner"></div>`
          : `<div class="mark lemon"><div class="leaf"></div><div class="shine"></div></div>`;
    return wrap(
      `<div class="hero">
         <div>
           <p class="kicker">This Saturday</p>
           <h1 style="font-size: 64px; line-height: 0.95;">${name}</h1>
           <p class="line">${kid} invents it. You make it real.</p>
         </div>
         ${mark}
       </div>
       ${recipe}
       ${rows}
       ${people}
       <p class="foot">Wild Kit · ${SITE} · Ask for the whole sheet.</p>`,
      field,
    );
  }

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
  poster: { title: "Poster", line: "The name. The mark. Tape it to the table." },
  menu: { title: "Menu", line: "What you sell. Prices the kid set." },
  cards: { title: "Price cards", line: "One card per cup. Crooked is fine." },
};
