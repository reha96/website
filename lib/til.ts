import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface TilEntry {
  slug: string;
  title: string;
  date: string;
  topic: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export interface TilTopic {
  slug: string;
  name: string;
  count: number;
}

const TIL_DIR = path.join(process.cwd(), "content", "til");

interface TilFrontmatter {
  title: string;
  date: string;
  tags: string[];
  topic?: string;
}

function extractExcerpt(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 30 && !trimmed.startsWith("#") && !trimmed.startsWith("```")) {
      return trimmed.slice(0, 200) + (trimmed.length > 200 ? "…" : "");
    }
  }
  return "";
}

/**
 * Read a single TIL .md file from a topic folder.
 */
function readTilFile(filePath: string, topic: string): TilEntry | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<TilFrontmatter>;

    if (!fm.title || !fm.date) {
      console.warn(`Skipping ${filePath}: missing required frontmatter (title, date)`);
      return null;
    }

    const slug = path.basename(filePath, ".md");
    const excerpt = extractExcerpt(content);

    return {
      slug,
      title: fm.title,
      date: fm.date,
      topic: fm.topic || topic,
      tags: fm.tags || [],
      excerpt,
      content,
    };
  } catch (err) {
    console.warn(`Error reading ${filePath}:`, err);
    return null;
  }
}

/**
 * Get all TIL entries grouped by topic.
 */
export function getAllTils(): TilEntry[] {
  if (!fs.existsSync(TIL_DIR)) return [];

  const allTils: TilEntry[] = [];
  const topicDirs = fs.readdirSync(TIL_DIR).filter((f) => {
    return fs.statSync(path.join(TIL_DIR, f)).isDirectory();
  });

  for (const topic of topicDirs) {
    const topicPath = path.join(TIL_DIR, topic);
    const files = fs.readdirSync(topicPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const til = readTilFile(path.join(topicPath, file), topic);
      if (til) allTils.push(til);
    }
  }

  // Sort by date, newest first
  allTils.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return allTils;
}

/**
 * Get all unique TIL topics with counts.
 */
export function getTilTopics(): TilTopic[] {
  const tils = getAllTils();
  const topicMap = new Map<string, number>();

  for (const til of tils) {
    topicMap.set(til.topic, (topicMap.get(til.topic) || 0) + 1);
  }

  return Array.from(topicMap.entries())
    .map(([slug, count]) => ({ slug, name: slug, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get TILs filtered by topic.
 */
export function getTilsByTopic(topic: string): TilEntry[] {
  return getAllTils().filter((til) => til.topic === topic);
}

/**
 * Get a single TIL by topic and slug.
 */
export function getTil(topic: string, slug: string): TilEntry | null {
  const filePath = path.join(TIL_DIR, topic, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readTilFile(filePath, topic);
}
