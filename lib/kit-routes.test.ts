import assert from "node:assert/strict";
import test from "node:test";

import { JOB_TWO_PUBLIC } from "./brand.ts";
import { BAKE_KIT_ID, BAKE_SALE_SLUG, kitIdForPublicSlug, publicKitSlugs } from "./kit-routes.ts";

test("JOB_TWO_PUBLIC stays false until a driveway photo exists", () => {
  assert.equal(JOB_TWO_PUBLIC, false);
});

test("the only public kit slug is lemonade while Job 2 is locked", () => {
  assert.deepEqual(publicKitSlugs(false), ["lemonade"]);
  assert.equal(kitIdForPublicSlug("lemonade", false), "lemonade");
  assert.equal(kitIdForPublicSlug(BAKE_SALE_SLUG, false), undefined);
  assert.equal(kitIdForPublicSlug(BAKE_KIT_ID, false), undefined);
  assert.equal(kitIdForPublicSlug("fort", false), undefined);
  assert.equal(kitIdForPublicSlug("wash", false), undefined);
  assert.equal(kitIdForPublicSlug("xyz", false), undefined);
});

test("bake-sale is the Job 2 slug, and only after the flag is on", () => {
  assert.deepEqual(publicKitSlugs(true), ["lemonade", BAKE_SALE_SLUG]);
  assert.equal(kitIdForPublicSlug(BAKE_SALE_SLUG, true), BAKE_KIT_ID);
  assert.equal(kitIdForPublicSlug(BAKE_KIT_ID, true), undefined);
  assert.equal(kitIdForPublicSlug("xyz", true), undefined);
});

test("the live flag matches the locked route list", () => {
  assert.deepEqual(publicKitSlugs(JOB_TWO_PUBLIC), ["lemonade"]);
  assert.equal(kitIdForPublicSlug(BAKE_SALE_SLUG, JOB_TWO_PUBLIC), undefined);
});
