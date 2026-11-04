import assert from "node:assert/strict";
import test from "node:test";

import { NEXT_BEATS, STEPS } from "./brand.ts";
import { HUES } from "./hues.ts";

const INK = "#1C1A19";

test("leaf and raspberry fields use ink, not cream", () => {
  assert.equal(HUES.leaf.ink, INK);
  assert.equal(HUES.raspberry.ink, INK);
  for (const step of STEPS) {
    if (step.bg === "bg-leaf" || step.bg === "bg-raspberry") {
      assert.equal(step.ink, "text-ink");
    }
  }
  for (const beat of NEXT_BEATS) {
    if (beat.bg === "bg-leaf" || beat.bg === "bg-raspberry") {
      assert.equal(beat.ink, "text-ink");
    }
  }
});
