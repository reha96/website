import { BLOG_POSTS_CONFIG, BlogPostMeta } from "./blog-config";
import { BlogPost, BlogPostWithContent } from "./blog-types";

const GITHUB_RAW = "https://raw.githubusercontent.com/reha96";
const GITHUB_API = "https://api.github.com";

const AUTHOR = "Reha Tuncer";

/**
 * Fetch a README.md file from a GitHub repo using raw.githubusercontent.com.
 * No rate limits on raw content.
 */
async function fetchReadme(repo: string, path: string): Promise<string | null> {
  const dirPath = path ? `${path}/` : "";
  const url = `${GITHUB_RAW}/${repo}/main/${dirPath}README.md`;

  try {
    const res = await fetch(url, { next: { revalidate: false } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Extract the first `# Title` from markdown content.
 */
function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match && match[1]) {
    // Remove any trailing {#custom-id} from heading
    return match[1].replace(/\s*\{#[^}]*\}\s*$/, "").trim();
  }
  return fallback;
}

/**
 * Extract the first meaningful paragraph (after headings) as excerpt.
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
 * Get the creation date for a repo or a specific file path.
 * Uses GitHub API — 60 req/hr unauthenticated, fine for build-time use.
 */
async function fetchDate(repo: string, path: string): Promise<string> {
  try {
    if (path) {
      // Get the first commit date for the specific file path
      const url = `${GITHUB_API}/repos/reha96/${repo}/commits?path=${encodeURIComponent(path + "/README.md")}&per_page=1`;
      const res = await fetch(url, { next: { revalidate: false } });
      if (!res.ok) throw new Error("Failed to fetch commits");
      const commits = await res.json();
      if (Array.isArray(commits) && commits.length > 0) {
        return commits[0].commit?.committer?.date || commits[0].commit?.author?.date || "";
      }
    }
    // Fallback: repo creation date
    const url = `${GITHUB_API}/repos/reha96/${repo}`;
    const res = await fetch(url, { next: { revalidate: false } });
    if (!res.ok) throw new Error("Failed to fetch repo");
    const data = await res.json();
    return data.created_at || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
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

/**
 * Format a display-friendly title from a slug and config.
 */
function makeDisplayTitle(meta: BlogPostMeta): string {
  // Use the path components to build a readable title
  if (!meta.path) {
    // Root README — use the repo name
    return meta.repo.replace(/_/g, " ").replace(/-/g, " ");
  }
  return meta.path
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\//g, " — ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Build a mapping from GitHub path → blog URL so internal cross-reference
 * links (e.g. `[Linear Algebra](math/linear_algebra/)`) can be rewritten
 * to point to the correct blog post.
 */
function buildPathMapping(
  posts: { path: string; slug: string; year: string; month: string; day: string; repo: string }[]
): Map<string, string> {
  const map = new Map<string, string>();
  for (const post of posts) {
    // Key: "repo/path" — the GitHub path within the repo
    const key = post.path || "";
    // Also add with trailing slash variants that appear in markdown links
    map.set(key, `/blog/${post.year}/${post.month}/${post.day}/${post.slug}`);
    if (key) {
      map.set(key + "/", `/blog/${post.year}/${post.month}/${post.day}/${post.slug}`);
    }
  }
  return map;
}

/**
 * Resolve a relative markdown link target against the current README path.
 * E.g. currentPath="math", linkTarget="linear_algebra/" → "math/linear_algebra"
 */
function resolveGitHubPath(currentPath: string, linkTarget: string): string {
  // Strip trailing slash for clean resolution
  const target = linkTarget.replace(/\/+$/, "");
  const base = currentPath ? currentPath.split("/") : [];

  if (target.startsWith("./")) {
    // Relative to current dir
    return [...base, target.slice(2)].join("/");
  }
  if (target.startsWith("../")) {
    // Parent dir navigation
    const parts = target.split("/");
    let up = 0;
    while (parts[up] === "..") up++;
    const remaining = parts.slice(up);
    const resolved = [...base.slice(0, Math.max(0, base.length - up)), ...remaining];
    return resolved.join("/");
  }

  // Absolute within repo (starts without . or ..) — resolve from repo root
  if (!target.includes("/") && base.length > 0) {
    // Single name like "linear_algebra" → resolve relative to current dir
    return [...base, target].join("/");
  }
  // Multi-segment like "math/linear_algebra" → absolute from repo root
  return target;
}

/**
 * Rewrite internal cross-reference links in markdown content.
 * Converts links like `[text](math/linear_algebra/)` to `/blog/2025/05/17/math-linear-algebra`.
 */
function rewriteInternalLinks(
  content: string,
  currentPath: string,
  pathToUrl: Map<string, string>
): string {
  // Match markdown links: [text](url)
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // Skip external URLs, anchors, and non-relative links
    if (/^(https?:|#|mailto:)/.test(url)) return match;

    // Resolve the relative path
    const resolved = resolveGitHubPath(currentPath, url);

    // Look up the resolved path in our mapping
    const blogUrl = pathToUrl.get(resolved);

    if (blogUrl) {
      return `[${text}](${blogUrl})`;
    }

    // No match found — keep original link
    return match;
  });
}

/**
 * Fetch all blog posts with full content and metadata.
 * Called at build time for SSG.
 */
async function getAllBlogPosts(): Promise<BlogPostWithContent[]> {
  const entries = Object.entries(BLOG_POSTS_CONFIG);
  const posts: BlogPostWithContent[] = [];

  // Fetch all in parallel for speed
  const results = await Promise.all(
    entries.map(async ([slug, meta]) => {
      const content = await fetchReadme(meta.repo, meta.path);
      if (!content) return null;

      const titleFromMd = extractTitle(content, makeDisplayTitle(meta));
      const title = titleFromMd;
      const excerpt = extractExcerpt(content);
      const isoDate = await fetchDate(meta.repo, meta.path);
      const { year, month, day } = dateToParts(isoDate);

      const post: BlogPostWithContent = {
        slug,
        title,
        date: isoDate,
        year,
        month,
        day,
        repo: meta.repo,
        path: meta.path,
        tags: meta.tags,
        topic: meta.topic,
        author: AUTHOR,
        excerpt,
        content,
      };
      return post;
    })
  );

  for (const result of results) {
    if (result) posts.push(result);
  }

  // Rewrite internal cross-reference links between blog posts
  const pathToUrl = buildPathMapping(posts);
  for (const post of posts) {
    post.content = rewriteInternalLinks(post.content, post.path, pathToUrl);
  }

  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single blog post by slug (with full content).
 */
export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
  const meta = BLOG_POSTS_CONFIG[slug];
  if (!meta) return null;

  const content = await fetchReadme(meta.repo, meta.path);
  if (!content) return null;

  const titleFromMd = extractTitle(content, makeDisplayTitle(meta));
  const excerpt = extractExcerpt(content);
  const isoDate = await fetchDate(meta.repo, meta.path);
  const { year, month, day } = dateToParts(isoDate);

  // Build path mapping and rewrite internal cross-reference links
  const allPostsMeta = await getAllBlogPostsMeta();
  const pathToUrl = buildPathMapping(allPostsMeta);
  const rewrittenContent = rewriteInternalLinks(content, meta.path, pathToUrl);

  return {
    slug,
    title: titleFromMd,
    date: isoDate,
    year,
    month,
    day,
    repo: meta.repo,
    path: meta.path,
    tags: meta.tags,
    topic: meta.topic,
    author: AUTHOR,
    excerpt,
    content: rewrittenContent,
  };
}

/**
 * Get all blog posts metadata only (no content) — for the index page.
 */
export async function getAllBlogPostsMeta(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.map(({ content, ...meta }) => meta);
}

/**
 * Get all unique tags and topics for filter UI.
 */
export async function getFilters(): Promise<{ tags: string[]; topics: string[] }> {
  const posts = await getAllBlogPostsMeta();
  const tagSet = new Set<string>();
  const topicSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) tagSet.add(tag);
    topicSet.add(post.topic);
  }
  return {
    tags: Array.from(tagSet).sort(),
    topics: Array.from(topicSet).sort(),
  };
}
