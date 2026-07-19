import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostsByTag, getTilsByTag, getAllTags } from "@/lib/tags";
import { BlogPost } from "@/lib/blog-types";
import { TilEntry } from "@/lib/til";

interface Params {
  tag: string;
}

/**
 * Generate static params for all tag pages at build time.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const decodedTag = decodeURIComponent(rawTag);

  if (!/^[\w\s#-]+$/.test(decodedTag)) {
    return { title: "Tags — Reha Tuncer", description: "Browse all tags" };
  }

  return {
    title: `#${decodedTag} — Reha Tuncer`,
    description: `Browse items tagged with "${decodedTag}"`,
  };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag: rawTag } = await params;
  const decodedTag = decodeURIComponent(rawTag);

  if (!/^[\w\s#-]+$/.test(decodedTag)) {
    notFound();
  }

  let blogPosts: BlogPost[];
  let tils: TilEntry[];
  try {
    blogPosts = await getBlogPostsByTag(decodedTag);
    tils = await getTilsByTag(decodedTag);
  } catch (error) {
    console.error(`Failed to fetch data for tag "${decodedTag}":`, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Failed to load tag data. Please try again later.</p>
      </div>
    );
  }

  if (blogPosts.length === 0 && tils.length === 0) {
    notFound();
  }

  // Group blog posts by year
  const groupedByYear: Record<string, typeof blogPosts> = {};
  for (const post of blogPosts) {
    if (!groupedByYear[post.year]) groupedByYear[post.year] = [];
    groupedByYear[post.year].push(post);
  }
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Back link */}
        <Link
          href="/tags"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Tags
        </Link>

        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-2">
          #{decodedTag}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {blogPosts.length + tils.length} item{(blogPosts.length + tils.length) !== 1 ? "s" : ""} tagged &ldquo;{decodedTag}&rdquo;
        </p>

        {/* Blog Posts */}
        {blogPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-charcoal-600">
              Blog Posts ({blogPosts.length})
            </h2>
            {years.map((year) => (
              <div key={year} className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{year}</h3>
                <div className="space-y-4">
                  {groupedByYear[year].map((post) => (
                    <article key={post.slug}>
                      <Link
                        href={`/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}
                        className="group"
                      >
                        <div className="flex items-baseline gap-4">
                          <time className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap min-w-[80px]">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <h3 className="text-base text-gray-800 dark:text-gray-200 group-hover:underline">
                            {post.title}
                          </h3>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TILs */}
        {tils.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-charcoal-600">
              TILs ({tils.length})
            </h2>
            <div className="space-y-4">
              {tils.map((til) => (
                <article key={`${til.topic}-${til.slug}`}>
                  <Link
                    href={`/til/${til.topic}/${til.slug}`}
                    className="group"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap min-w-[100px] px-1.5 py-0.5 bg-gray-100 dark:bg-charcoal-700 rounded">
                        {til.topic}
                      </span>
                      <div>
                        <h3 className="text-base text-gray-800 dark:text-gray-200 group-hover:underline">
                          {til.title}
                        </h3>
                        {til.excerpt && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                            {til.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
