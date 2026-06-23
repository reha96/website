import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/github";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents, { TocHeading } from "@/components/table-of-contents";
import ReadingProgress from "@/components/reading-progress";
import { slug } from "github-slugger";

interface Params {
  year: string;
  month: string;
  day: string;
  slug: string;
}

/**
 * Clean display text for the sidebar: strip "Task X —" prefix
 * and remove backtick-wrapped filenames like (`filename.py`).
 */
function cleanHeadingText(raw: string): string {
  return raw
    .replace(/^Task\s+\d+\s*[—–-]\s*/, "") // remove "Task 0 — " prefix
    .replace(/\(`[^`]+`\)/g, "")            // remove (`filename.ext`)
    .replace(/`[^`]+`/g, "")                // remove `filename.ext`
    .replace(/\s{2,}/g, " ")                // collapse multiple spaces
    .trim();
}

/**
 * Extract ## and ### headings from markdown for the table of contents.
 * Uses github-slugger (same package as rehype-slug) for matching IDs.
 * Deduplicates by appending -1, -2 etc., matching rehype-slug's behavior.
 */
function extractHeadings(markdown: string): TocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  const seenIds = new Map<string, number>();
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    let id = slug(rawText);

    // Deduplicate: match rehype-slug's behavior of appending -1, -2, etc.
    const count = seenIds.get(id) ?? 0;
    if (count > 0) {
      id = `${id}-${count}`;
    }
    seenIds.set(slug(rawText), count + 1);

    const text = cleanHeadingText(rawText);
    headings.push({ text: text || rawText, id, level });
  }
  return headings;
}

/**
 * Pre-build all paths at build time.
 */
export async function generateStaticParams(): Promise<Params[]> {
  // Fetch all posts to get their date components
  const { getAllBlogPostsMeta } = await import("@/lib/github");
  const posts = await getAllBlogPostsMeta();
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Reha Tuncer`,
    description: post.excerpt || `Blog post about ${post.topic}: ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Reading progress bar at bottom */}
      <ReadingProgress />

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="flex gap-10">
          {/* ── Table of Contents Sidebar (left) ── */}
          <TableOfContents headings={headings} />

          {/* ── Main Content ── */}
          <div className="min-w-0 flex-1" data-pagefind-body>
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8 pb-6 border-b border-gray-200 dark:border-charcoal-600">
              <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4" data-pagefind-meta="title">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <time dateTime={post.date} data-pagefind-meta="date">{formattedDate}</time>
                <span>·</span>
                <span>{post.author}</span>
                <span>·</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-charcoal-700 rounded text-xs font-medium">
                  {post.topic}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-2 py-0.5 text-xs bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 rounded-md hover:bg-glaucous-100 dark:hover:bg-charcoal-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Source link — only for GitHub-based posts */}
              {post.repo ? (
              <a
                href={`https://github.com/reha96/${post.repo}/tree/main/${post.path || ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View source on GitHub
              </a>
              ) : null}
            </header>

            {/* Article Content */}
            <MarkdownRenderer content={post.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
