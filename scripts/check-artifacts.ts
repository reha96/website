/* eslint-disable */
/**
 * Build-time check: validates the generated artifacts in out/.
 *
 *   - sitemap.xml: every <loc> is www-hosted and resolves to a real page;
 *     the URL set matches the built pages exactly (minus 404/search)
 *   - every real page carries a self-referencing www canonical
 *   - search-index.json: entries resolve and exactly cover published
 *     blog + TIL detail pages (drift detection — a published page missing
 *     from search, or a stale index entry, fails the build)
 *   - tag pages: out/tags/*.html exactly matches the union of tags from
 *     blog config, local posts, TILs, and papers
 *   - robots.txt present; no stray .txt payloads besides it
 *
 * Runs during postbuild via: npm run check:artifacts
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BLOG_POSTS_CONFIG } from "../lib/blog-config";
import { PAPER_TAGS } from "../lib/paper-tags";

const OUT_DIR = path.join(process.cwd(), "out");
const BASE_URL = "https://www.rehatuncer.com";
const SKIP_DIRS = new Set(["_next", "pagefind"]);

const failures: string[] = [];

function fail(msg: string) {
  failures.push(msg);
}

function collectFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        walk(full);
      } else {
        files.push(full);
      }
    }
  };
  walk(dir);
  return files;
}

function encodeSegment(seg: string): string {
  try {
    return encodeURIComponent(decodeURIComponent(seg));
  } catch {
    return encodeURIComponent(seg);
  }
}

function fileToUrl(filePath: string): string {
  let relative = path.relative(OUT_DIR, filePath);
  if (relative === "index.html") return "/";
  if (relative.endsWith(".html")) relative = relative.slice(0, -5);
  const segments = relative.split("/").map(encodeSegment);
  return "/" + segments.join("/");
}

const allFiles = collectFiles(OUT_DIR);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const pageUrls = new Set(htmlFiles.map(fileToUrl));

function rel(p: string): string {
  return path.relative(OUT_DIR, p);
}

// ── 1. Sitemap ──────────────────────────────────────────────
if (!fs.existsSync(path.join(OUT_DIR, "sitemap.xml"))) {
  fail("out/sitemap.xml is missing");
} else {
  const xml = fs.readFileSync(path.join(OUT_DIR, "sitemap.xml"), "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sitemapUrls = new Set<string>();
  for (const loc of locs) {
    if (!loc.startsWith(BASE_URL)) {
      fail(`sitemap <loc> ${loc} is not on ${BASE_URL}`);
      continue;
    }
    const url = loc.slice(BASE_URL.length) || "/";
    if (!pageUrls.has(url)) fail(`sitemap <loc> ${loc} resolves to no built page`);
    sitemapUrls.add(url);
  }
  const expectedSitemap = new Set([...pageUrls].filter((u) => u !== "/404" && u !== "/search"));
  const missingFromSitemap = [...expectedSitemap].filter((u) => !sitemapUrls.has(u));
  const extraInSitemap = [...sitemapUrls].filter((u) => !expectedSitemap.has(u));
  if (missingFromSitemap.length > 0)
    fail(`built pages missing from sitemap: ${missingFromSitemap.join(", ")}`);
  if (extraInSitemap.length > 0) fail(`sitemap URLs with no built page: ${extraInSitemap.join(", ")}`);
}

// ── 2. Canonicals ───────────────────────────────────────────
const stripSlash = (s: string) => s.replace(/\/+$/, "");
for (const file of htmlFiles) {
  const url = fileToUrl(file);
  if (url === "/404" || url === "/search") continue;
  const html = fs.readFileSync(file, "utf-8");
  // notFound() shells render the bare site title with no canonical — skip
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (titleMatch && titleMatch[1].trim() === "Reha Tuncer") continue;
  const linkRe = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  const linkMatch = html.match(linkRe);
  if (!linkMatch) {
    fail(`${rel(file)}: no canonical <link> tag`);
    continue;
  }
  const hrefMatch = linkMatch[0].match(/href=["']([^"']+)["']/i);
  const href = hrefMatch ? hrefMatch[1] : "";
  const expected = BASE_URL + url;
  if (stripSlash(href) !== stripSlash(expected)) {
    fail(`${rel(file)}: canonical "${href}" !== "${expected}"`);
  }
}

// ── 3. Search index ─────────────────────────────────────────
if (!fs.existsSync(path.join(OUT_DIR, "search-index.json"))) {
  fail("out/search-index.json is missing");
} else {
  let index: { url: string }[];
  try {
    index = JSON.parse(fs.readFileSync(path.join(OUT_DIR, "search-index.json"), "utf-8"));
  } catch (e) {
    fail(`search-index.json is not valid JSON: ${(e as Error).message}`);
    index = [];
  }
  const indexedUrls = new Set(index.map((e) => e.url));
  for (const url of indexedUrls) {
    if (!pageUrls.has(url)) fail(`search index entry ${url} resolves to no built page`);
  }
  const blogDetailUrls = [...pageUrls].filter((u) => u.startsWith("/blog/"));
  const tilDetailUrls = [...pageUrls].filter((u) => {
    const parts = u.split("/").filter(Boolean);
    return parts[0] === "til" && parts.length >= 3;
  });
  const expectedDetailUrls = new Set([...blogDetailUrls, ...tilDetailUrls]);
  const missingFromIndex = [...expectedDetailUrls].filter((u) => !indexedUrls.has(u));
  const extraInIndex = [...indexedUrls].filter((u) => !expectedDetailUrls.has(u));
  if (missingFromIndex.length > 0)
    fail(`published pages missing from search index: ${missingFromIndex.join(", ")}`);
  if (extraInIndex.length > 0) fail(`search index entries with no published page: ${extraInIndex.join(", ")}`);
}

// ── 4. Tag pages ────────────────────────────────────────────
const tagsDir = path.join(OUT_DIR, "tags");
const expectedTags = new Set<string>();
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const TIL_DIR = path.join(process.cwd(), "content", "til");

if (fs.existsSync(CONTENT_DIR)) {
  for (const file of fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
    try {
      const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8"));
      for (const tag of (data.tags as string[] | undefined) ?? []) expectedTags.add(tag.toLowerCase());
    } catch {
      /* unreadable post — link check will surface it */
    }
  }
}
for (const tags of Object.values(BLOG_POSTS_CONFIG)) {
  for (const tag of tags.tags) expectedTags.add(tag.toLowerCase());
}
if (fs.existsSync(TIL_DIR)) {
  for (const topic of fs.readdirSync(TIL_DIR).filter((f) => fs.statSync(path.join(TIL_DIR, f)).isDirectory())) {
    for (const file of fs.readdirSync(path.join(TIL_DIR, topic)).filter((f) => f.endsWith(".md"))) {
      try {
        const { data } = matter(fs.readFileSync(path.join(TIL_DIR, topic, file), "utf-8"));
        for (const tag of (data.tags as string[] | undefined) ?? []) expectedTags.add(tag.toLowerCase());
      } catch {
        /* skip */
      }
    }
  }
}
for (const tags of Object.values(PAPER_TAGS)) {
  for (const tag of tags) expectedTags.add(tag.toLowerCase());
}

const expectedTagUrls = new Set([...expectedTags].map((t) => "/tags/" + encodeURIComponent(t)));
const actualTagUrls = new Set(
  fs.existsSync(tagsDir) ? collectFiles(tagsDir).filter((f) => f.endsWith(".html")).map(fileToUrl) : []
);
const missingTagPages = [...expectedTagUrls].filter((u) => !actualTagUrls.has(u));
const strayTagPages = [...actualTagUrls].filter((u) => !expectedTagUrls.has(u));
if (missingTagPages.length > 0) fail(`tags with no generated page: ${missingTagPages.join(", ")}`);
if (strayTagPages.length > 0) fail(`tag pages with no source tag: ${strayTagPages.join(", ")}`);

// ── 5. robots.txt and .txt payloads ─────────────────────────
if (!fs.existsSync(path.join(OUT_DIR, "robots.txt"))) {
  fail("out/robots.txt is missing");
}
const strayTxt = allFiles
  .filter((f) => f.endsWith(".txt") && path.basename(f) !== "robots.txt")
  .map(rel);
if (strayTxt.length > 0) fail(`RSC .txt payloads not deleted: ${strayTxt.join(", ")}`);

if (failures.length > 0) {
  console.error(`  Artifact check: FAILED (${failures.length})`);
  for (const f of failures) console.error(`    - ${f}`);
  process.exit(1);
}
console.log(
  `  Artifact check: OK (${pageUrls.size} pages, ${expectedTagUrls.size} tags, sitemap/search/robots consistent)`
);
