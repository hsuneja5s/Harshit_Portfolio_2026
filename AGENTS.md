# Codex Project Guide

This repo is a personal portfolio for Harshit Suneja at `sunejaux.space`.
Treat this file as the working memory for Codex and other coding agents.

## Project Shape

- Static portfolio site: hand-written HTML, one global CSS file, one JS file.
- No framework, no bundler, no build step.
- Hosted on Vercel. GitHub pushes to `main` auto-deploy.
- Local preview: `python3 -m http.server 3000` or `npx serve -p 3456 .`.
- Main files:
  - `index.html`: homepage.
  - `styles.css`: all layout, theme tokens, components, responsive rules.
  - `script.js`: theme toggle, command palette, scroll-spy behavior.
  - `work/*.html`: case studies.
  - `plugins/*.html`: AI/Figma plugin pages.
  - `sitemap.xml`, `robots.txt`, `vercel.json`: SEO and deploy config.

## Design Direction

Keep the site restrained, editorial, and portfolio-first. The target feel is
senior product designer with design-engineering fluency, not a flashy AI demo.

Preserve these rules:

- Do not add a framework or build step without explicit approval.
- Keep styles in `styles.css`; do not fragment CSS unless explicitly asked.
- Match the existing typography scale, spacing density, and quiet visual tone.
- Avoid oversized cards, heavy gradients, decorative blobs, emoji, novelty UI,
  and marketing-page hero treatments.
- Use images, screenshots, or existing assets when a visual is needed.
- Case studies should not all share the same middle structure. Shape each page
  around the story and constraints of that project.
- Status pills were intentionally removed site-wide; do not reintroduce them.
- Copy should be direct, senior, specific, and low-hype.

## Content Rules

- Much of the current case-study content is plausible draft content. Do not
  invent new metrics, timelines, team sizes, or client-sensitive details.
- If a requested change needs a real number or confidential project detail, ask
  or mark it as a placeholder.
- Keep NDA-sensitive government, banking, healthcare, and enterprise work
  anonymized unless the owner provides exact publishable language.
- Prefer "In brief" over "TL;DR". Preserve existing `#tldr` anchors.

## Asset Rules

- Real screenshots should go under `images/work/` or `images/plugins/`.
- Aim for WebP/JPG/PNG assets that are visually inspectable and lightweight.
- If replacing images referenced from HTML, update paths and alt text together.
- If changing CSS/JS references, follow the cache-busting rule below.

## Deployment Rules

- Vercel auto-deploys on every push to `main`.
- `vercel.json` intentionally separates cache rules:
  - CSS/JS: short cache with revalidation.
  - Images/fonts: long immutable cache.
- When editing `styles.css` or `script.js`, bump every HTML reference query
  string such as `?v=YYYYMMDD` so deployed users do not see mixed assets.
- Do not deploy or push unless the user explicitly asks for `push`, `deploy`,
  or gives equivalent approval in the current conversation.

## QA Checklist

Before proposing a push, run a local static server and check:

- Homepage loads with no console-breaking behavior.
- At least one `work/` page and one `plugins/` page load.
- Light and dark themes work.
- Command palette opens and links are still valid.
- Mobile width does not overlap key text or navigation.
- Any edited page has correct title, meta description, canonical URL, and
  sitemap entry if it is new.

## Git Workflow

- Work on the current branch unless the user asks for a new branch.
- Keep changes scoped to the request.
- Do not revert user changes or unrelated edits.
- Commit messages should be plain and specific, for example:
  `Tighten plugin card spacing` or `Add public-sector content placeholders`.
- Push to `main` only after local verification and explicit user approval.

## Current Priorities

- Vet case-study content line by line before serious outreach.
- Add real project and plugin screenshots.
- Create a proper 1200x630 OG image.
- Consider a gated deeper public-sector case-study version later.
- Defer Arabic localization until the owner asks for it.
- Do cross-browser and device QA after real content lands.
