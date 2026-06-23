import { getAllBlogPostsMeta } from "@/lib/github";
import { getAllTils } from "@/lib/til";
import { PAPER_TAGS } from "@/lib/paper-tags";

/**
 * Get a unified list of all tags used across blog posts, TILs, and papers,
 * with counts for the /tags cloud.
 */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const tagMap = new Map<string, number>();

  // Blog posts (async — fetches from GitHub API at build time)
  const blogPosts = await getAllBlogPostsMeta();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  // TILs (sync — reads from filesystem)
  const tils = getAllTils();
  for (const til of tils) {
    for (const tag of til.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  // Papers (static — from lib/paper-tags.ts)
  for (const tags of Object.values(PAPER_TAGS)) {
    for (const tag of tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Get blog posts that have a specific tag.
 * This is async because it calls getAllBlogPostsMeta which fetches from GitHub.
 */
export async function getBlogPostsByTag(tag: string) {
  const allPosts = await getAllBlogPostsMeta();
  return allPosts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get TILs that have a specific tag.
 */
export function getTilsByTag(tag: string) {
  const tils = getAllTils();
  return tils.filter((t) =>
    t.tags.some((tg) => tg.toLowerCase() === tag.toLowerCase())
  );
}
