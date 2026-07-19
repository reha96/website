"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";

interface BlogIndexClientProps {
  posts: BlogPost[];
  allTopics: string[];
}

export default function BlogIndexClient({ posts, allTopics }: BlogIndexClientProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    if (activeTopic && post.topic !== activeTopic) return false;
    return true;
  });

  // Topic counts for filter pills
  const topicCounts: Record<string, number> = {};
  for (const post of posts) {
    topicCounts[post.topic] = (topicCounts[post.topic] || 0) + 1;
  }

  // Group posts by year
  const groupedByYear: Record<string, BlogPost[]> = {};
  for (const post of filteredPosts) {
    if (!groupedByYear[post.year]) groupedByYear[post.year] = [];
    groupedByYear[post.year].push(post);
  }

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  const handleTopicClick = (topic: string) => {
    setActiveTopic(activeTopic === topic ? null : topic);
  };

  const clearFilters = () => {
    setActiveTopic(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-2">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Learning notes from DLH projects — machine learning, Python programming, and AI
        </p>

        {/* Filter Bar — Topics */}
        <div className="mb-8">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mr-3">
            Topics
          </span>
          <div className="inline-flex flex-wrap gap-1.5">
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl transition-all duration-200 ${
                  activeTopic === topic
                    ? "text-white"
                    : "bg-gray-100 dark:bg-charcoal-700 text-gray-700 dark:text-gray-300 hover:bg-glaucous-500 hover:text-white dark:hover:bg-coral-600 dark:hover:text-white"
                }`}
                style={activeTopic === topic ? { backgroundColor: 'var(--color-accent)' } : undefined}
              >
                {topic}
                <span className={`text-xs ${activeTopic === topic ? "text-white/70" : "text-gray-400 dark:text-gray-500"}`}>
                  ({topicCounts[topic] || 0})
                </span>
              </button>
            ))}
            {activeTopic && (
              <button
                onClick={clearFilters}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Post List grouped by year */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No posts match the selected filters.
          </div>
        ) : (
          years.map((year) => (
            <div key={year} className="mb-10">
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-charcoal-600">
                {year}
              </h2>
              <div className="space-y-4">
                {groupedByYear[year].map((post) => (
                  <article key={post.slug}>
                    <Link
                      href={`/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}
                      className="block rounded-xl border border-gray-100 dark:border-charcoal-700 p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-md hover:border-glaucous-200 dark:hover:border-charcoal-600 bg-transparent hover:bg-gray-50/50 dark:hover:bg-charcoal-800/50"
                    >
                      <div className="flex items-baseline gap-4">
                        <time
                          dateTime={post.date}
                          className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap min-w-[80px]"
                        >
                          {new Date(`${post.year}-${post.month}-${post.day}T12:00:00`).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
                              {post.title}
                            </h3>
                            <span className="shrink-0 px-1.5 py-0.5 text-xs rounded-md bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 font-medium">
                              {post.topic}
                            </span>
                          </div>
                          {post.excerpt && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 text-xs bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="text-xs text-gray-400 dark:text-gray-500">+{post.tags.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
