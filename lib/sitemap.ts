/* eslint-disable */
/**
 * Build-time script: generates out/sitemap.xml by crawling all built .html files.
 * Runs during postbuild via: npx tsx lib/sitemap.ts
 *
 * Priority tiers:
 *   1.0 — / (landing)
 *   0.9 — /blog (index)
 *   0.8 — /blog/* (individual posts)
 *   0.7 — /academic
 *   0.6 — /tags, /til (index pages)
 *   0.5 — /tags/*, /til/* (detail pages)
 */
import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "out");
const BASE_URL = "https://rehatuncer.com";
const BUILD_DATE = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

interface SitemapEntry {
  url: string;
  lastmod: string;
  priority: number;
  changefreq: string;
}

/**
 * Extract a date from data-pagefind-meta in the built HTML.
 * Returns ISO date string (YYYY-MM-DD) or null if not found.
 */
function extractDateFromHtml(filePath: string): string | null {
  try {
    const html = fs.readFileSync(filePath, "utf-8");
    const match = html.match(/data-pagefind-meta="date">([^<]+)</);
    if (match) {
      const d = new Date(match[1]);
      if (!isNaN(d.getTime())) {
        return d.toISOString().split("T")[0];
      }
    }
  } catch {
    // If reading fails, fall back to build date
  }
  return null;
}

/**
 * Assign priority based on URL depth and type.
 */
function getPriority(url: string): number {
  if (url === "/") return 1.0;
  if (url === "/blog") return 0.9;
  if (url.startsWith("/blog/")) return 0.8;
  if (url === "/academic") return 0.7;
  if (url === "/tags" || url === "/til") return 0.6;
  if (url.startsWith("/tags/") || url.startsWith("/til/")) return 0.5;
  return 0.5;
}

/**
 * Assign changefreq based on content type.
 * Blog/TIL detail pages are monthly; indexes are weekly.
 */
function getChangefreq(url: string): string {
  if (url.startsWith("/blog/") || url === "/academic") return "monthly";
  if (url.startsWith("/til/") && url.split("/").filter(Boolean).length >= 2)
    return "monthly"; // individual TIL posts
  if (url.startsWith("/tags") || url === "/blog" || url === "/til")
    return "weekly";
  return "weekly";
}

/**
 * Recursively collect all .html files under a directory,
 * skipping _next/ (static chunks) and 404.html / search.html.
 */
function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  function walk(d: string) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "_next") continue;
        walk(full);
      } else if (
        entry.name.endsWith(".html") &&
        entry.name !== "404.html" &&
        entry.name !== "search.html"
      ) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files;
}

/**
 * Convert a filesystem path to a URL path.
 * Next.js uses percent-encoding in filenames for special characters (e.g.,
 * "/" → "%2F"), but leaves spaces as literal spaces. We decode each segment
 * first (to normalize), then re-encode for a valid URL.
 */
function fileToUrl(filePath: string): string {
  let relative = path.relative(OUT_DIR, filePath);
  relative = relative.replace(/\.html$/, "");
  if (relative === "index") return "/";
  const segments = relative.split("/").map((seg) => {
    try {
      return encodeURIComponent(decodeURIComponent(seg));
    } catch {
      // Malformed percent sequence — encode raw
      return encodeURIComponent(seg);
    }
  });
  return "/" + segments.join("/");
}

/**
 * Escape special XML characters in URL text content.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateSitemap() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn("  Sitemap: out/ directory not found. Run `next build` first.");
    return;
  }

  const htmlFiles = collectHtmlFiles(OUT_DIR);
  const entries: SitemapEntry[] = [];

  for (const file of htmlFiles) {
    const url = fileToUrl(file);
    const lastmod = extractDateFromHtml(file) || BUILD_DATE;
    entries.push({
      url,
      lastmod,
      priority: getPriority(url),
      changefreq: getChangefreq(url),
    });
  }

  // Sort: / first, then /academic, then alphabetical
  entries.sort((a, b) => {
    if (a.url === "/") return -1;
    if (b.url === "/") return 1;
    if (a.url === "/academic") return -1;
    if (b.url === "/academic") return 1;
    return a.url.localeCompare(b.url);
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${escapeXml(BASE_URL + e.url)}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority.toFixed(1)}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  const outputPath = path.join(OUT_DIR, "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`  Sitemap: ${entries.length} URLs written to out/sitemap.xml`);
}

generateSitemap();
