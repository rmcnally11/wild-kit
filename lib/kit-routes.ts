/** Public Saturday-brief URLs. The shelf list in kits.ts is wider than this. */

export const LEMONADE_SLUG = "lemonade";

/** Job 2's public path. The kit id in the shelf data stays `bake`. */
export const BAKE_SALE_SLUG = "bake-sale";

export const BAKE_KIT_ID = "bake";

export function publicKitSlugs(jobTwoPublic: boolean): string[] {
  const slugs = [LEMONADE_SLUG];
  if (jobTwoPublic) slugs.push(BAKE_SALE_SLUG);
  return slugs;
}

/** Shelf id for a slug that may render. Anything else must 404. */
export function kitIdForPublicSlug(slug: string, jobTwoPublic: boolean): string | undefined {
  if (slug === LEMONADE_SLUG) return LEMONADE_SLUG;
  if (slug === BAKE_SALE_SLUG && jobTwoPublic) return BAKE_KIT_ID;
  return undefined;
}
