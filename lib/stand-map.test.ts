import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const pdf = readFileSync("public/print/stand-map-letter.pdf");
const sheet = pdf.toString("latin1");
const kit = readFileSync("app/kits/[id]/page.tsx", "utf8");
const button = readFileSync("components/print-stand-map.tsx", "utf8");

test("the stand map is one letter sheet", () => {
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal(sheet.split("/MediaBox [ 0 0 612 792 ]").length - 1, 1);
  for (const line of [
    "Saturday",
    "stand map",
    "Our stand",
    "near the big tree",
    "by the stop sign",
    "Landmarks only.",
    "Lemonade Stand by Wild Kit",
  ]) {
    assert.equal(sheet.includes(line), true, line);
  }
  assert.equal(sheet.toLowerCase().includes("address"), false);
  assert.equal(sheet.toLowerCase().includes("for kids"), false);
});

test("the stand map button follows the arrow signs, and the poster line stays first", () => {
  const poster = kit.indexOf("{HOME_PRINT}");
  const arrows = kit.indexOf("<PrintArrowSigns />");
  const map = kit.indexOf("<PrintStandMap />");
  assert.ok(poster > 0 && arrows > poster && map > arrows);
  assert.equal(button.includes('href="/print/stand-map-letter.pdf"'), true);
  assert.equal(button.includes("Print the stand map"), true);
});
