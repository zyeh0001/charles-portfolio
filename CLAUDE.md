# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/CV website for Charles Yeh, refactored from Create React App to Next.js 16 (App Router) with TypeScript and Tailwind CSS v4. Single-page application with anchor-based navigation.

## Commands

```bash
npm run dev    # Run development server at http://localhost:3000
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Data Flow
All resume content (personal info, work history, education, skills, projects) lives in `lib/content.json` — **this is the only file you need to edit to update content**. `lib/data.ts` imports it and re-exports everything with TypeScript types. All components import from `lib/data.ts`.

### Layout
Single-page app (`app/page.tsx`) with all sections stacked vertically. Navigation uses smooth scroll to anchor IDs (`#projects`, `#experience`, `#skills`, `#about`, `#contact`). No routing — there is only one route (`/`).

### Component Organization
- `components/sections/` — Full-width page sections (Hero, Projects, Experience, Skills, About, Contact). Exported via barrel `components/sections/index.ts`.
- `components/shared/` — Layout/interactive utilities: Navigation, ThemeToggle, SocialLinks, ScrollProgressBar, MouseGlow, ParallaxImage, SectionHeader, ScrollRevealProvider.
- `components/ui/` — Primitive UI components: Button, Card, Badge, Dialog, GlassCard (built with Radix UI + CVA).

### Theme & Styling
Tailwind CSS v4 with CSS custom properties defined in `app/globals.css`. Dark mode default via `next-themes` (class-based). CSS variables follow the shadcn/ui naming convention (`--background`, `--foreground`, `--primary`, etc.) using RGB values without the `rgb()` wrapper. Custom utilities (`.glass`, `.dot-grid`, `.floating-code`, `.press-effect`, `.hover-glow`) are also defined in `globals.css`.

### Fonts
Three Google Fonts loaded via `next/font/google` in `app/layout.tsx`: Space Grotesk (`--font-sans`), Archivo (`--font-heading`), JetBrains Mono (`--font-mono`).

### Key Dependencies
- `next-themes` — Dark/light mode toggle with `class` attribute strategy
- `emailjs-com` — Contact form email sending (no backend required)
- `file-saver` — CV download (resume PDF served from `public/`)
- `lucide-react` — Icon library
- `@radix-ui/react-dialog` — Modal primitive used in project cards
- `clsx` + `tailwind-merge` + `class-variance-authority` — Utility-first class management

### Client Components
All interactive components use `"use client"`. Server components are only `app/layout.tsx` and `app/page.tsx`.

### Resume PDF
The resume PDF is served as a static asset from `public/Charles_Yeh_Resume.pdf`.

## Deployment

Previously deployed to Netlify. The app uses the Next.js App Router and should be deployed with a Node.js runtime target (not static export) to support Next.js features.
