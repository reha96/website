# TODO

## Blog Styling
Revisit and refine the blog visual design:
- Review color scheme, typography, spacing
- Mobile responsiveness polish for code blocks

## Security Vulnerabilities
Fix known vulnerabilities in dependencies:
- Next.js 14 → 15.5.10+ (major upgrade, breaking changes)
- React 18 → 19 (required by Next 15)
- Transitive deps: minimatch, flatted, picomatch, postcss (via `overrides`)

## Paper Abstracts from .tex Files
Replace hardcoded abstracts in `app/page.tsx` with dynamically fetched ones:
- Fetch `.tex` from `reha96/autoplay-clean` (writing/main.tex)
- Fetch `.tex` from `reha96/skills-clean` (writing/current/manuscript.tex)
- Fetch `.tex` from `reha96/icfes-referrals-clean` (writing/manuscript.tex)
- Parse `\begin{abstract}...\end{abstract}`
- Build-time SSG fetch (same pattern as blog README pipeline)

## Remove Private/Jobs Section
When no longer needed, delete:
- `app/private/` (entire directory)
- `app/api/auth/route.ts`
- `app/api/check-auth/route.ts`
- `app/api/logout/route.ts`
- `middleware.ts` (or update to remove /private route protection)
- Remove `PRIVATE_USERNAME` / `PRIVATE_PASSWORD` references from README
