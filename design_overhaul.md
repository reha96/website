# Dark Theme Design Overhaul

**Date**: 2026-06-23  
**Inspiration**: [arc.net/developers](https://arc.net/developers), [claude.com/blog](https://claude.com/blog), [anthropic.com/research](https://www.anthropic.com/research)  
**Goal**: Redesign the dark theme of rehatuncer.com using design patterns from industry-leading dark-themed sites

---

## 1. Research — What We Found

### 1.1 arc.net/developers (The Browser Company)

| Property | Value | Takeaway |
|---|---|---|
| Body bg | `rgb(255, 252, 236)` — warm cream | **Light theme**, but the *warmth* is the lesson |
| Font | `Marlin` (custom) + system sans-serif | Custom fonts create brand identity |
| H1 | `45.5px`, `700` weight, cream on dark hero banner | Bold hero section with strong contrast |
| Nav | Transparent bg, sits over hero | Overlay nav pattern |
| Overall feel | Playful, gradient-heavy, modern | Personality through bold color choices |

### 1.2 claude.com/blog (Anthropic Blog — PRIMARY INSPIRATION)

| Property | Computed Value | Hex Equivalent | Takeaway |
|---|---|---|---|
| **Body background** | `rgb(20, 20, 19)` | `#141413` | Warm near-black, NOT pure `#000` |
| **Body text** | `rgb(250, 249, 245)` | `#FAF9F5` | Warm off-white, NOT pure `#FFF` |
| **Card background** | `rgb(31, 30, 29)` | `#1F1E1D` | +11 RGB points above body for subtle elevation |
| **Accent color** | `rgb(217, 119, 87)` | `#D97757` | Warm terracotta/orange — similar to our coral red |
| **Font** | `"Anthropic Sans", Arial, sans-serif` | — | Custom geometric sans-serif |
| **Card border-radius** | `23px` | — | Very rounded — soft, approachable feel |
| **H1** | `19.9px`, weight `600` | — | Modest heading size, letting layout breathe |

**Key insight**: Claude's dark theme uses WARM tones throughout. The background is a warm charcoal (brown-black, not blue-black). Text is warm cream. Cards have subtle warmth. The accent (terracotta) is earth-toned, not electric.

### 1.3 anthropic.com/research (Layout & Typography Inspiration)

| Property | Computed Value | Takeaway |
|---|---|---|
| Body bg | `rgb(250, 249, 245)` | Light theme — same warm palette, inverted |
| **Font** | `anthropicSerif` (custom serif) | **Serif for headings** gives gravitas |
| Nav bg | `rgb(250, 249, 245)` | Clean, minimal chrome |
| Layout | Generous whitespace, card grid | Airy, not cramped |

**Key insight**: Anthropic mixes a custom serif for headings with sans-serif for body — this creates visual hierarchy and academic credibility. For an academic website (rehatuncer.com), this is highly relevant.

---

## 2. Design Principles — What We're Adopting

### Principle 1: Warm Dark Palette
Claude's blog doesn't use pure black (`#000`) or cool blue-blacks. It uses a **warm charcoal** (`#141413`) that feels softer and more sophisticated. Our dark theme will shift from cool glaucous blue-black (`#1C2D3A`) to a warm charcoal.

### Principle 2: Subtle Elevation
Cards aren't differentiated by borders — they use **slightly lighter backgrounds** (+10-15 RGB points). This creates depth without visual noise. No `border-*` classes on cards.

### Principle 3: Generous Border Radius
Claude uses `23px` border-radius on cards. We'll adopt `xl` / `2xl` rounding (`12px`-`16px`) for cards, buttons, and inputs — moving away from sharp corners.

### Principle 4: Warm Off-White Text
Not `#FFFFFF` — instead `#FAF9F5` (cream-white). This reduces eye strain and feels more natural on dark backgrounds.

### Principle 5: Typography Hierarchy
Anthropic Research uses serif headings + sans-serif body. For an academic site, we should consider:
- **Headings**: Serif or semi-serif for authority
- **Body**: Inter (already loaded) — clean sans-serif for readability

### Principle 6: Personality Through Accent
Claude's terracotta accent adds warmth and memorability. Our coral red (`#E85D4A`) serves the same role — keep it bold and used sparingly for CTAs, links, highlights.

---

## 3. Proposed Color Palette

### Dark Theme (Overhauled)

| Token | Current | Proposed | Rationale |
|---|---|---|---|
| `--color-bg` | `#1C2D3A` (cool blue-black) | `#1A1A17` (warm charcoal) | Warmer, matches Claude's approach |
| `--color-bg-secondary` | `#243744` | `#242421` | Subtle card elevation |
| `--color-bg-tertiary` | `#2D4255` | `#2E2E2B` | Hover/focus states |
| `--color-text` | `#e5e7eb` | `#FAF9F5` | Warm off-white |
| `--color-text-secondary` | `#9ca3af` | `#A8A6A0` | Muted warm gray |
| `--color-text-muted` | `#6b7280` | `#6E6D68` | Very muted |
| `--color-border` | `#3A5068` | `#333330` | Subtle, near-background |
| `--color-primary` | `#789BB9` | `#7BA0B5` | Slightly warmer blue |
| `--color-primary-hover` | `#8EADC9` | `#8DB3C7` | Warmer hover |
| `--color-accent` | `#E85D4A` | `#E85D4A` | **Keep** — already perfect |
| `--color-accent-hover` | `#F07060` | `#F07060` | **Keep** |
| `--color-link` | `#8EADC9` | `#8DB3C7` | Readable warm blue |
| `--color-code-bg` | `#243744` | `#2A2A27` | Warm dark for inline code |
| `--color-code-text` | `#F09787` | `#F09787` | Muted coral — **keep** |
| `--color-blockquote-bg` | `#243744` | `#242421` | Match card bg |
| `--color-blockquote-border` | `#E85D4A` | `#E85D4A` | Coral accent — **keep** |
| `--color-blockquote-text` | `#d1d5db` | `#D4D2CB` | Warm light gray |
| `--color-pre-bg` | `#151F29` | `#12120F` | Deepest warm for code blocks |
| `--color-pre-text` | `#e2e8f0` | `#E8E6DF` | Warm for code |
| `--color-table-header-bg` | `#243744` | `#242421` | Match card bg |

### Accent-adjacent (for tags, badges, hover states)

| Element | Current | Proposed |
|---|---|---|
| Tag badges | `bg-glaucous-800` | `bg-[#2E2A27]` (warm dark) |
| Active nav | `bg-glaucous-800` | `bg-[#2E2A27]` |
| Topic buttons | `bg-glaucous-800` | `bg-[#2E2A27]` |
| Search dialog bg | `bg-glaucous-900` | `bg-[#1F1E1B]` |
| Navbar bg | `bg-glaucous-950/90` | `bg-[#1A1A17]/90` |

---

## 4. Typography Plan

### Current
- `Inter` for everything (body + headings)
- Heading sizes: h1 `text-3xl`, h2 `text-2xl`, h3 `text-xl`

### Proposed
- **Body**: `Inter` (keep — excellent readability)
- **Headings**: Consider adding a **serif** for h1/h2 to add academic gravitas (matching Anthropic Research's approach)
  - Option A: `Georgia` (system serif, no extra download)
  - Option B: `Playfair Display` (Google Fonts, elegant)
  - Option C: Keep `Inter` but increase weight contrast
- **Heading sizes**: Keep current scale, add more letter-spacing for uppercase labels

### Font Loading
If adding a serif heading font:
```html
<!-- In layout.tsx -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
```
Then in Tailwind:
```js
fontFamily: {
  serif: ['Playfair Display', 'Georgia', 'serif'],
  sans: ['Inter', ...],
}
```

---

## 5. Layout & Spacing

### From anthropic.com/research:
- Generous whitespace between sections (`py-16` to `py-24`)
- Cards in a clean grid with consistent gaps
- Max-width content areas (~`max-w-5xl` or `max-w-6xl`)

### Proposed changes:
| Element | Current | Proposed |
|---|---|---|
| Page max-width | `max-w-4xl` (896px) | `max-w-5xl` (1024px) — more breathing room |
| Section spacing | `mb-16` | `mb-20` or `mb-24` |
| Card padding | `p-6` | `p-8` — more generous |
| Card border-radius | `rounded-lg` (8px) | `rounded-2xl` (16px) — softer, Claude-like |
| Paper card border | `border-l-4` (left accent) | `border-l-4` (keep — distinctive) |
| Nav height | `h-14` | `h-16` — slightly taller |

---

## 6. Component-Specific Changes

### 6.1 Navbar
- **Background**: `bg-[#1A1A17]/90` with `backdrop-blur-md` (stronger blur)
- **Border**: Remove or make extremely subtle (`border-[#2A2A27]`)
- **Active link**: `bg-[#2E2A27]`, text `#FAF9F5`
- **Logo/name**: Slightly larger, could use serif font
- **Theme toggle**: More refined icon, subtle hover

### 6.2 Paper Cards (Homepage)
- **Border-radius**: `rounded-2xl` (16px) — unified with other cards
- **Background**: `bg-[#242421]` (warm elevation)
- **Hover**: Subtle glow or lift (1-2px translate-y)
- **Accent border**: Coral red `border-l-4` — keep as-is, it's distinctive
- **Title links**: Coral red on hover, not default — makes interaction feel more deliberate

### 6.3 Blog Post Cards (Blog Index)
- **Year dividers**: Thinner, more subtle (`border-[#333330]`)
- **Post titles**: Keep glaucous blue for identity, lighten on hover
- **Date**: Muted warm gray, monospace feel
- **Tags**: Smaller, warmer bg (`bg-[#2E2A27]`)

### 6.4 Blog Post Page
- **TOC sidebar**: Keep, but soften border
- **Reading progress bar**: Coral-to-coral gradient, thinner (2px)
- **Code blocks**: Warm dark bg (`#12120F`), cream text
- **Blockquotes**: Warm bg with coral left border
- **Inline code**: Warm bg with muted coral text

### 6.5 Tags & TIL Pages
- **Topic/tag buttons**: `rounded-xl`, warm bg, hover lightens
- **Active filter**: Coral bg (`bg-coral-500 text-white`) — strong contrast
- **Tag cloud**: More spacing between items

### 6.6 Search Dialog
- **Backdrop**: Stronger blur + darker overlay
- **Dialog bg**: `bg-[#1F1E1B]`, `rounded-2xl`
- **Input**: No border, focus ring only
- **Results**: Subtle hover state (`bg-[#2A2A27]`)

---

## 7. Color Reference Table

### Warm Dark Palette (All Hex Values)

```
Darkest (pre/code bg):    #12120F
Page background:           #1A1A17
Card/secondary bg:         #242421
Hover/tertiary bg:         #2E2E2B
Border:                    #333330
Muted text:                #6E6D68
Secondary text:            #A8A6A0
Primary text:              #FAF9F5
Blockquote text:           #D4D2CB
Code text (light):         #E8E6DF

Primary (warm blue):       #7BA0B5
Primary hover:             #8DB3C7
Link:                      #8DB3C7
Accent (coral):            #E85D4A
Accent hover:              #F07060
Inline code text (coral):  #F09787
```

---

## 8. Execution Plan

### Phase 1: Color Overhaul (globals.css)
1. Replace ALL `:root .dark` CSS variables with the warm palette (Section 7)
2. Update `tailwind.config.ts`:
   - Add warm charcoal color scale
   - Replace glaucous dark variants with warm equivalents
   - Keep coral and glaucous light scales
3. Global find-and-replace: `glaucous-9*`, `glaucous-8*`, `glaucous-7*` in dark variants → new warm classes

### Phase 2: Component Updates
1. **Navbar**: Update bg, active states, blur strength
2. **Home page cards**: Update border-radius, bg, hover effects
3. **Blog index**: Card bg, title hover colors, year dividers
4. **Blog post**: TOC, progress bar, code blocks, blockquotes
5. **Tags/TIL pages**: Button styles, active states
6. **Search dialog**: Backdrop, dialog bg, input styling

### Phase 3: Typography (Optional — requires discussion)
1. Decide: Add serif heading font or keep Inter-only?
2. If adding: Google Fonts import + Tailwind config
3. Apply serif to h1, h2 across all pages

### Phase 4: Polish
1. Card hover animations (subtle lift)
2. Smooth transitions on theme toggle
3. Consistent border-radius audit
4. Spacing audit (section gaps, card padding)

---

## 9. Files to Modify

| File | Changes |
|---|---|
| `app/globals.css` | Complete `.dark` block replacement |
| `tailwind.config.ts` | Add warm color scale, update dark aliases |
| `components/navbar.tsx` | Nav bg, active states, blur |
| `components/home-page.tsx` | Card radius, bg, hover |
| `components/blog-index-client.tsx` | Card bg, title hover, dividers |
| `components/markdown-renderer.tsx` | (Handled via globals.css) |
| `components/table-of-contents.tsx` | Border colors |
| `components/reading-progress.tsx` | Progress bar colors, height |
| `components/search-dialog.tsx` | Bg, backdrop, input |
| `components/theme-toggle.tsx` | Icon refinement |
| `app/tags/*.tsx` | Button bg, active states |
| `app/til/*.tsx` | Button bg, card styles |
| `app/blog/**/page.tsx` | Divider, tag link colors |

---

## 10. Discussion Points (Before Implementation)

1. **Serif headings?** Anthropic Research uses serif for academic credibility. For an academic economics site, this could elevate the perceived quality. But it adds font download weight. Worth it?

2. **Border-radius: how round?** Claude uses ~23px (very round). We could go `rounded-2xl` (16px) or `rounded-3xl` (24px). More round = softer, friendlier. Less round = more formal. For an academic site, `rounded-2xl` (16px) strikes the balance.

3. **Card hover effects?** Subtle lift (`translate-y-[-2px]` + shadow) or color shift? Lift feels more premium but adds complexity.

4. **Keep the `border-l-4` accent on paper cards?** It's a distinctive element from the current design. I vote: keep it, but make it coral red on dark bg for strong identity.

5. **Newsletter/subscribe banner?** Claude.com has a newsletter CTA banner. Should we add something similar for GitHub Sponsors or email list?
