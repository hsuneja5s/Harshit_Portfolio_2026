# Portfolio Workflow

Use this checklist when making site changes with Codex.

## Default Loop

1. Read `AGENTS.md` and the files directly affected by the request.
2. Make the smallest complete change that solves the request.
3. If `styles.css` or `script.js` changed, bump all `?v=YYYYMMDD` references.
4. Preview locally:

   ```bash
   python3 -m http.server 3000
   ```

5. Check homepage, one case-study page, one plugin page, light/dark mode, and
   command palette.
6. Share the summary and verification result.
7. Commit and push only when the user explicitly asks.

## Deployment

Normal deployment is GitHub to Vercel:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

Vercel deploys `main` automatically. Manual `vercel deploy` should only be used
when the user asks for a preview or production deploy outside the GitHub flow.

## Design Guardrails

- Keep the existing editorial-clean direction.
- Do not make the site louder just because it is technically possible.
- Use existing components and spacing patterns before adding new primitives.
- Add new visual systems only when the content needs them.
- Keep portfolio credibility higher than visual novelty.
