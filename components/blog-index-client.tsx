"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";

interface BlogIndexClientProps {
  posts: BlogPost[];
  allTags: string[];
  allTopics: string[];
}

export default function BlogIndexClient({ posts, allTags, allTopics }: BlogIndexClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    if (activeTag && !post.tags.includes(activeTag)) return false;
    if (activeTopic && post.topic !== activeTopic) return false;
    return true;
  });

  // Group posts by year
  const groupedByYear: Record<string, BlogPost[]> = {};
  for (const post of filteredPosts) {
    if (!groupedByYear[post.year]) groupedByYear[post.year] = [];
    groupedByYear[post.year].push(post);
  }

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    setActiveTopic(null);
  };

  const handleTopicClick = (topic: string) => {
    setActiveTopic(activeTopic === topic ? null : topic);
    setActiveTag(null);
  };

  const clearFilters = () => {
    setActiveTag(null);
    setActiveTopic(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-3xl font-medium text-gray-800 mb-2">Blog</h1>
        <p className="text-gray-600 mb-8">
          Learning notes from DLH projects — machine learning, Python programming, and AI
        </p>

        {/* Filter Bar — Topics */}
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mr-3">
            Topic
          </span>
          <div className="inline-flex flex-wrap gap-1.5">
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTopic === topic
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {topic}
              </button>
            ))}
            {(activeTag || activeTopic) && (
              <button
                onClick={clearFilters}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar — Tags */}
        <div className="mb-8">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mr-3">
            Tags
          </span>
          <div className="inline-flex flex-wrap gap-1.5">
            {allTags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                  activeTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 20 && (
              <span className="text-xs text-gray-400 self-center">
                +{allTags.length - 20} more
              </span>
            )}
          </div>
        </div>

        {/* Post List grouped by year */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No posts match the selected filters.
          </div>
        ) : (
          years.map((year) => (
            <div key={year} className="mb-10">
              <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {year}
              </h2>
              <div className="space-y-6">
                {groupedByYear[year].map((post) => (
                  <article key={post.slug} className="group">
                    <Link
                      href={`/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}
                      className="block"
                    >
                      <div className="flex items-baseline gap-4">
                        <time
                          dateTime={post.date}
                          className="text-sm text-gray-400 whitespace-nowrap min-w-[80px]"
                        >
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <div>
                          <h3 className="text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="text-xs text-gray-400">+{post.tags.length - 4}</span>
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
