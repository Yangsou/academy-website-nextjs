# Ai+Di Company Website

> **Ai that reflects. Not replaces.**

Building Ai that reflects human consciousness and enhances our potential for
conscious living in the digital age.

A high-performance [Next.js](https://nextjs.org/) website for Ai+Di Company,
featuring modern design, advanced optimizations, and a conscious approach to AI
technology.

## About Ai+Di

Ai+Di (Ai that reflects. Not replaces.) is dedicated to developing AI systems
that enhance human wisdom, creativity, and connection. We create tools that
respect human agency, promote well-being, and foster communities where
technology serves humanity's highest aspirations while preserving what makes us
uniquely human.

## Features

### Design & UX

- **Modern Design**: Clean, dark theme with cyan and blue accents
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth animations and hover effects using Framer
  Motion
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML

### Performance Optimizations

- **SWR Caching**: Stale-while-revalidate strategy for instant page navigation
  - 95-98% faster cached page loads
  - 25-33% fewer API requests through automatic deduplication
- **Virtual Scrolling**: Efficient rendering of long article lists
  - 90% memory reduction for lists with 1000+ items
  - Constant 60fps scrolling performance
- **Image Optimization**: Next.js Image component with automatic WebP/AVIF
  conversion
  - 40-60% smaller image payloads
  - Lazy loading and responsive sizing
- **Error Boundaries**: Graceful error handling prevents app crashes
- **Code Splitting**: Lazy loading for heavy components reduces initial bundle
  by 15-25%

### Content Management

- **Blog System**: Dynamic blog with categories and article management
- **Strapi Integration**: Headless CMS for content management
- **Contact Forms**: Built-in forms with validation

## Technology Stack

### Core

- **Framework**: Next.js 14 with App Router
- **Runtime**: Node.js ≥20.19 (required for dependencies)
- **Language**: TypeScript with strict mode

### Styling & UI

- **Styling**: Tailwind CSS + shadcn/ui with design tokens in `app/globals.css`
- **UI Conventions**: Tailwind's `font-sans` and `font-display` map to the
  custom Prompt and Space Grotesk font faces declared in `styles/fonts.css`.
  Extend tokens by editing `tailwind.config.mjs` (colors, radius, keyframes) and
  keep shadcn component updates in sync via `components.json`.
- **Component Scaffolding**: Generate new shadcn/ui primitives via
  `pnpm dlx shadcn@latest add <component>`; they arrive pre-wired to the design
  tokens above.
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Component Library**: Custom shadcn/ui components

### Data Fetching & State

- **SWR**: Stale-while-revalidate caching for API responses
- **CMS**: Strapi headless CMS integration

### Performance

- **Virtual Scrolling**: react-window for efficient list rendering
- **Image Optimization**: Next.js Image with automatic optimization
- **Code Splitting**: Dynamic imports with React.lazy

## Getting Started

### Prerequisites

- **Node.js ≥20.19** (required for dependencies)
- npm, yarn, or pnpm package manager

To check your Node.js version:

```bash
node -v
```

If you need to update Node.js, use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 20.19
nvm use 20.19
nvm alias default 20.19
```

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd aidi-company-site-nextjs
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables (if needed):

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Workflow

- **Formatting & Linting**: Use `pnpm format` to apply Prettier and `pnpm lint`
  for ESLint checks. To automatically fix lint issues run `pnpm fix`.
- **Type Safety**: Run `pnpm type-check` before pushing to ensure the codebase
  stays type-safe.
- **Preflight QA**: Execute `pnpm check` locally before opening a PR; it runs
  the formatting check, zero-warning lint, and type-check in sequence.
- **Git Hooks**: Husky installs pre-commit (lint-staged), commit-msg
  (commitlint), and pre-push (typecheck) hooks. If hooks do not run, execute
  `pnpm prepare` once to reinstall them.
- **Commit Messages**: Follow the
  [Conventional Commits](https://www.conventionalcommits.org/) spec (e.g.,
  `feat: add hero section animation`) using one of
  `build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|types`. Hooks
  will reject non-compliant commits.

## Project Structure

```
aidi-company-site-nextjs/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (categories, articles, contact)
│   ├── blog/                 # Blog pages
│   │   └── [slug]/          # Dynamic article pages
│   ├── layout.tsx           # Root layout with SWRProvider
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── providers/           # Context providers (SWR)
│   ├── ui/                  # shadcn/ui components
│   ├── error-boundary.tsx   # Error boundary component
│   └── virtual-article-list.tsx  # Virtual scrolling component
├── lib/                     # Utility functions
│   ├── hooks/               # Custom React hooks
│   │   └── use-blog-data.ts # SWR hooks for blog data
│   ├── blog-helpers.ts      # Blog utility functions
│   └── swr-config.ts        # SWR global configuration
├── types/                   # TypeScript type declarations
│   └── react-window.d.ts    # Temporary types for react-window
├── public/                  # Static assets
│   └── aidi-logo-horizontal.svg
├── styles/                  # Global styles
│   ├── fonts.css            # Custom font declarations
│   └── globals.css          # Global CSS and Tailwind
└── docs/                    # Documentation
    ├── HIGH_PRIORITY_OPTIMIZATIONS_COMPLETE.md
    ├── MEDIUM_PRIORITY_OPTIMIZATIONS.md
    └── OPTIMIZATIONS_SUMMARY.md
```

## Performance Documentation

Comprehensive performance optimization guides are available in the repository:

- **[OPTIMIZATIONS_SUMMARY.md](./OPTIMIZATIONS_SUMMARY.md)** - Complete overview
  of all optimizations and action plan
- **[HIGH_PRIORITY_OPTIMIZATIONS_COMPLETE.md](./HIGH_PRIORITY_OPTIMIZATIONS_COMPLETE.md)** -
  Details on image optimization, error boundaries, and lazy loading
- **[MEDIUM_PRIORITY_OPTIMIZATIONS.md](./MEDIUM_PRIORITY_OPTIMIZATIONS.md)** -
  SWR implementation guide and virtual scrolling setup

### Performance Metrics

After implementing all optimizations:

- **Initial Load**: 40-50% faster
- **Cached Navigation**: 95-98% faster (instant!)
- **Memory Usage**: 60-90% reduction
- **API Requests**: 30% fewer
- **Bundle Size**: 15-25% smaller

## Learn More

### Technologies Used

- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [Framer Motion Documentation](https://www.framer.com/motion/) - Animations
- [SWR Documentation](https://swr.vercel.app/) - Data fetching and caching
- [react-window Documentation](https://react-window.vercel.app/) - Virtual
  scrolling
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Component library

## Deployment

This project is optimized for deployment on Vercel, but can be deployed to any
platform that supports Next.js applications.

### Build Command

```bash
npm run build
```

### Environment Variables

Configure the following environment variables in your deployment platform:

- `NEXT_PUBLIC_STRAPI_API_URL` - Strapi CMS API URL (if using Strapi)
- `NEXT_PUBLIC_GA_TRACKING_ID` - Google Analytics tracking ID (optional)

## Contributing

When contributing to this project:

1. Follow the [Conventional Commits](https://www.conventionalcommits.org/)
   specification for commit messages
2. Run `npm run check` before committing to ensure all checks pass
3. Update tests and documentation as needed
4. Keep performance optimizations in mind

## License

This project is proprietary and confidential to Ai+Di Company.

## Contact

For questions about this project or Ai+Di Company:

- **Website**: [https://aidi.world](https://aidi.world)
- **Email**: contact@aidi.world
- **Location**: Ho Chi Minh City, Vietnam
