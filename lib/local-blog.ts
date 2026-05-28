import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostWithContent } from "./blog-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const AUTHOR = "Reha Tuncer";

/**
 * Extract the first meaningful paragraph (after headings) as excerpt.
 * Mirrors the logic in github.ts for consistency.
 */
function extractExcerpt(content: string): string {
  const lines = content.split("\n");
  let foundHeading = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#/.test(trimmed)) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && trimmed.length > 30) {
      return trimmed.slice(0, 200) + (trimmed.length > 200 ? "…" : "");
    }
  }
  return "";
}

/**
 * Convert an ISO date string to URL-friendly components.
 */
function dateToParts(isoDate: string): { year: string; month: string; day: string } {
  const d = new Date(isoDate);
  return {
    year: String(d.getUTCFullYear()),
    month: String(d.getUTCMonth() + 1).padStart(2, "0"),
    day: String(d.getUTCDate()).padStart(2, "0"),
  };
}

interface LocalPostFrontmatter {
  title: string;
  date: string; // ISO date "2024-03-15"
  slug: string;
  tags: string[];
  topic: string;
  excerpt?: string;
  author?: string;
}

/**
 * Read and parse a single local blog post .md file.
 */
function readLocalPost(filePath: string): BlogPostWithContent | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<LocalPostFrontmatter>;

    if (!fm.title || !fm.date || !fm.slug || !fm.tags || !fm.topic) {
      console.warn(`Skipping ${filePath}: missing required frontmatter (title, date, slug, tags, topic)`);
      return null;
    }

    const { year, month, day } = dateToParts(fm.date);
    const excerpt = fm.excerpt || extractExcerpt(content);

    return {
      slug: fm.slug,
      title: fm.title,
      date: fm.date,
      year,
      month,
      day,
      repo: "", // local posts have no repo
      path: filePath,
      tags: fm.tags,
      topic: fm.topic,
      author: fm.author || AUTHOR,
      excerpt,
      content,
    };
  } catch (err) {
    console.warn(`Error reading ${filePath}:`, err);
    return null;
  }
}

/**
 * Get all local blog posts with full content.
 * Reads all .md files from content/blog/ and parses their frontmatter.
 */
export function getLocalBlogPosts(): BlogPostWithContent[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPostWithContent[] = [];

  for (const file of files) {
    const post = readLocalPost(path.join(CONTENT_DIR, file));
    if (post) posts.push(post);
  }

  // Sort by date, newest first (consistent with GitHub posts)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

/**
 * Get metadata only for all local blog posts — for the index page.
 */
export function getLocalBlogPostsMeta(): BlogPost[] {
  return getLocalBlogPosts().map(({ content: _content, ...meta }) => meta);
}

/**
 * Get a single local blog post by slug (with full content).
 */
export function getLocalBlogPost(slug: string): BlogPostWithContent | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const post = readLocalPost(path.join(CONTENT_DIR, file));
    if (post && post.slug === slug) return post;
  }
  return null;
}
