# TODO

## Blog Styling
Revisit and refine the blog visual design:
- Review color scheme, typography, spacing
- Consider adding reading progress indicator
- Mobile responsiveness polish for code blocks

## Remove Private/Jobs Section
When no longer needed, delete:
- `app/private/` (entire directory)
- `app/api/auth/route.ts`
- `app/api/check-auth/route.ts`
- `app/api/logout/route.ts`
- `middleware.ts` (or update to remove /private route protection)
- Remove `PRIVATE_USERNAME` / `PRIVATE_PASSWORD` references from README
