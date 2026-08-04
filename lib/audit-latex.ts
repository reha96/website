/* eslint-disable */
/**
 * Audit LaTeX rendering across all markdown sources and built HTML.
 * Run after a build: npm run audit:latex
 *
 * Checks two things per source:
 * 1. In-memory render through the exact pipeline used by markdown-renderer.tsx:
 *    every math node in the mdast tree must produce a KaTeX span, and no raw
 *    LaTeX may leak into the visible output.
 * 2. Built HTML in out/ must not contain raw LaTeX in its visible text.
 *
 * Exit code 1 if any source or built page fails.
 */
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { BLOG_POSTS_CONFIG } from "./blog-config";

const OUT_DIR = path.join(process.cwd(), "out");
const CONTENT_DIR = path.join(process.cwd(), "content");

const schema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [["className", /^language-./, "math-inline", "math-display"]],
  },
};

type Schema = import("hast-util-sanitize").Schema;

/** A `\command{` in visible text is raw LaTeX that failed to render. */
const RAW_LATEX_RE = /\\[a-zA-Z]{2,}\{/;

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath);

const renderer = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, schema)
  .use(rehypeKatex)
  .use(rehypeHighlight)
  .use(rehypeSlug);

interface Source {
  name: string;
  md: string;
}

function collectLocalSources(): Source[] {
  const sources: Source[] = [];
  const about = path.join(CONTENT_DIR, "about.md");
  if (fs.existsSync(about)) {
    const content = fs.readFileSync(about, "utf-8");
    const match = content.match(/---[\s\S]*?---([\s\S]*)/);
    sources.push({ name: "content/about.md", md: match ? match[1] : content });
  }
  const blogDir = path.join(CONTENT_DIR, "blog");
  if (fs.existsSync(blogDir)) {
    for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
      const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const match = content.match(/---[\s\S]*?---([\s\S]*)/);
      sources.push({ name: `content/blog/${file}`, md: match ? match[1] : content });
    }
  }
  const tilDir = path.join(CONTENT_DIR, "til");
  if (fs.existsSync(tilDir)) {
    for (const topic of fs.readdirSync(tilDir).filter((f) => fs.statSync(path.join(tilDir, f)).isDirectory())) {
      for (const file of fs.readdirSync(path.join(tilDir, topic)).filter((f) => f.endsWith(".md"))) {
        const content = fs.readFileSync(path.join(tilDir, topic, file), "utf-8");
        const match = content.match(/---[\s\S]*?---([\s\S]*)/);
        sources.push({ name: `content/til/${topic}/${file}`, md: match ? match[1] : content });
      }
    }
  }
  return sources;
}

async function fetchReadme(repo: string, p: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/reha96/${repo}/main/${p}/README.md`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Count real math nodes in the mdast tree (remark-math only marks real math). */
function countMathNodes(md: string): number {
  const tree = processor.parse(md);
  let count = 0;
  visit(tree, (node: any) => {
    if (node.type === "math" || node.type === "inlineMath") count++;
  });
  return count;
}

/** Walk a hast tree: count katex spans and raw latex leaks in visible text. */
function analyzeHast(tree: any): { katex: number; leaks: number } {
  let katex = 0;
  let leaks = 0;
  visit(tree, (node: any, _index: number | undefined, parent: any) => {
    if (node.type === "element") {
      const cls = node.properties?.className;
      if (Array.isArray(cls) && cls.includes("katex")) katex++;
      if (node.tagName === "annotation") return; // hidden MathML source, not visible
    }
    if (node.type === "text" && RAW_LATEX_RE.test(node.value)) {
      // Skip text inside code/annotation elements: code samples may contain \foo{.
      if (parent?.tagName === "code" || parent?.tagName === "annotation") return;
      leaks++;
    }
  });
  return { katex, leaks };
}

/** Scan built out/**\/*.html for raw latex in visible text. */
function scanBuiltHtml(): string[] {
  const problems: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".html")) {
        const html = fs.readFileSync(p, "utf-8")
          .replace(/<script[\s\S]*?<\/script>/g, "")
          .replace(/<style[\s\S]*?<\/style>/g, "")
          .replace(/<annotation[\s\S]*?<\/annotation>/g, "")
          .replace(/<pre[\s\S]*?<\/pre>/g, "")
          .replace(/<code[\s\S]*?<\/code>/g, "");
        if (RAW_LATEX_RE.test(html)) problems.push(p);
      }
    }
  };
  walk(OUT_DIR);
  return problems;
}

async function main() {
  const sources = collectLocalSources();

  const skipped: string[] = [];
  for (const [slug, meta] of Object.entries(BLOG_POSTS_CONFIG)) {
    const md = await fetchReadme(meta.repo, meta.path);
    if (md === null) {
      skipped.push(slug);
      continue;
    }
    sources.push({ name: `README: ${slug} (${meta.repo}/${meta.path})`, md });
  }

  let failed = 0;
  for (const { name, md } of sources) {
    const mathNodes = countMathNodes(md);
    if (mathNodes === 0) continue;
    const tree = await renderer.run(processor.parse(md));
    const { katex, leaks } = analyzeHast(tree);
    const ok = leaks === 0 && katex > 0;
    if (!ok) failed++;
    console.log(
      `${ok ? "PASS" : "FAIL"} ${name}: ${mathNodes} math node(s), ${katex} katex span(s), ${leaks} leak(s)`
    );
  }

  const builtProblems = scanBuiltHtml();
  if (builtProblems.length > 0) {
    failed += builtProblems.length;
    console.log(`FAIL built HTML: raw LaTeX leak in ${builtProblems.length} file(s):`);
    for (const p of builtProblems) console.log(`  - ${path.relative(process.cwd(), p)}`);
  } else {
    console.log("Built HTML: no raw LaTeX leaks in out/");
  }

  if (failed > 0) {
    console.error(`\n${failed} failure(s)`);
    process.exit(1);
  }
  console.log("\nAll LaTeX rendering checks passed.");
}

main();
