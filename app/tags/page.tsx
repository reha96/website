import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import { isPaperTag, getPaperAnchor } from "@/lib/paper-tags";

export const metadata: Metadata = {
  title: "Tags — Reha Tuncer",
  description: "Browse all tags used across blog posts and TILs",
};

export default async function TagsIndexPage() {
  let tags: { tag: string; count: number }[];
  try {
    tags = await getAllTags();
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Failed to load tags. Please try again later.</p>
      </div>
    );
  }

  // Group tags by first letter
  const byLetter: Record<string, typeof tags> = {};
  for (const { tag, count } of tags) {
    const letter = /^[a-zA-Z]/.test(tag) ? tag[0].toUpperCase() : "#";
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push({ tag, count });
  }
  const letters = Object.keys(byLetter).sort((a, b) =>
    a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-2">Tags</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {tags.length} tags across all content
        </p>

        {letters.map((letter) => (
          <div key={letter} className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 pb-1 border-b border-gray-200 dark:border-charcoal-600">
              {letter}
            </h2>
            <div className="flex flex-wrap gap-2">
              {byLetter[letter].map(({ tag, count }) => {
                // Paper tags link to academic page anchors; blog/TIL tags go to tag detail pages
                const href = isPaperTag(tag)
                  ? `/academic#${getPaperAnchor(tag)}`
                  : `/tags/${encodeURIComponent(tag.toLowerCase())}`;
                return (
                  <Link
                    key={tag}
                    href={href}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-sm bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 hover:bg-glaucous-100 dark:hover:bg-charcoal-600"
                  >
                    {tag}
                    <span className="text-gray-400 dark:text-gray-500 text-xs">({count})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
