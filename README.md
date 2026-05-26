# Reha Tuncer — Academic Website & Blog

Personal academic website built with Next.js, featuring research papers, CV, and a blog of DLH learning projects sourced from GitHub.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Markdown:** react-markdown + remark-gfm + rehype-highlight
- **Runtime:** Node.js 22.x

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
website/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Homepage (academic profile, papers)
│   ├── globals.css             # Global styles
│   ├── blog/
│   │   ├── layout.tsx          # Blog section layout
│   │   ├── page.tsx            # Blog index (SSG, filterable by tag/topic)
│   │   └── [year]/[month]/[day]/[slug]/
│   │       └── page.tsx        # Individual blog post (SSG)
│   ├── api/
│   │   ├── auth/route.ts       # Login endpoint
│   │   ├── check-auth/route.ts # Auth status check
│   │   └── logout/route.ts     # Logout endpoint
│   └── private/                # Private area (password-protected)
│       ├── page.tsx            # Login page
│       └── jobs/               # Job applications tracker
├── components/
│   ├── navbar.tsx              # Navigation bar
│   ├── markdown-renderer.tsx   # Client-side markdown renderer
│   └── blog-index-client.tsx   # Blog index with filters
├── lib/
│   ├── blog-types.ts           # TypeScript interfaces
│   ├── blog-config.ts          # Blog post metadata config
│   └── github.ts               # GitHub API fetch utilities
├── public/                     # Static assets (images, PDFs)
├── middleware.ts               # Auth middleware for /private routes
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Blog

The blog at `/blog` fetches README.md files from the following GitHub repositories at build time:

- [`dlh-machine_learning`](https://github.com/reha96/dlh-machine_learning) — ML foundations
- [`dlh-higher_level_programming`](https://github.com/reha96/dlh-higher_level_programming) — Python programming
- [`DLH-AI-Academy`](https://github.com/reha96/DLH-AI-Academy) — AI Academy

Each README becomes a blog post with tags, topics, and chronological ordering. Content is statically generated at build time (SSG) and rendered client-side with syntax highlighting.

To add or remove posts, edit `lib/blog-config.ts`.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PRIVATE_USERNAME` | No | Username for private area (default: `admin`) |
| `PRIVATE_PASSWORD` | No | Password for private area (default: `password`) |

## Private Area

The `/private` section is protected by cookie-based authentication via middleware. Set `PRIVATE_USERNAME` and `PRIVATE_PASSWORD` environment variables to configure credentials.

## Deployment

Standard Next.js deployment — Vercel is recommended:

```bash
npm run build
npm start
```

## License

Private — all rights reserved.
