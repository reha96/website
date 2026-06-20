import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTil, getAllTils } from "@/lib/til";
import MarkdownRenderer from "@/components/markdown-renderer";

interface Params {
  topic: string;
  slug: string;
}

export function generateStaticParams(): Params[] {
  const tils = getAllTils();
  return tils.map((til) => ({ topic: til.topic, slug: til.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic, slug } = await params;
  const til = getTil(topic, slug);
  if (!til) return { title: "TIL Not Found" };

  return {
    title: `${til.title} — TIL — Reha Tuncer`,
    description: til.excerpt,
  };
}

export default async function TilEntryPage({ params }: { params: Promise<Params> }) {
  const { topic, slug } = await params;
  const til = getTil(topic, slug);

  if (!til) notFound();

  const formattedDate = new Date(til.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/til" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            TIL
          </Link>
          <span>/</span>
          <Link
            href={`/til/${topic}`}
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors capitalize"
          >
            {topic}
          </Link>
        </div>

        <article data-pagefind-body>
          <header className="mb-8 pb-6 border-b border-gray-200 dark:border-oil-green-600">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4" data-pagefind-meta="title">
              {til.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={til.date} data-pagefind-meta="date">{formattedDate}</time>
              <span>·</span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-oil-green-700 rounded text-xs font-medium capitalize">
                {til.topic}
              </span>
            </div>
            {til.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {til.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-oil-green-700 text-blue-700 dark:text-sulphur-300 rounded-md hover:bg-blue-100 dark:hover:bg-oil-green-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <MarkdownRenderer content={til.content} />
        </article>
      </div>
    </div>
  );
}
