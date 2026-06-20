# Content Publishing Guide

This site is powered by **Next.js** with **Markdown files** as the content source.
GitHub is the CMS — create/edit files directly in the repo, push to deploy.

## Content Types

| Type     | Directory             | URL Pattern                        |
|----------|----------------------|------------------------------------|
| Blog     | `content/blog/`      | `/blog/YYYY/MM/DD/slug`           |
| TIL      | `content/til/<topic>/` | `/til/<topic>/<filename>`        |

## Creating a Blog Post

1. Create a new `.md` file in `content/blog/`
2. Copy the frontmatter from `content/blog/_template.md`
3. Fill in all required fields:

```yaml
---
title: "Your Post Title"
date: "2026-06-20"          # ISO date
slug: "your-post-slug"       # URL-friendly, lowercase, hyphens
tags: ["Tag1", "Tag2"]       # 3-6 relevant keywords
topic: "Your Topic"           # broader category
author: "Reha Tuncer"
---
```

4. Write content in Markdown below the `---` separator
5. Push to `master` → Vercel auto-deploys

## Creating a TIL

1. Choose the right topic folder under `content/til/` (e.g., `python/`, `sql/`)
2. Create a `.md` file with a descriptive filename
3. Frontmatter:

```yaml
---
title: "My TIL Title"
date: "2026-06-15"
tags: ["python", "tips"]
---
```

> **Note**: TILs don't need a `slug` — the filename becomes the URL slug.
> `topic` is derived from the directory name.

4. Keep content short and focused on ONE thing you learned

## Adding Tags

Tags are free-form strings in YAML arrays:

```yaml
tags: ["Python", "NumPy", "Data Science"]
```

- Use consistent casing (e.g., "Python" not "python" in blog posts)
- Tags are automatically collected across all content
- Tag pages live at `/tags/<tagname>`
- Both blog posts and TILs contribute to the tag cloud

## Preview Locally

```bash
npm run dev
# Open http://localhost:3000
```

## Deployment

Push to `master` → Vercel automatically builds and deploys.
No manual steps needed.
