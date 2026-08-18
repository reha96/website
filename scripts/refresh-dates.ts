/* eslint-disable */
/**
 * Refreshes content/commit-dates.json with the FIRST-commit (publish) dates
 * of each configured README, read from the LOCAL git checkouts of the dlh-*
 * repos. No GitHub API — no rate limits, works offline.
 *
 * First-commit dates make post URLs immutable: editing a README later never
 * moves its /blog/<year>/<month>/<day>/<slug> URL.
 *
 * Run after any source README changes (search/excerpt data refresh):
 *   npm run refresh:dates
 *
 * If a repo is not cloned locally, the entry keeps its previous date and
 * a warning is printed — clone the repo and re-run.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { BLOG_POSTS_CONFIG } from "../lib/blog-config";

const CACHE_PATH = path.join(process.cwd(), "content", "commit-dates.json");
const REPOS_DIR = "/home/rehat/Documents/GitHub";

function git(cmd: string): string | null {
  try {
    return execSync(cmd, { encoding: "utf-8" }).trim() || null;
  } catch {
    return null;
  }
}

/** First commit date touching the given file inside the repo, as UTC ISO. */
function firstCommitDate(repo: string, filePath: string): string | null {
  const repoDir = path.join(REPOS_DIR, repo);
  if (!fs.existsSync(repoDir)) return null;
  const raw = git(`git -C "${repoDir}" log --reverse --format=%cI -- "${filePath}" | head -1`);
  return raw ? toUtcIso(raw) : null;
}

/** Creation date of the repo (its first commit), as UTC ISO. */
function repoCreatedDate(repo: string): string | null {
  const repoDir = path.join(REPOS_DIR, repo);
  if (!fs.existsSync(repoDir)) return null;
  const raw = git(`git -C "${repoDir}" log --reverse --format=%cI | head -1`);
  return raw ? toUtcIso(raw) : null;
}

function toUtcIso(value: string): string {
  const d = new Date(value);
  return isNaN(d.getTime()) ? value : d.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function readCache(): Record<string, string> {
  if (!fs.existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function main() {
  const previous = readCache();
  const next: Record<string, string> = {};
  let keptPrevious = 0;
  let missing = 0;

  for (const [slug, meta] of Object.entries(BLOG_POSTS_CONFIG)) {
    const key = meta.path ? `${meta.repo}/${meta.path}` : meta.repo;
    const date = meta.path
      ? firstCommitDate(meta.repo, `${meta.path}/README.md`)
      : repoCreatedDate(meta.repo);
    if (date) {
      next[key] = date;
    } else if (previous[key]) {
      next[key] = previous[key];
      keptPrevious++;
    } else {
      missing++;
      console.warn(`    ! ${key}: no local clone or git history — no date (clone the repo and re-run)`);
    }
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(next, null, 2) + "\n", "utf-8");

  const changed = Object.entries(next)
    .filter(([key, value]) => previous[key] !== value)
    .sort(([a], [b]) => a.localeCompare(b));
  console.log(`  Dates: ${Object.keys(next).length} entries (${changed.length} changed)`);
  for (const [key, value] of changed) {
    console.log(`    - ${key}: ${previous[key] ?? "(new)"} → ${value}`);
  }
  if (keptPrevious > 0) {
    console.warn(`  ${keptPrevious} entries kept previous dates (local clone missing)`);
  }
  if (missing > 0) {
    console.warn(`  ${missing} entries have no date at all — fix the clones above before building`);
  }
}

main();
