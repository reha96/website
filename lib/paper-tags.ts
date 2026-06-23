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

/** Map each tag to the paper ID it belongs to (for linking to /academic#paperN). */
export const PAPER_TAG_TO_ID: Record<string, string> = {};
for (const [paperId, tags] of Object.entries(PAPER_TAGS)) {
  for (const tag of tags) {
    PAPER_TAG_TO_ID[tag.toLowerCase()] = paperId;
  }
}

/** All unique paper tags as a flat array (for iterating). */
export function getAllPaperTags(): string[] {
  return Object.keys(PAPER_TAG_TO_ID).sort();
}

/** Check if a tag is a paper tag (case-insensitive). */
export function isPaperTag(tag: string): boolean {
  return tag.toLowerCase() in PAPER_TAG_TO_ID;
}

/** Get the paper anchor ID for a paper tag (case-insensitive). */
export function getPaperAnchor(tag: string): string | null {
  return PAPER_TAG_TO_ID[tag.toLowerCase()] ?? null;
}
