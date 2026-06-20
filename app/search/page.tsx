import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search — Reha Tuncer",
  description: "Search blog posts, TILs, and more",
  robots: { index: false, follow: false },
};

/**
 * No-JS fallback search page.
 * Tells users JS search is available via ⌘K, and provides links
 * to browse tags and content instead.
 */
export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-4">Search</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-glaucous-800 rounded border border-gray-200 dark:border-glaucous-700 font-mono">⌘K</kbd> (or{" "}
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-glaucous-800 rounded border border-gray-200 dark:border-glaucous-700 font-mono">Ctrl+K</kbd>) from any
          page to open the search dialog.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          Search is powered by Pagefind and indexes all blog posts and TILs
          at build time.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/blog"
            className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-glaucous-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-glaucous-700 transition-colors"
          >
            Browse Blog
          </Link>
          <Link
            href="/til"
            className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-glaucous-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-glaucous-700 transition-colors"
          >
            Browse TILs
          </Link>
          <Link
            href="/tags"
            className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-glaucous-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-glaucous-700 transition-colors"
          >
            Browse Tags
          </Link>
        </div>
      </div>
    </div>
  );
}
