import { Metadata } from "next";
import Link from "next/link";
import { getAllTils, getTilTopics } from "@/lib/til";

export const metadata: Metadata = {
  title: "TIL — Reha Tuncer",
  description: "Today I Learned — short notes on things I've discovered",
};

export default function TilIndexPage() {
  const tils = getAllTils();
  const topics = getTilTopics();

  // Group recent TILs by date (last 20)
  const recentTils = tils.slice(0, 20);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-1">Today I Learned</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Short notes on things I&apos;ve discovered — {tils.length} TILs so far
        </p>

        {/* Topics sidebar-style grid */}
        <div className="mb-10">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/til/${topic.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-oil-green-700 text-gray-700 dark:text-gray-300 hover:bg-glaucous-100 dark:hover:bg-oil-green-600 transition-colors"
              >
                {topic.name}
                <span className="text-gray-400 dark:text-gray-500 text-xs">({topic.count})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent TILs */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-oil-green-600">
            Recent TILs
          </h2>
          <div className="space-y-4">
            {recentTils.map((til) => (
              <article key={`${til.topic}-${til.slug}`}>
                <Link
                  href={`/til/${til.topic}/${til.slug}`}
                  className="group block"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap min-w-[100px] px-1.5 py-0.5 bg-gray-100 dark:bg-oil-green-700 rounded">
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
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {til.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-xs bg-gray-50 dark:bg-oil-green-700/50 text-gray-400 dark:text-gray-500 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {tils.length > 20 && (
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
              Showing 20 of {tils.length} TILs. Browse by topic above for more.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
