import { getAllBlogPostsMeta, getFilters } from "@/lib/github";
import BlogIndexClient from "@/components/blog-index-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Reha Tuncer",
  description: "Learning notes from DLH projects — machine learning, Python programming, and AI",
  alternates: { canonical: "/blog" },
};

/**
 * Blog index page — SSG.
 * Lists all posts grouped by year with topic filtering.
 */
export default async function BlogIndexPage() {
  try {
    const posts = await getAllBlogPostsMeta();
    const { topics } = await getFilters();

    return <BlogIndexClient posts={posts} allTopics={topics} />;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Failed to load blog data. Please try again later.</p>
      </div>
    );
  }
}
