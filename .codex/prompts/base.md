You are Codex running as a CLI code generator inside my repo.

## Goal
Build a **wildly impressive, “portfolio reviewer-approved”** personal portfolio website in **Next.js (App Router) + TypeScript** using **shadcn/ui + Tailwind only**. It must feel premium, interactive, fast, and memorable — like something a top-tier engineer/designer would ship.

You are not building a generic portfolio. You are building a site that makes visitors go: “ok this person is seriously good”.

## Non-negotiables (STRICT)
### Tech
- Next.js App Router + TypeScript
- Tailwind CSS only (no new CSS files unless absolutely unavoidable)
- shadcn/ui components everywhere appropriate
- Small, modular components (no huge files; split by responsibility)

### Repository structure (STRICT)
Refactor to and enforce this structure:

src/
  app/        // routing only (pages, layouts). NO business logic here.
  modules/    // all actual code lives here: features, components, hooks, services, state, types

Rule: `src/app` must only orchestrate routing and compose module-level pages.
All UI components, logic, hooks, state, services, types must live in `src/modules/**`.

If the current repo does not use `src/` yet (it doesn’t), create it and migrate accordingly without breaking builds.

### Component size
If a file exceeds ~200 lines, split it (unless it is a simple page composition file).

### Styling
- Tailwind utilities only
- No random inline styles except when Tailwind can’t express dynamic values
- Keep typography + spacing consistent and intentional

### Performance
- No re-render storms
- Use memoization only when it helps
- Use refs for high-frequency animation state
- Prefer cheap CSS transforms for animations
- Keep the site at 60fps on a normal laptop

## Role: Portfolio Reviewer Mode
Act like a picky hiring panel:
- The site must communicate skill in 5 seconds.
- Everything must feel intentional (layout, motion, copy, hierarchy).
- Avoid gimmicks that reduce readability.
- The site should be interactive in ways that demonstrate engineering maturity.

Before implementing, write a short plan in the terminal output: feature list + module map + route map.

## Information Architecture (what to build)
Create a portfolio with these standout sections:

1) **Hero / First Impression**
- Big identity statement (name, role, specialization)
- “Proof” elements immediately visible (impact metrics, highlights)
- Two primary CTAs: “View Work” + “Contact”
- Subtle, tasteful motion (not annoying)

2) **Projects (the star)**
- Projects are displayed as cards with:
  - role, tech stack, impact, and 1–2 key visuals (use placeholders if needed)
  - expandable “case study drawer” (Dialog/Drawer) with:
    - problem → approach → result → what I learned
- Filtering + sorting (by type, tech, recency)
- Project detail route support (deep links)

3) **Skills / Tooling**
- Not just a list. Show:
  - “What I build” categories
  - confidence/experience indicators (tasteful)
  - highlight 3–5 strongest skills visually

4) **About**
- Short, human, confident.
- Include “values” + “ways of working”.

5) **Contact**
- Clean form UI (frontend only; no backend required)
- Social links + copy-to-clipboard email
- A “Book a chat” button (just link placeholder)

6) **Delight Layer**
Add 1–2 “signature” features that feel premium:
- Example options (choose best):
  - Interactive command palette (“Search projects, jump to section, copy email”)
  - “Reviewer mode” toggle that overlays critique tags (e.g., highlights metrics, architecture choices)
  - Live “build log” timeline widget for projects
  - Animated reading-progress / section progress indicator
Keep it tasteful and fast.

## Design Direction
- Use a strong visual system: spacing scale, type scale, consistent radii/shadows
- Modern “New York” shadcn look is fine
- Dark mode + light mode
- Motion: subtle parallax, hover microinteractions, section transitions (no heavy libs unless necessary)
- Accessibility: keyboard nav, focus states, semantic headings, contrast-safe.

## Data & Content
- Store portfolio content in a single typed data source:
  - `src/modules/content/portfolioData.ts`
  - Define strict types for Project, Skill, Social, etc.
- Use placeholder content but make it realistic and professional.
- Make it easy for me to swap the data later.

## Routing (src/app must remain thin)
Routes to implement:
- /            -> <HomePage /> (module page)
- /projects    -> <ProjectsPage />
- /projects/[slug] -> <ProjectDetailPage />

Each `src/app/**/page.tsx` should only render the module page component.

## Module plan (enforce feature-first)
Use modules like:
src/modules/
  home/
    pages/
    components/
    hooks/
    types.ts
  projects/
    pages/
    components/
    hooks/
    types.ts
  contact/
    pages/
    components/
    hooks/
    types.ts
  layout/
    components/   // header, footer, nav, theme toggle, command palette
    hooks/
    types.ts
  content/
    portfolioData.ts
    types.ts
  shared/
    ui/           // shadcn wrappers only when needed
    components/   // reusable (Section, Container, AnimatedLink, etc)
    hooks/
    utils/
    types/

Guideline: if a component is only used by one feature, keep it there.

## shadcn/ui usage checklist
Use these where appropriate:
- Button, Card, Badge, Tabs, Dialog/Drawer, Table, Tooltip, DropdownMenu
- Form components for contact
- Skeletons for loading polish

## Output expectations
When you modify code:
- Keep imports correct and paths clean
- Keep files small
- Add types + modular components, not monoliths
- Ensure `bun dev` works
- Update any configs if needed (tsconfig paths, tailwind content paths, etc.)

## Work sequence (DO IN ORDER)
1) Create/migrate to `src/` structure and update configs accordingly.
2) Implement shared layout (header/nav/footer/theme toggle).
3) Build Home page sections with strong hierarchy + motion.
4) Build Projects listing + filtering + detail routes.
5) Add signature feature (command palette recommended).
6) Polish: responsiveness, a11y, performance.

Now implement. Be decisive. Don’t ask questions. Choose tasteful defaults.
