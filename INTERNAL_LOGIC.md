# INTERNAL_LOGIC.md

This repo is built around a Single Source of Truth (`APP_CONFIG`) that drives identity and marketing-level UI while preserving the “chassis” backend (Auth + Stripe webhooks + subscription flows). During rendering, `APP_CONFIG` flows from the config wrapper (`config/app-config.ts`) into the root layout (`app/layout.tsx`) where metadata and runtime CSS variables are injected. From there, identity-driven UI components (Hero/Features/Nav/Footer) read from the same config, and docs/blog metadata is updated via token replacement in both compile-time MDX and runtime page rendering.

---

## Mental Model: What is “App Factory” in this codebase?

1. **Identity + theming** are defined in `src/config/app-config.ts` as a strictly typed `APP_CONFIG`.
2. The **import alias** used throughout the app is `@/config/app-config`, which is implemented by `config/app-config.ts`.
3. At runtime, `app/layout.tsx` converts the configured hex colors into CSS variables (`--primary`, `--secondary`, `--radius`) so Tailwind’s theme tokens update without requiring a Tailwind rebuild.
4. Marketing UI components then “read config” (text + icons) directly from `APP_CONFIG`, producing a generic but cohesive app identity.

---

## Data Flow Map

### 1. The Head: Metadata and SEO tags (`app/layout.tsx`)

Source of truth:

- `src/config/app-config.ts` (export: `APP_CONFIG.metadata` and `APP_CONFIG.branding`)
- imported by `config/app-config.ts` (currently hot-swap capable)

Where it lands:

- `app/layout.tsx` exports `metadata: Metadata`.

Mechanics:

- `app/layout.tsx` sets:
  - `metadata.title` default/template using `APP_CONFIG.metadata.title`
  - `metadata.description` using `APP_CONFIG.metadata.description`
  - `metadata.authors[0].name` and `.url` using `APP_CONFIG.metadata.name` and `.url`
  - `openGraph.url/title/description/siteName` using the config’s metadata values
  - `twitter.title/description/images/creator` using the config’s metadata/ogImage
  - `icons.icon` using `APP_CONFIG.branding.faviconPath`
  - `manifest` using `APP_CONFIG.metadata.url`

Important implication:

- Changing the app name (or og image URLs) in `src/config/app-config.ts` updates the `<head>` output for the whole app (since `app/layout.tsx` is the root layout).

---

### 2. The Skin: Hex colors -> CSS Variables -> Tailwind (`app/layout.tsx` + `tailwind.config.js`)

Source of truth:

- `APP_CONFIG.theming.primaryColor` (hex string)
- `APP_CONFIG.theming.secondaryColor` (hex string)
- `APP_CONFIG.theming.borderRadius` (string value)

Where it lands:

- `app/layout.tsx` computes HSL triplets via `hexToHslTriplet(...)` and injects a `<style>` tag into `<head>` that defines:
  - `:root { --primary: ...; --secondary: ...; --radius: ... }`
  - `.dark { --primary: ...; --secondary: ...; --radius: ... }`

How Tailwind consumes it:

- `tailwind.config.js` maps semantic Tailwind colors to CSS variables:
  - `primary.DEFAULT: 'hsl(var(--primary))'`
  - `secondary.DEFAULT: 'hsl(var(--secondary))'`
  - `borderRadius.lg: 'var(--radius)'`, and derived radii via `calc(...)`

What is *not* fully swapped:

- The repo’s `styles/globals.css` defines additional CSS variables such as `--primary-foreground`, `--secondary-foreground`, `--background`, etc.
- Right now, the runtime injection from `app/layout.tsx` specifically overwrites `--primary`, `--secondary`, and `--radius`; it does not compute/override the “foreground” variants.

Operational implication:

- Identity theme color changes propagate widely because Tailwind tokens like `bg-primary`, `text-primary`, `border-primary`, and `rounded-lg` read from these variables.

---

### 3. The Body: Hero, Features, Pricing (config-driven where implemented)

Hero (marketing):

- Component: `components/landing-page/hero.tsx`
- Reads from:
  - `APP_CONFIG.metadata.description` for the small pill/label
  - `APP_CONFIG.content.heroTitle` and `APP_CONFIG.content.heroSubtitle`
- Template replacement:
  - The config heroTitle supports `{{APP_NAME}}`.
  - `hero.tsx` calls `applyAppTemplate(...)` to replace `{{APP_NAME}}` with `APP_CONFIG.metadata.name`.

Features (marketing cards):

- Component: `components/landing-page/features-hover.tsx`
- Reads from:
  - `APP_CONFIG.content.features` array
- Icon mapping:
  - Feature objects include `iconName` (a Lucide icon key type).
  - `FeaturesHover` renders each icon through `src/components/lucide-icon.tsx`, which looks up the Lucide component from `lucide-react`’s `icons` map.

Pricing (not yet identity text-driven):

- Components:
  - `components/pricing/pricing-rounded.tsx`
  - `components/pricing/pricing-primary.tsx`
- Pricing currently depends on:
  - Stripe data from Supabase (`products`, `prices`, etc.)
  - `config/pricing.ts` for plan copy and feature lists
- Pricing strings are mostly hardcoded/static; only theme colors update via the CSS variable mechanism.

Bottom line:

- “Text + icons” are config-driven for Hero and Features.
- Pricing is “skin-driven” (colors) but “copy-driven by static plan config / DB data,” not `APP_CONFIG.content`.

---

### 4. The Content: MDX placeholder strategy (`next.config.mjs` + token replacement helpers)

There are two independent (but complementary) mechanisms in play:

Mechanism A: Compile-time MDX placeholder replacement

- File: `next.config.mjs`
- It uses `fumadocs-mdx/config`’s `createMDX(...)` with `mdxOptions.remarkPlugins`.
- The remark plugin walks the MDX AST and replaces placeholder tokens in text nodes:
  - `{{APP_NAME}}` and `[APP_NAME]`
  - `{{APP_AUTHOR}}` and `[APP_AUTHOR]`
- The plugin’s app name is extracted from `src/config/app-config.ts` by regex (`extractAppConfigValue()`).

Mechanism B: Runtime token replacement for docs/blog metadata and displayed title/author

- Helper: `src/utils/replace-app-tokens.ts`
- It replaces `[APP_NAME]` / `{{APP_NAME}}` (and author variants) using the active `APP_CONFIG` wrapper.
- Used by:
  - `app/docs/[[...slug]]/page.tsx` for the visible `h1` and `generateMetadata`
  - `app/blog/[slug]/page.tsx` for visible `h1`, author line, and `generateMetadata`

Why both mechanisms exist:

- MDX body content replacement happens at build/compile-time.
- Some routes rely on `page.data.*` values (frontmatter-derived metadata), so runtime replacement ensures meta tags stay correct even when compile-time replacement can’t reach every data source.

Note on placeholder syntax:

- In practice, the repo content currently uses the safe bracket form (`[APP_NAME]`, `[APP_AUTHOR]`) in frontmatter and body to avoid MDX expression parsing pitfalls.
- The remark plugin supports both `[APP_NAME]` and `{{APP_NAME}}`, but the safest convention is using `[APP_NAME]` / `[APP_AUTHOR]`.

---

## Step-by-Step: “New App Tomorrow” Checklist (5 steps)

1. Edit `src/config/app-config.ts` and update identity + theme:
  - `metadata.name`, `metadata.title`, `metadata.description`, `metadata.url`, `metadata.ogImage`
  - `branding.logoIconName` (Lucide icon key) and `branding.faviconPath`
  - `theming.primaryColor`, `theming.secondaryColor`, `theming.darkMode`, `theming.borderRadius`
  - `content.heroTitle`, `content.heroSubtitle`
  - `content.features[*].title`, `.desc`, `.iconName`
  - `business.contactEmail` and `business.socialLinks`
2. Ensure your MDX content uses placeholder tokens:
  - In `content/docs/`** and `content/blog/**`, use `[APP_NAME]` and `[APP_AUTHOR]` where you want build-time replacement.
  - If you change frontmatter placeholders, ensure they remain valid YAML strings (e.g., quote values when needed).
3. Verify the “skin” path works:
  - Start the app and confirm `--primary` reflects the new hex color (it’s injected in `app/layout.tsx`).
  - Confirm Tailwind utilities like `text-primary`, `bg-primary`, and rounding (`rounded-lg`) change.
4. Confirm marketing UI identity coverage:
  - Navigate to the landing page and verify Hero and Features text + icons update from `APP_CONFIG`.
  - Verify nav/footer brand text reflects `APP_CONFIG.metadata.title` and `business` fields.
5. Handle what is still static (pricing copy and plan features):
  - Pricing plan copy and features come from `config/pricing.ts` and DB/Stripe products, not from `APP_CONFIG.content`.
  - Update `config/pricing.ts` and seed Stripe products/prices appropriately when launching a brand new app.

---

## Component Audit

### Dynamic (dependent on `APP_CONFIG` / config wrapper)

The following components/routes read `APP_CONFIG` (directly or via token replacement utilities) for identity or theming:

- `app/layout.tsx` (head metadata + CSS variable injection)
- `components/landing-page/hero.tsx` (hero text + template injection)
- `components/landing-page/features-hover.tsx` (feature cards + dynamic Lucide icons)
- `components/main-nav.tsx` (brand icon + brand title)
- `components/navigation.tsx` (circular nav brand title)
- `components/mobile-nav.tsx` (mobile nav brand icon + title)
- `components/mode-toggle.tsx` (shows/hides toggle based on `APP_CONFIG.theming.darkMode`)
- `components/footer-primary.tsx` (brand/title + some business links)
- `components/footer-blog.tsx` (footer title + author display uses config)
- `app/docs/layout.tsx` (docs nav title)
- `app/blog/page.tsx` (blog index header uses `APP_CONFIG.metadata.title`)
- `app/blog/[slug]/page.tsx` (title/description/author token replacement for rendered content + metadata)
- `app/docs/[[...slug]]/page.tsx` (token replacement for visible title + metadata)
- `components/dashboard-sidebar.tsx` and `app/(dashboard)/dashboard/page.tsx` (brand/name used in dashboard surfaces)

### Static (still hardcoded or driven by other config/DB)

These parts do not currently pull “display copy” from `APP_CONFIG.content`:

- Pricing UI copy strings and plan feature lists:
  - `components/pricing/pricing-rounded.tsx`
  - `config/pricing.ts`
- Some marketing section headings and CTA labels:
  - `components/landing-page/hero.tsx` still hardcodes CTA button labels (“Get Started”, “View Pricing”)
  - `components/landing-page/features-hover.tsx` still hardcodes the section heading/intro paragraph
- Docs/body content is mostly static MDX authored in `content/` with placeholders replaced, but not fully generated from `APP_CONFIG.content` objects.

What *is* dynamic for these static regions:

- Colors still update globally because Tailwind tokens are powered by CSS variables injected in `app/layout.tsx`.

---

## Notes for Developers (Where “Magic” comes from)

- `config/app-config.ts` is the runtime selection point:
  - It exports the active config object as `APP_CONFIG` (currently hot-swappable for local testing).
- `app/layout.tsx` is the “broadcast” point:
  - It pushes identity into `<head>` and theme values into CSS variables.
- UI components are intentionally simple:
  - They read `APP_CONFIG` and render.
- Icons are type-safe:
  - `APP_CONFIG.branding.logoIconName` and `APP_CONFIG.content.features[*].iconName` are Lucide icon keys, and `lucide-react` renders the correct icon at runtime.

