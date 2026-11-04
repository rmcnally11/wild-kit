import assert from "node:assert/strict";
import test from "node:test";

import { JOB_TWO_PUBLIC } from "./brand.ts";
import { publicKitSlugs } from "./kit-routes.ts";
import { SITE_REDIRECTS } from "./redirects.ts";

const PUBLIC_SLUGS = new Set(publicKitSlugs(JOB_TWO_PUBLIC));
const OTHER_PAGES = new Set(["/apps", "/parents"]);

test("every redirect lands on a page that exists", () => {
  for (const rule of SITE_REDIRECTS) {
    const kit = /^\/kits\/([a-z0-9-]+)$/.exec(rule.destination);
    if (kit) {
      assert.ok(
        PUBLIC_SLUGS.has(kit[1]),
        `${rule.source} redirects to ${rule.destination}, which is not public`,
      );
      continue;
    }
    assert.ok(OTHER_PAGES.has(rule.destination), `${rule.source} → ${rule.destination}`);
  }
});

test("fort, wash, and camp do not redirect onto missing kit briefs", () => {
  for (const source of ["/fort", "/wash", "/camp", "/kits/camp"]) {
    const rule = SITE_REDIRECTS.find((item) => item.source === source);
    assert.ok(rule, source);
    assert.equal(rule.destination, "/kits/lemonade");
    assert.equal(rule.permanent, false);
  }
});
