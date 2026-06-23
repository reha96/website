/**
 * Static paper tag definitions.
 * These tags are merged into the global tag system (lib/tags.ts)
 * so they appear in the /tags cloud and are searchable.
 */

export const PAPER_TAGS: Record<string, string[]> = {
  paper1: ["Revealed Preference", "Heterogeneity"],
  paper2: ["Scarcity", "User Experience"],
  paper3: ["Intertemporal Choice", "User Experience"],
  paper4: ["Human Capital", "Contact Theory"],
  paper5: ["Social Capital", "Inequality"],
};

/** All unique paper tags as a flat array (for iterating). */
export function getAllPaperTags(): string[] {
  const tagSet = new Set<string>();
  for (const tags of Object.values(PAPER_TAGS)) {
    for (const tag of tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}
