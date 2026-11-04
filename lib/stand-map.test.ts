import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { inflateSync } from "node:zlib";

const pdf = readFileSync("public/print/stand-map-letter.pdf");
const sheet = pdf.toString("latin1");
const kit = readFileSync("app/kits/[id]/page.tsx", "utf8");
const button = readFileSync("components/print-stand-map.tsx", "utf8");

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

/** Text on the sheet. Skips the Rascal image stream. */
function sheetText() {
  const marks = sheet.matchAll(/\/Length (\d+)\s*>>\s*stream\r?\n/g);
  let text = "";
  for (const mark of marks) {
    const length = Number(mark[1]);
    const start = mark.index ?? 0;
    const head = sheet.slice(Math.max(0, start - 200), start);
    if (head.includes("/Subtype /Image")) continue;
    const encoded = sheet.slice(mark.index! + mark[0].length, mark.index! + mark[0].length + length);
    const raw = encoded.replace(/~>\s*$/, "");
    text += inflateSync(ascii85Decode(raw)).toString("latin1");
  }
  return text;
}

test("the stand map is one letter sheet", () => {
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal(sheet.split("/MediaBox [ 0 0 612 792 ]").length - 1, 1);
  const text = sheetText();
  for (const line of [
    "Saturday",
    "stand map",
    "Our stand",
    "near the big tree",
    "by the stop sign",
    "Landmarks only.",
    "Lemonade Stand by Wild Kit",
  ]) {
    assert.equal(text.includes(line), true, line);
  }
  const lowered = text.toLowerCase();
  assert.equal(lowered.includes("address"), false);
  assert.equal(lowered.includes("for kids"), false);
});

test("the stand map button follows the arrow signs, and the poster line stays first", () => {
  const poster = kit.indexOf("{HOME_PRINT}");
  const arrows = kit.indexOf("<PrintArrowSigns />");
  const map = kit.indexOf("<PrintStandMap />");
  assert.ok(poster > 0 && arrows > poster && map > arrows);
  assert.equal(button.includes('href="/print/stand-map-letter.pdf"'), true);
  assert.equal(button.includes("Print the stand map"), true);
});
