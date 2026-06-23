---
title: "How I Rebuilt My Website with DeepSeek V4 Pro for $2"
date: "2026-06-23"
slug: "ai-powered-personal-website-rebuild"
tags: ["AI", "Web Development", "GitHub Copilot", "Next.js", "Design", "Personal Branding"]
topic: "Web Development"
author: "Reha Tuncer"
---

# How I Rebuilt My Website with DeepSeek V4 Pro for $2

Yesterday I was in a workshop about building AI-powered personal brands using platforms like bolt.new, Canva, Lovable and other similar tools. The premise of these companies is to make one-shot prompts into usable websites, without delving into techinicalities of front-end development. Of course, once the not-so-generous free tokens run out and you are making changes to your landing page, you are invited to subscribe for a $30 per month plan. That's essentially the entire business plan. 

The contents of the workshop were to the point. Creating color palette prompts, maintenance loops, and leading with questions such as *"Three words for how I want my site to feel."* After peer-evaluating my existing [Next.js](https://nextjs.org/) (a React framework) academic website, I couldn't honestly give myself a pat in the back in its current state. A "revision" to the website was long overdue, and I have had my eyes on [A Dictionary of Color Combinations](https://www.goodreads.com/book/show/140534069-a-dictionary-of-color-combinations) by Sanzo Wada to get inspiration for the new color-scheme that would "feel" more like me. Frankly, in the end I can comfartably say that spent most of my time thinking about color combinations that would be acceptable for both light and dark themes.

Today is the National Day in Luxembourg (it's the birthday of someone important) and there is nothing better than finishing my "homework" from the workshop during the heatwave. So I sat down with my trusty GitHub Copilot inside VS Code and rebuilt my website from a standard academic landing page into something that actually "feels" like me.

---

## Starting Point

The old static website consisted of an academic profile page. It had a blurry photo from my defense, five published/working papers, and my university affiliation. It was purely built with functionality in mind. I had recently added a blog, very much inspired from [Simon Willison's Weblog](https://simonwillison.net/), a trusty source from where I get my AI-news. My blog, albeit much cruder than his, had tags with messy colors, inconsistent buttons, and posts that unfortunately blended together visually. It was not a great experience navigating through posts. The only thing on the entire website that "felt" like me was was the low-res favicon (it deserves a TIL post by itself). What's more, my first attempt to implement a color scheme inspired by Sanzo Wada was not quite successful. The dark theme colors didn't match the light theme: I had picked 4 unique colors, one light theme with light glaucous blue + coral red, and the dark theme with oil green + sulphur yellow that simply did not look right.

After some tinkering, I gave Copilot three reference sites that I genuinely enjoyed design-wise and forced one constraint:

- for hover interactions and modern transitions, scrape **arc.net/developers** — 
- for dark theme palette (warm charcoal `#1A1A17`, not cold black), scrape **claude.com/blog**
- for serif headings and typographic "seriousness", scrape **anthropic.com/research** — 
- Use the blue and red from my exisitng light theme, and cream `#DCDDC7` from my existing favicon.

---

## Design Research: What We Scraped

Before writing code, DeepSeek studied the references systematically using scraping tools in Copilot and [Playwright](https://playwright.dev/). Here's what it found and adopted in its own words:

### From claude.com/blog
Claude's blog doesn't use pure black (`#000`) — it uses a **warm charcoal** `#141413` that feels softer and easier on the eyes. Text is **warm cream** `#FAF9F5`, never stark white. Cards are differentiated by **subtle elevation** (+10-15 RGB points above the background), not by borders. Border-radius is generous: `23px` on cards.

> **Takeaway**: A dark theme shouldn't be blue-black. It should be brown-black. Warm tones reduce eye strain and feel more sophisticated.

### From anthropic.com/research
Anthropic uses a **custom serif font** for headings — creating instant academic credibility. The layout breathes with generous whitespace. The nav is minimal chrome — just enough to navigate, not enough to distract.

> **Takeaway**: Serif headings + sans-serif body = academic gravitas without looking like a 1990s university page.

### From arc.net/developers
Arc uses playful gradients and bold color choices. The lesson wasn't the specific colors — it was the **personality**. A personal site should feel personal, not like a template.

> **Takeaway**: The accent color (coral red `#E85D4A`) should be used sparingly but boldly — CTAs, hover states, link underlines.

---

## Major Changes

### 1. Color System Overhaul

The biggest change was replacing the dark theme's cool blue-black with warmer tones.

| Token   | Before                                                                                                                                                                                          | After                                                                                                                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page bg | <span style="display:inline-block;width:14px;height:14px;background:#1C2D3A;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #555"></span> `#1C2D3A` (cool blue-black) | <span style="display:inline-block;width:14px;height:14px;background:#1A1A17;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #444"></span> `#1A1A17` (warm charcoal) |
| Text    | <span style="display:inline-block;width:14px;height:14px;background:#E5E7EB;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #ccc"></span> `#E5E7EB` (cool gray)       | <span style="display:inline-block;width:14px;height:14px;background:#FAF9F5;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #ddd"></span> `#FAF9F5` (warm cream)    |
| Card bg | <span style="display:inline-block;width:14px;height:14px;background:#243744;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #555"></span> `#243744`                   | <span style="display:inline-block;width:14px;height:14px;background:#242421;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #444"></span> `#242421`                 |
| Link    | <span style="display:inline-block;width:14px;height:14px;background:#8EADC9;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #ccc"></span> `#8EADC9`                   | <span style="display:inline-block;width:14px;height:14px;background:#8DB3C7;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #ccc"></span> `#8DB3C7`                 |
| Border  | <span style="display:inline-block;width:14px;height:14px;background:#3A5068;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #555"></span> `#3A5068`                   | <span style="display:inline-block;width:14px;height:14px;background:#333330;border-radius:3px;vertical-align:middle;margin-right:4px;border:1px solid #444"></span> `#333330`                 |

Light theme: cream `#DCDDC7` background, glaucous blue `#5F829E` for links and tags, coral red for accents. 

Crucially, both light and dark themes now share the same coral red accent, which makes the global experience more consistent across both themes.

### 2. Two-Page Split

The old landing page crammed everything into one long scroll, including my blurry profile picture, name, academic papers, and contact information. Based on the feedback from the workshop, I decided to split it and had already created a prototype on [Bolt](https://website-dynamic-reac-2iyp.bolt.host/) during class:

- **`/`**: New landing page with hero bio, research interests, "Explore" section, email call-to-action
- **`/academic`**: Stripped-down version without personal details, only the university affiliation, my email, and academic CV

The core idea is that the landing page and the "hero section" already establishes my identity.

### 3. Navbar Redesign

Three main changes that created the new version:
- **Active state**: Mo more gray background pill, we now have a permanent blue underline with brand color text
- **Mouse Hover**: Underline slides in from center over 250ms, matching Anthropic's exact design pattern
- **Background**: white translucent (`bg-white/90`), not cream, so the nav feels like a separate layer

The favicon now sits next to "Reha Tuncer" in the top-left, because I love how it blends the cream color with my new profile picture and background in light theme.

### 4. Landing Page Feel

> The three words for how I want my site to feel are apperently "warm", "curious", and "capable" according to my AI assistant.

However what was most lacking on my old website, based on actual human feedback, was the interactive feel. So I looked at my examples and took what I liked. What was placeholder cards about my research, now each link to specific papers on `/academic`. On hover, the entire card fills coral red, text turns white, and the card scales up 3%, specifically inspired by [Arc Browser's](https://arc.net/students) download button. Anything that looked clickable but weren't is gone.

The old "View Research" + "Contact" dual-button was replaced with a single "Get in touch" mailto link. A copyright bar was also added.

### 5. Blog Post Card System

This was a concrete and necessary UX improvement. Before, posts were plain rows with no visual separation. This was a fun exercise because I actually asked DeepSeek for some possible implementations, and decided for a combination of two alternatives. Now each post consists of a **card**:

- Rounded border (`rounded-xl`), subtle border color
- Topic badge next to the title
- On hover card lifts slightly, shadow deepens, border shifts to glaucous blue
- All tag colors unified to glaucous blue `#5F829E` across blog, TIL, and paper pages

Filter buttons now show counts "Python (12)", "Math (7)" and match the TIL page style. Both pages use the same hover. In light theme, blue fill with white text, and in dark theme, coral fill with white text.

### 6. Technical stuff

Three fixes made this build more reliable:

**Commit date cache**: In the earlier version, the blog fetched commit dates from GitHub's API with one call per post. Having already 28 posts, successive builds in `dev branch` hit the 60 req/hr rate limit and failed. The solution was to build a local cache (`content/commit-dates.json`) with a 10-second fetch timeout. First build populates it; subsequent builds read from disk with 0 API calls. 16 fallback dates were cleared and refetched, now all 24 entries (fetched from GitHub) have their actual GitHub timestamps.

**Paper tags in global search** — Paper tags (Revealed Preference, Scarcity, Social Capital, etc.) are now merged into the `/tags` page and link directly to their paper anchor on `/academic#paper1`, `/academic#paper2`, etc.

**Favicon quality** — The original `.ico` was upscaled to 64×64, 128×128, and 256×256 PNGs using Python's Pillow. Proper `metadata.icons` in `layout.tsx` for all sizes plus Apple touch icon.

### 7. How much did it all cost?

According to the [DeepSeek Platform usage dashboard](https://platform.deepseek.com/usage), a full day of pair-programming (June 23, 2026) consumed **60.9 million tokens** at a total cost of **$2.23**:

<div style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:16px;padding:20px;margin:16px 0">

**Cost Breakdown — June 23, 2026**

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong>DeepSeek V4 Pro</strong> <span>$2.23</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:20px;overflow:hidden">
    <div style="background:var(--color-accent);height:100%;width:100%;border-radius:6px"></div>
  </div>
</div>

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>DeepSeek Chat & Reasoner</span> <span>$0.00</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:12px;overflow:hidden">
    <div style="background:#9CA3AF;height:100%;width:0%"></div>
  </div>
</div>

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>DeepSeek V4 Flash</span> <span>$0.00</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:12px;overflow:hidden">
    <div style="background:#9CA3AF;height:100%;width:0%"></div>
  </div>
</div>

<hr style="border-color:var(--color-border);margin:16px 0">

**Token Breakdown — 60,914,080 total**

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong>Input (Cache hit)</strong> <span>56,385,024 tokens</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:16px;overflow:hidden">
    <div style="background:var(--color-link);height:100%;width:92.6%;border-radius:6px"></div>
  </div>
</div>

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Input (Cache miss)</span> <span>4,387,442 tokens</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:16px;overflow:hidden">
    <div style="background:var(--color-link);height:100%;width:7.2%;border-radius:6px;opacity:0.7"></div>
  </div>
</div>

<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Output</span> <span>141,614 tokens</span></div>
  <div style="background:var(--color-border);border-radius:6px;height:16px;overflow:hidden">
    <div style="background:var(--color-accent);height:100%;width:0.23%;border-radius:6px"></div>
  </div>
</div>

</div>

The cache-hit ratio is striking, with **92.6% of input tokens were served from cache**. This is seemingy Copilot's context caching at work. It remembers the codebase between turns, so most of the "reading" costs nothing extra. Only 141,614 output tokens were generated (the actual code), at a tiny fraction of a cent per response.

**For comparison**: A single month of Bolt.new starts at \$30, Claude Code starts at \$20, and Lovable is \$20+.


---

## How We Worked Together

The interaction pattern was interesting to note, and may be useful for others:

1. I described what I wanted with reference URLs and a constraints
2. Copilot read the codebase, proposed a specific plan with file-level changes
3. I approved, refined, or redirected iteratively
4. Copilot implemented across multiple files simultaneously (multi_replace)
5. Builds were always verified by both visually (with browser screenshots for DeepSeek)

When things broke (and they break for sure, in even a small scale project like this), with stale build caches, GitHub rate limits, and garbled files from overlapping replacements, existing Copilot tools guide DeepSeek to diagnose and fix them. For example, the `.next` directory was cleared at least five times, and the `node_modules/.cache` directory turned out to be the hidden culprit behind "Cannot find module ./611.js" errors.

**Copilot tools I used**: File reading/editing (replace_string_in_file, multi_replace), terminal commands (npm build, Python scripts, sed), browser automation (Playwright for screenshots and element inspection), semantic code search, grep patterns, `fetch_webpage` for design research.

---

## Conclusion & What's Next

I am frankly very happy with the result. Cost-to-performance ratio of DeepSeek V4 Pro is simply unmatched. [Artificial Analysis Intelligence vs. Cost per Intelligence Index Task](https://artificialanalysis.ai/models/?cost=intelligence-vs-cost-per-task#cost-tabs) confirms this. DeepSeek V4 Pro sits at the top-left of the chart, delivering near-frontier model quality at a fraction of the price. While Claude/ChatGpt folks may say how they could have done this in one-shot under 1-hour, with their "super-intelligent" models, I actually prefer this level of "intelligence" for a few cents a day. My Copilot setup allows me to have granular control over file changes, progress at my pace, all the while sharing URLs, screenshots, web elements, have discussions and implement almost anything I want for a fraction of the cost of Claude Code/Lovable/Bolt/ChatGPT style subscriptions. 

My next steps will be:
1- Populating the website with portfolio projects using the Module 4 template, and revisiting it next month
2- Filling TIL's and blog posts as usual

---

*Built with GitHub Copilot (DeepSeek V4 Pro) on Next.js 15.5. Static export with `output: 'export'`, deployed to Vercel. 157 pages, 29 search-index entries, 24 cached blog post dates. [Source on GitHub](https://github.com/reha96/website).*
