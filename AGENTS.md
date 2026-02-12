# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer blog and portfolio for Buyeon Hwang ("Devlog Alpha"). Built with Astro 5 as a static site (SSG) using MDX for article content.

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build

Package manager: **pnpm**

## Architecture

- **Framework**: Astro 5 with MDX integration, Tailwind CSS v4 (via Vite plugin)
- **Output**: Static site generation (no SSR)
- **Language**: Korean (`lang="ko"`), uses Pretendard Variable font

### Content System

Articles are MDX files in `src/content/articles/`. The content collection is defined in `src/content.config.ts` with this frontmatter schema:

```yaml
title: string (required)
published_at: date (required)
feature_image: string (optional) — enables hero image layout on article page
feature_image_alt: string (optional)
tags: string[] (defaults to [])
excerpt: string (optional)
```

Article slugs are derived from file names. Routes: `/articles/[slug]`, `/articles/tag/[slug]`.

### Key Layout Patterns

- `BaseLayout.astro` — Root layout with dark mode support (class-based, `localStorage`), navbar, footer
- Article pages have two layouts: hero image (when `feature_image` exists) vs. standard header
- Projects data is in `src/data/projects.ts` (static TypeScript array, not a content collection)

### Styling

- Tailwind CSS v4 with custom `brand` color palette (violet-based, defined in `src/styles/global.css`)
- Dark mode uses `.dark` class on `<html>` with `@custom-variant dark`
- Typography in articles uses Tailwind's `prose` classes
