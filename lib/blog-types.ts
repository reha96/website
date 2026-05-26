export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date "2024-03-15"
  year: string;
  month: string;
  day: string;
  repo: string;
  path: string;
  tags: string[];
  topic: string;
  author: string;
  excerpt: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string; // raw markdown
}
