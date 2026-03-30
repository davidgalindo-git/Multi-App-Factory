# APP_FACTORY_ROADMAP.md

## Step 1: Infrastructure Upgrade & Visual Stress Test
- **Status:** Completed
- **Goal:** Upgrade the "DNA" of the app to be 99% automated, then test with the Coffee App.

### Prompt for Cursor:
> "Let's execute Step 1 of the roadmap. This is a two-part task:
> 
> **Part A: Infrastructure Upgrade**
> 1. Update the `AppConfig` interface in `src/config/app-config.ts` to include these new fields:
>    - `content.heroCtaText` and `content.secondaryCtaText` (strings)
>    - `branding.showTestimonials` and `branding.showFaqs` (booleans)
>    - `business.legalName` and `business.supportEmail` (strings)
> 2. Update the **Hero Component** to use `APP_CONFIG.content.heroCtaText` for the primary button.
> 3. Wrap the **Testimonials** and **FAQ** sections in a conditional check so they only render if their respective `branding.show...` toggle is `true`.
>
> **Part B: The Coffee Test**
> 1. Create/Update `src/config/test-coffee.ts` using the 'BeanStream AI' data, filling in all the new fields (e.g., `heroCtaText: 'Start My Roast Profile'`).
> 2. Switch the config wrapper (`config/app-config.ts`) to use this Coffee test config (`USE_TEST_CONFIG = true`).
> 3. Start `npm run dev` and verify:
>    - Does the Hero button say 'Start My Roast Profile'?
>    - Does the primary color look like Deep Brown (#3e2723)?
>    - Are the icons Coffee-themed?
> 
> Report back with a 'Vibe Check' summary of what updated."

Vibe Check (Coffee / BeanStream AI):
- Hero primary CTA now reads: `Start My Roast Profile`.
- Hero secondary CTA now reads: `Explore Subscription Plans`.
- Global theme token injection: CSS `--primary` reflects Deep Brown `#3e2723` (HSL converted in `app/layout.tsx`).
- Features grid uses Coffee-flavored config values (e.g., `Roast Matching`, `Reliable Delivery`, `Smart Scheduling`) and Coffee-related iconName values.
- Testimonials + FAQ sections render because `APP_CONFIG.branding.showTestimonials` and `APP_CONFIG.branding.showFaqs` are `true`.

---

## Step 2: Content & Legal "Deep Sweep"
- **Status:** Pending
- **Goal:** Remove every last trace of the original boilerplate author/brand.

### Prompt for Cursor:
> "Perform a 'Deep Sweep' of the repo. 
> 1. Search for any hardcoded strings: 'Hikari', 'Antoine', 'Ross', or demo email addresses.
> 2. Replace them with the new variables we just created: `APP_CONFIG.business.legalName`, `APP_CONFIG.metadata.name`, or `APP_CONFIG.business.supportEmail`.
> 3. Specifically check:
>    - The Footer copyright line.
>    - The Privacy Policy & Terms pages.
>    - Any 'About' or 'Team' sections.
>    - The `robots.txt` or `sitemap.ts` files.
> 4. Ensure the `[APP_NAME]` and `[APP_AUTHOR]` tokens in the MDX files are pulling correctly from our updated config.
>
> Summarize the files cleaned."

---

## Step 3: Gold Master Lockdown
- **Status:** Pending
- **Goal:** Revert to the "Blank Slate" and lock the factory for future clones.

### Prompt for Cursor:
> "Lock the “Gold Master” build so test identity hot-swapping cannot ship:
> 1. In `config/app-config.ts`, set `USE_TEST_CONFIG = false`.
> 2. Confirm production uses `MASTER` config (`src/config/app-config.ts`) everywhere.
> 3. (Optional hardening) Ensure `next.config.mjs` or MDX token replacement is not reading any test-only values.
> 4. Run `npm run build` with required env vars (or a CI-safe method) and ensure:
>    - TypeScript passes
>    - Next prerendering completes
>    - No runtime ReferenceErrors from token placeholders.
>
> Provide the final verification results."