/* eslint-disable */
/**
 * Build-time check: every internal <a href> in the built site must resolve to
 * a real file in out/, and every hash anchor must exist in the target page.
 *
 * Handles Next.js export quirks: extensionless clean URLs, /index.html roots,
 * %2F-encoded slashes in filenames, and %20 hrefs pointing at files whose
 * names contain literal spaces (mirrors lib/sitemap.ts fileToUrl).
 *
 * Runs during postbuild via: npm run check:links
 */
import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "out");
const SKIP_DIRS = new Set(["_next", "pagefind"]);

interface Entry {
  url: string;
  filePath: string;
  isHtml: boolean;
}

const failures: string[] = [];
const anchorCache = new Map<string, Set<string>>();
let linkCount = 0;

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

function decodeSegment(seg: string): string {
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
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

/** Normalize an href to the same canonical form fileToUrl produces. */
function normalizeHref(href: string): string {
  const clean = href.split("?")[0].replace(/\.html$/, "").replace(/\/+$/, "");
  if (clean === "") return "/";
  const segments = clean.split("/").filter(Boolean).map((seg) => encodeSegment(seg));
  return "/" + segments.join("/");
}

function getAnchors(filePath: string): Set<string> {
  if (!anchorCache.has(filePath)) {
    const html = fs.readFileSync(filePath, "utf-8");
    const ids = new Set<string>();
    const re = /id="([^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) ids.add(m[1]);
    anchorCache.set(filePath, ids);
  }
  return anchorCache.get(filePath)!;
}

const entries: Entry[] = collectFiles(OUT_DIR).map((filePath) => ({
  filePath,
  url: fileToUrl(filePath),
  isHtml: filePath.endsWith(".html"),
}));
const byUrl = new Map(entries.map((e) => [e.url, e]));

for (const page of entries) {
  if (!page.isHtml) continue;
  const html = fs.readFileSync(page.filePath, "utf-8");
  const aRe = /<a\b[^>]*\bhref=(["'])([^"']*)\1/gi;
  let m: RegExpExecArray | null;
  while ((m = aRe.exec(html)) !== null) {
    const href = m[2].trim();
    if (href === "") continue;
    if (/^(https?:)?\/\//.test(href)) continue;
    if (/^(mailto|tel|data|javascript):/i.test(href)) continue;
    const hashIndex = href.indexOf("#");
    const pathPart = hashIndex === -1 ? href : href.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? "" : href.slice(hashIndex + 1);
    if (pathPart === "") continue;

    linkCount++;
    const target = byUrl.get(normalizeHref(pathPart));
    if (!target) {
      const rel = path.relative(OUT_DIR, page.filePath);
      failures.push(`${rel} → "${href}" (unresolved)`);
      continue;
    }
    if (fragment !== "") {
      if (!target.isHtml) {
        failures.push(`${path.relative(OUT_DIR, page.filePath)} → "${href}" (anchor on non-HTML target)`);
        continue;
      }
      if (!getAnchors(target.filePath).has(fragment)) {
        failures.push(
          `${path.relative(OUT_DIR, page.filePath)} → "${href}" (anchor "#${fragment}" not found in ${path.relative(OUT_DIR, target.filePath)})`
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`  Link check: FAILED (${failures.length})`);
  for (const f of failures) console.error(`    - ${f}`);
  process.exit(1);
}
console.log(`  Link check: OK (${linkCount} internal links on ${entries.filter((e) => e.isHtml).length} pages)`);
