/* eslint-disable */
/**
 * Build-time check: validates vercel.json routing rules for self-loops,
 * cross-domain bounces, and off-allowlist destinations.
 *
 * Vercel applies vercel.json redirects/rewrites to EVERY domain attached to
 * the project. An unconditional catch-all redirect to an own domain makes
 * that domain redirect to itself — the Aug 2026 outage. A failing check here
 * fails the build, so bad routing config never promotes.
 *
 * Runs during postbuild via: npm run check:config
 */
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "vercel.json");
const OWN_HOSTS = ["www.rehatuncer.com", "rehatuncer.com"];
const CATCHALL_SOURCE = /^\/\(\.\*\)$|^\/:[\w-]*[*+]$|^\/\*$|^\/\.\+$/;

interface Rule {
  kind: "redirect" | "rewrite";
  source: string;
  destination: string;
  has: { type: string; value?: string }[];
  missing: { type: string; value?: string }[];
}

const failures: string[] = [];

function fail(msg: string) {
  failures.push(msg);
}

function parseConfig(): { redirects: Rule[]; rewrites: Rule[] } {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log("  Config check: vercel.json not found — nothing to validate");
    process.exit(0);
  }
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  } catch (err) {
    fail(`vercel.json is not valid JSON: ${(err as Error).message}`);
    return { redirects: [], rewrites: [] };
  }
  const obj = raw as Record<string, unknown>;
  const parseRules = (key: string, kind: "redirect" | "rewrite"): Rule[] => {
    if (obj[key] === undefined) return [];
    const arr = obj[key];
    if (!Array.isArray(arr)) {
      fail(`vercel.json "${key}" must be an array`);
      return [];
    }
    return arr.map((r, i) => {
      const rule = r as Record<string, unknown>;
      if (typeof rule.source !== "string" || typeof rule.destination !== "string") {
        fail(`vercel.json ${key}[${i}]: source and destination must be strings`);
      }
      return {
        kind,
        source: typeof rule.source === "string" ? rule.source : "",
        destination: typeof rule.destination === "string" ? rule.destination : "",
        has: Array.isArray(rule.has) ? (rule.has as Rule["has"]) : [],
        missing: Array.isArray(rule.missing) ? (rule.missing as Rule["missing"]) : [],
      };
    });
  };
  return { redirects: parseRules("redirects", "redirect"), rewrites: parseRules("rewrites", "rewrite") };
}

function destHost(destination: string): string | null {
  const m = destination.match(/^https?:\/\/([^\/:]+)/);
  return m ? m[1] : null;
}

function isCatchAll(source: string): boolean {
  return CATCHALL_SOURCE.test(source);
}

/** Does rule apply to a given request host? Handles has/missing host conditions. */
function appliesTo(rule: Rule, host: string): boolean {
  const hasHost = rule.has.filter((c) => c.type === "host");
  const missingHost = rule.missing.filter((c) => c.type === "host");
  if (missingHost.some((c) => c.value === host)) return false;
  if (hasHost.length === 0) return true;
  return hasHost.every((c) => c.value === host);
}

function hasOwnHostDestination(rule: Rule): boolean {
  const host = destHost(rule.destination);
  return host !== null && OWN_HOSTS.includes(host);
}

function checkRules(rules: Rule[]) {
  for (const rule of rules) {
    if (!rule.source || !rule.destination) continue;
    const host = destHost(rule.destination);
    if (host !== null && !OWN_HOSTS.includes(host)) {
      fail(
        `${rule.kind} "${rule.source}" → "${rule.destination}": destination host not in allowlist ${OWN_HOSTS.join(", ")}`
      );
      continue;
    }
    if (!isCatchAll(rule.source)) continue;
    if (!hasOwnHostDestination(rule)) continue;

    const hasHostCondition = rule.has.some((c) => c.type === "host");
    if (!hasHostCondition) {
      fail(
        `${rule.kind} "${rule.source}" → "${rule.destination}": catch-all to own host with no host condition — fires on every domain and self-loops the destination host`
      );
    }
    for (const ownHost of OWN_HOSTS) {
      if (appliesTo(rule, ownHost) && host === ownHost) {
        fail(`${rule.kind} "${rule.source}" → "${rule.destination}": self-loop on ${ownHost}`);
      }
    }
  }
}

function checkMutualBounce(rules: Rule[]) {
  for (let i = 0; i < rules.length; i++) {
    for (let j = i + 1; j < rules.length; j++) {
      const a = rules[i];
      const b = rules[j];
      if (!isCatchAll(a.source) || !isCatchAll(b.source)) continue;
      const hostA = destHost(a.destination);
      const hostB = destHost(b.destination);
      if (hostA === null || hostB === null) continue;
      if (!OWN_HOSTS.includes(hostA) || !OWN_HOSTS.includes(hostB)) continue;
      if (hostA === hostB) continue;
      if (appliesTo(a, hostB) && appliesTo(b, hostA)) {
        fail(
          `${a.kind} "${a.source}" → ${hostA} and ${b.kind} "${b.source}" → ${hostB}: mutual bounce between ${hostB} and ${hostA}`
        );
      }
    }
  }
}

const { redirects, rewrites } = parseConfig();
checkRules(redirects);
checkRules(rewrites);
checkMutualBounce([...redirects, ...rewrites]);

if (failures.length > 0) {
  console.error(`  Config check: FAILED (${failures.length})`);
  for (const f of failures) console.error(`    - ${f}`);
  process.exit(1);
}
console.log(
  `  Config check: OK (${redirects.length} redirects, ${rewrites.length} rewrites validated)`
);
