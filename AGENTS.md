# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer blog ("Devlog Alpha") for Buyeon Hwang, built with Astro 5 and Tailwind CSS 4. Articles are sourced from a Ghost CMS instance via the Content API. The site is statically generated (SSG).

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build (static output)
- `pnpm preview` — Preview production build locally

Package manager is **pnpm** (see `pnpm-lock.yaml`).

## Architecture

### Content Sources

- **Articles**: Fetched at build time from Ghost CMS via `@tryghost/content-api`. The client is configured in `src/lib/ghost.ts`. Environment variables `API_URL` and `CONTENT_API_KEY` control the Ghost instance (defaults to Ghost demo site).
- **Projects**: Static data defined in `src/data/projects.ts` (typed `Project[]` array).

### Routing & Pages

- `/` — Landing/intro page
- `/articles` — Article list with tag sidebar, posts fetched from Ghost
- `/articles/[slug]` — Individual article (uses `getStaticPaths` from Ghost posts)
- `/articles/tag/[slug]` — Articles filtered by tag (uses `getStaticPaths` from Ghost tags)
- `/projects` — Project showcase from static data

### Layout System

`BaseLayout.astro` is the single shared layout. It accepts:
- `title` (required), `description`, `transparentNavbar` props
- A named `hero` slot for full-bleed content above `<main>` (used by article detail pages with feature images)

### Styling

- Tailwind CSS 4 via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`)
- Custom `brand` color palette (purple-based, 50–950) defined as CSS custom properties in `src/styles/global.css` using `@theme`
- Fonts: Inter (body via `@fontsource/inter`), Fira Mono (logo via `@fontsource/fira-mono`)

### Navbar Behavior

The navbar (`src/components/Navbar.astro`) has two modes:
- **Standard**: Sticky, white background with blur
- **Transparent**: Fixed, transparent at top, transitions to standard style on scroll (controlled by `data-transparent` and `data-scrolled` attributes with client-side JS)

Navigation labels are in Korean (소개, 프로젝트, 게시글).

## Environment Variables

Set in `.env` (not committed patterns may vary):
- `API_URL` — Ghost CMS URL
- `CONTENT_API_KEY` — Ghost Content API key
