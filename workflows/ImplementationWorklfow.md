# The Implementation Workflow
## Step A: The "Idea Scraper" (Market Research)
Tool: Perplexity API + Make.com

Set up a recurring task in Make.com to query the Perplexity API once a week for "Trending micro-SaaS gaps in [Niche, e.g., Real Estate]."

Have the AI output a JSON file containing: App Name, Core Problem, 3 Key Features, and Target Keyword.

## Step B: The "Architect" (PRD Generation)
Tool: Claude 3.5 Sonnet

Feed the JSON into Claude with a "System Prompt" like: "You are a Senior Product Architect. Create a technical PRD for a Next.js app using Tailwind and Supabase. Define the database schema and API routes."

Save this PRD as a README.md and a .cursorrules file. These files tell the AI exactly how to code the app later.

## Step C: The "Assembler" (Vibe Coding)
Tool: Cursor + Composer (Manual or Semi-Automated)

Open your SaaS Boilerplate (e.g., Makerkit) in Cursor.

Open Composer (Cmd+I) and attach your README.md and .cursorrules.

The Master Prompt: "Based on the attached PRD, implement the core features. Update the database schema in Supabase, create the new UI components in /components, and link the logic to the Stripe billing tier 'Basic'."

Watch the Magic: Cursor will rewrite 10–15 files simultaneously to turn the "Template" into your "Specific App."

## Step D: The "Deployer" (Launch)
Tool: Vercel CLI

Run vercel deploy --prod from the terminal.

In 2026, you can use Vercel’s AI Deploy to automatically configure your environment variables (Stripe keys, DB URLs) based on your codebase.

