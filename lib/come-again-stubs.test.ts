import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { inflateSync } from "node:zlib";

const pdf = readFileSync("public/print/come-again-stubs-letter.pdf");
const sheet = pdf.toString("latin1");
const kit = readFileSync("app/kits/[id]/page.tsx", "utf8");
const button = readFileSync("components/print-come-again-stubs.tsx", "utf8");

function ascii85Decode(data: string) {
  const clean = data.replace(/\s+/g, "");
  const out: number[] = [];
  let i = 0;
  while (i < clean.length) {
    if (clean[i] === "z") {
      out.push(0, 0, 0, 0);
      i += 1;
      continue;
    }
    const chunk = clean.slice(i, i + 5);
    if (chunk.length < 2) break;
    let value = 0;
    for (let j = 0; j < 5; j += 1) {
      const code = j < chunk.length ? chunk.charCodeAt(j) - 33 : 84;
      value = value * 85 + code;
    }
    const bytes = [
      Math.floor(value / 16777216) % 256,
      Math.floor(value / 65536) % 256,
      Math.floor(value / 256) % 256,
      value % 256,
    ];
    out.push(...bytes.slice(0, chunk.length === 5 ? 4 : chunk.length - 1));
    i += chunk.length;
  }
  return Buffer.from(out);
}

/** Words and drawing on the sheet. Skips the Rascal image and the Flate-only font maps. */
function sheetText() {
  const marks = sheet.matchAll(/\/Length (\d+)\s*>>\s*stream\r?\n/g);
  let text = "";
  for (const mark of marks) {
    const length = Number(mark[1]);
    const start = mark.index ?? 0;
    const head = sheet.slice(Math.max(0, start - 200), start);
    if (head.includes("/Subtype /Image")) continue;
    // ToUnicode maps match this walker and are Flate only. ASCII85-decoding them throws.
    if (!head.includes("ASCII85Decode")) continue;
    const encoded = sheet.slice(mark.index! + mark[0].length, mark.index! + mark[0].length + length);
    const raw = encoded.replace(/~>\s*$/, "");
    text += inflateSync(ascii85Decode(raw)).toString("latin1");
  }
  return text;
}

test("the come-again stubs are one letter sheet", () => {
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal(sheet.split("/MediaBox [ 0 0 612 792 ]").length - 1, 1);
  const text = sheetText();
  for (const line of [
    "Come-Again Stubs",
    "by Wild Kit",
    "Cut on the dashed lines and hand one stub with each cup.",
    "Thanks for stopping!",
    "Come again",
    "Next stand:",
    "Your next cup's on us.",
    "Lemonade Stand by Wild Kit",
  ]) {
    assert.equal(text.includes(line), true, line);
  }
  assert.equal(text.split("Thanks for stopping!").length - 1, 8);
  assert.equal(text.split("Your next cup's on us.").length - 1, 2);
  // Raspberry banner and stub edges. Eight dashed cut lines.
  assert.equal(text.includes(".768627 .231373 .384314"), true);
  assert.equal(text.split("[3.5 2.5] 0 d").length - 1, 8);
  const lowered = text.toLowerCase();
  for (const banned of ["address", "for kids", "users", "platform", "empower", "experience", "stem", "curriculum"]) {
    assert.equal(lowered.includes(banned), false, banned);
  }
});

test("the come-again stubs button follows the cup tally, and the poster line stays first", () => {
  const poster = kit.indexOf("{HOME_PRINT}");
  const arrows = kit.indexOf("<PrintArrowSigns />");
  const map = kit.indexOf("<PrintStandMap />");
  const tally = kit.indexOf("<PrintCupTally />");
  const stubs = kit.indexOf("<PrintComeAgainStubs />");
  assert.ok(poster > 0 && arrows > poster && map > arrows && tally > map && stubs > tally);
  assert.equal(button.includes('href="/print/come-again-stubs-letter.pdf"'), true);
  assert.equal(button.includes('target="_blank"'), true);
  assert.equal(button.includes("Print the come-again stubs"), true);
});
