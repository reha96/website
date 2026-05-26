import { getAllBlogPostsMeta } from "@/lib/github";

const BASE_URL = "https://rehatuncer.com";

export default async function sitemap() {
  const posts = await getAllBlogPostsMeta();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.year}/${post.month}/${post.day}/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ...blogUrls,
  ];
}