import { getAllBlogPostsMeta, getFilters } from "@/lib/github";
import BlogIndexClient from "@/components/blog-index-client";

/**
 * Blog index page — SSG.
 * Lists all posts grouped by year with topic filtering.
 */
export default async function BlogIndexPage() {
  const posts = await getAllBlogPostsMeta();
  const { topics } = await getFilters();

  return <BlogIndexClient posts={posts} allTopics={topics} />;
}
