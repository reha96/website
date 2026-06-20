/* eslint-disable */
/**
 * Build-time script: generates out/search-index.json from local markdown + built HTML pages.
 * Runs during postbuild via: npx tsx lib/search-index.ts
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const OUT_DIR = path.join(process.cwd(), "out");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const TIL_DIR = path.join(process.cwd(), "content", "til");

interface SearchEntry {
  title: string;
  url: string;
  excerpt: string;
  date: string;
  tags: string[];
  type: "blog" | "til";
}

function extractExcerpt(content: string): string {
  const lines = content.split("\n");
  let foundHeading = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#/.test(trimmed)) { foundHeading = true; continue; }
    if (foundHeading && trimmed.length > 30) {
      return trimmed.slice(0, 160) + (trimmed.length > 160 ? "\u2026" : "");
    }
  }
  return "";
}

function dateToParts(iso: string) {
  const d = new Date(iso);
  return { year: String(d.getUTCFullYear()), month: String(d.getUTCMonth() + 1).padStart(2, "0"), day: String(d.getUTCDate()).padStart(2, "0") };
}

/** Extract title and meta from built blog HTML (data-pagefind-meta attributes) */
function parseHtmlMeta(html: string): { title: string; date: string; excerpt: string } | null {
  const titleMatch = html.match(/data-pagefind-meta="title"[^>]*>([^<]+)</);
  const dateMatch = html.match(/data-pagefind-meta="date"[^>]*>([^<]+)</);
  const title = titleMatch ? titleMatch[1].trim() : "";
  const date = dateMatch ? dateMatch[1].trim() : "";
  // First paragraph after the header block
  const pMatch = html.match(/<\/header>\s*<[^>]+>\s*<p[^>]*>([^<]+)</);
  const excerpt = pMatch ? pMatch[1].trim().slice(0, 160) : "";
  if (!title) return null;
  return { title, date, excerpt };
}

function buildIndex() {
  const entries: SearchEntry[] = [];

  // ── Local blog posts (markdown) ──
  if (fs.existsSync(BLOG_DIR)) {
    for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
      try {
        const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
        if (!data.title || !data.date || !data.slug) continue;
        const { year, month, day } = dateToParts(data.date);
        entries.push({
          title: data.title, url: `/blog/${year}/${month}/${day}/${data.slug}`,
          excerpt: data.excerpt || extractExcerpt(content),
          date: data.date, tags: data.tags || [], type: "blog",
        });
      } catch { /* skip */ }
    }
  }

  // ── GitHub blog posts (built HTML) ──
  const blogOutDir = path.join(OUT_DIR, "blog");
  if (fs.existsSync(blogOutDir)) {
    for (const year of fs.readdirSync(blogOutDir).filter((f) => /^\d{4}$/.test(f))) {
      const yearDir = path.join(blogOutDir, year);
      if (!fs.statSync(yearDir).isDirectory()) continue;
      for (const month of fs.readdirSync(yearDir)) {
        const monthDir = path.join(yearDir, month);
        if (!fs.statSync(monthDir).isDirectory()) continue;
        for (const day of fs.readdirSync(monthDir)) {
          const dayDir = path.join(monthDir, day);
          if (!fs.statSync(dayDir).isDirectory()) continue;
          for (const slug of fs.readdirSync(dayDir)) {
            const htmlFile = path.join(dayDir, slug);
            if (!htmlFile.endsWith(".html")) continue;
            const slugName = slug.replace(/\.html$/, "");
            try {
              const html = fs.readFileSync(htmlFile, "utf-8");
              const meta = parseHtmlMeta(html);
              if (!meta) continue;
              const url = `/blog/${year}/${month}/${day}/${slugName}`;
              if (entries.some((e) => e.url === url)) continue;
              entries.push({
                title: meta.title, url,
                excerpt: meta.excerpt, date: meta.date,
                tags: [], type: "blog",
              });
            } catch { /* skip */ }
          }
        }
      }
    }
  }

  // ── TILs (markdown) ──
  if (fs.existsSync(TIL_DIR)) {
    for (const topic of fs.readdirSync(TIL_DIR).filter((f) => fs.statSync(path.join(TIL_DIR, f)).isDirectory())) {
      for (const file of fs.readdirSync(path.join(TIL_DIR, topic)).filter((f) => f.endsWith(".md"))) {
        try {
          const { data, content } = matter(fs.readFileSync(path.join(TIL_DIR, topic, file), "utf-8"));
          if (!data.title || !data.date) continue;
          entries.push({
            title: data.title, url: `/til/${topic}/${path.basename(file, ".md")}`,
            excerpt: extractExcerpt(content),
            date: data.date, tags: data.tags || [], type: "til",
          });
        } catch { /* skip */ }
      }
    }
  }

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "search-index.json"), JSON.stringify(entries), "utf-8");
  console.log(`  Search index: ${entries.length} entries written to out/search-index.json`);
}

buildIndex();
