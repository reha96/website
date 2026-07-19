---
title: "Auditing AI-generated code with Open Code Review"
date: "2026-07-19"
tags: ["code-review", "ai", "open-code-review", "opencode", "security", "automation"]
---

# Auditing AI-generated code with Open Code Review

For a while I have been thinking about the future of software, and it all started like this. Couple of weeks ago, for a reason I still don't know exactly (apart from using DeepSeek in Chat mode), I used up all my GitHub Copilot free credits. This made me install [OpenCode](https://github.com/anomalyco/opencode). Until this point I was mostly verifying changes in my repositories one-by-one, and with all honesty approving most changes even if I would not understand all. But I still had the final say. Within a couple minutes after plugging my DeepSeek API key to OpenCode, I realized the changes now happen at a speed I cannot even catch-up with. Granular file permissions are done for, now you have multiple sub agents making edits to files in parallel. This made me despair first, but I eventually realized for projects that are not critical; this could be the way to go. Unless, there is a way to ''audit'' what the swarm of edits have done to the codebase.

This when I stumbled upon [Open Code Review](https://github.com/alibaba/open-code-review), a self-proclaimed skill (set of instructions) said to be used by Alibaba engineers for the very same problem of going through the codebase, either commit by commit, or through its entirety to look for bugs. If code is written at rates magnitudes faster than our perception, even the best ''human'' coders will struggle to keep up. Maybe this is the solution.

I ran a full `ocr scan` (45 files) on this website, which is a Next.js static site. Here's what came back:

- **3 XSS vulnerabilities**: `rehypeRaw` without sanitization in the markdown renderer letting raw HTML through; `dangerouslySetInnerHTML` in search result excerpts; unsanitized URL parameters rendered directly in tag page templates.
- **2 runtime crashes**: `abstracts["paper1"].text` blowing up because paper IDs didn't match between the home page and the data source; a heading deduplication key lookup bug that could produce conflicting anchor IDs.
- **12+ pages with no error handling**: nearly every async page component lacked try/catch — any GitHub API failure would = a 500 error with no fallback UI.
- **Performance**: `getBlogPost()` fetching every single blog post from GitHub just to rewrite cross-reference links for a single page.
- **Misc**: timezone bug showing the wrong date for UTC-negative visitors, a duplicate tag causing lost paper-to-tag mapping, dead imports, accessibility gaps (missing ARIA attributes), silent error swallowing in 3 search-index catch blocks.

45 files, 30+ issues, scanned in about a minute. The AI wrote the code, another AI audited it. This is our new reality.
