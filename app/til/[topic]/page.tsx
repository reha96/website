import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTilsByTopic, getTilTopics } from "@/lib/til";

interface Params {
  topic: string;
}

export function generateStaticParams(): Params[] {
  const topics = getTilTopics();
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic } = await params;
  return {
    title: `TIL: ${topic} — Reha Tuncer`,
    description: `Today I Learned entries about ${topic}`,
  };
}

export default async function TilTopicPage({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  const tils = getTilsByTopic(topic);

  if (tils.length === 0) notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Link
          href="/til"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All TILs
        </Link>

        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-2 capitalize">
          {topic}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {tils.length} TIL{tils.length !== 1 ? "s" : ""}
        </p>

        <div className="space-y-6">
          {tils.map((til) => (
            <article key={til.slug}>
              <Link href={`/til/${topic}/${til.slug}`} className="group block">
                <div className="flex items-baseline gap-4">
                  <time
                    dateTime={til.date}
                    className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap min-w-[90px]"
                  >
                    {new Date(til.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div>
                    <h3 className="text-base text-gray-800 dark:text-gray-200 group-hover:underline">
                      {til.title}
                    </h3>
                    {til.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {til.excerpt}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {til.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                          className="px-1.5 py-0.5 text-xs bg-gray-50 dark:bg-charcoal-700/50 text-gray-400 dark:text-gray-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-600 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
