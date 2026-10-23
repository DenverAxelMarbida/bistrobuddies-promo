# Phase 3 Hero and Origin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved BistroBuddies hero and origin story as focused, responsive components with restrained GSAP motion and complete reduced-motion fallbacks.

**Architecture:** Extract the existing PageShell hero and story scaffolds into `Hero` and `OriginStory` components. Share GSAP plugin registration through one small motion module, keep all content visible without JavaScript, and use scoped `useGSAP` timelines only when reduced motion is not requested.

**Tech Stack:** React 19, TypeScript, CSS Modules, GSAP, ScrollTrigger, `@gsap/react`, Vite, Playwright browser verification.

**Spec:** `docs/superpowers/specs/2026-10-23-bistrobuddies-promo-design.md`

## Global Constraints

- Preserve the cream, espresso, gold, Fraunces, and Manrope visual system already established in Phase 2.
- Use only `menu-1.jpg`, the official BistroBuddies logo, and verified facts from `src/content/assets.ts`.
- Hero copy and metadata must match specification section 9; origin copy must mention five friends, the Technological Institute of the Philippines, Quezon City, and fresh beans.
- Use `useGSAP` with scoped cleanup; no layout-property animation, scroll hijacking, bounce, looping decoration, or motion under `prefers-reduced-motion: reduce`.
- Keep the existing APK URL, filename, version, size, and Android minimum unchanged.
- Do not touch Phase 4 walkthrough or feature behavior beyond preserving the current scaffolds.
- Do not commit, push, or deploy without explicit permission.

## Review Focus

- At 320px and 375px, the hero download CTA remains in the first viewport and the real screenshot and CoffeeRing do not overflow.
- At 768px, the hero changes to two columns only when both copy and screenshot remain readable.
- Before motion initializes, after motion completes, or with reduced motion enabled, all hero and origin content remains visible and no transform or opacity residue is applied.
- ScrollTrigger starts the origin reveal once without pinning, trapping scroll, or replaying.
- The official logo retains its intrinsic dimensions, readable alternative text, and white/paper presentation without creating a fake derivative.

---

### Task 1: Scoped Motion Setup and Hero

**Files:**
- Create: `src/lib/motion.ts`
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/Hero.module.css`
- Modify: `src/components/PageShell/PageShell.tsx`

**Interfaces:**
- Consumes: `apk` from `src/content/assets.ts`; `Button`, `CoffeeRing`, `Container`, `ScreenshotFrame`, and `SectionLabel`.
- Produces: `Hero(): JSX.Element`; configured `gsap` and `ScrollTrigger` exports from `src/lib/motion.ts`.

- [ ] **Step 1: Write and run the failing browser probe**

Build and load the current page at 320, 768, and 1440px. Assert the hero eyebrow is exactly `BistroBuddies Coffee Shop`, the APK anchor retains `/downloads/BistroBuddies.apk` and `BistroBuddies.apk`, `menu-1` is rendered with its approved alt text, the CTA is in the first viewport at phone widths, and normal motion causes scoped hero style mutations while reduced motion causes none.

Run: `npm run build` followed by the temporary Playwright probe.
Expected: FAIL because the eyebrow and approved scoped motion are absent.

- [ ] **Step 2: Implement shared GSAP registration**

Create `src/lib/motion.ts` to register `useGSAP` and `ScrollTrigger` once and export the configured `gsap` and `ScrollTrigger` instances.

- [ ] **Step 3: Implement `Hero(): JSX.Element`**

Move the approved hero semantics and assets out of PageShell. Use one scoped `useGSAP` context and `gsap.matchMedia()` to animate copy with a 0.6 to 0.8 second staggered opacity/rise entrance and the visual with one restrained opacity/rise entrance. Use `clearProps` after completion and render the final visible state by default.

- [ ] **Step 4: Implement responsive Hero CSS**

Keep a single-column phone layout, switch to the existing balanced two-column composition at 48rem, preserve 44px targets, contain the CoffeeRing, and keep the APK CTA above the first 900px viewport at 320px and 375px.

- [ ] **Step 5: Replace only the PageShell hero scaffold**

Render `<Hero />` before the existing origin scaffold and remove only hero-specific imports and CSS from PageShell.

- [ ] **Step 6: Verify Task 1**

Run the browser probe, `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all checks pass with no console errors or horizontal overflow.

### Task 2: Origin Story

**Files:**
- Create: `src/components/OriginStory/OriginStory.tsx`
- Create: `src/components/OriginStory/OriginStory.module.css`
- Modify: `src/components/PageShell/PageShell.tsx`

**Interfaces:**
- Consumes: `brand` from `src/content/assets.ts`; configured `gsap` from `src/lib/motion.ts`; `Container` and `SectionLabel`.
- Produces: `OriginStory(): JSX.Element` with section id `story` and heading id `story-title`.

- [ ] **Step 1: Write and run the failing browser probe**

Assert `#story` contains one official logo using `/brand/BistroBuddiesLogo.png`, the approved five-friends/TIP/Quezon City/fresh-beans facts, valid heading order, and no fabricated names or dates. Observe one scoped style mutation when the section enters under normal motion and none under reduced motion.

Run: `npm run build` followed by the temporary Playwright probe.
Expected: FAIL because the current origin scaffold has no official logo or ScrollTrigger reveal.

- [ ] **Step 2: Implement `OriginStory(): JSX.Element`**

Create a semantic editorial section with the official logo on a white/paper surface, one strong Fraunces statement, and two short factual paragraphs. Use one scoped `useGSAP` reveal with a small opacity/rise transition, `once` behavior through ScrollTrigger toggle actions, no pinning, and a reduced-motion bypass.

- [ ] **Step 3: Implement responsive OriginStory CSS**

Use a deliberate mobile stack, a logo/statement/copy editorial grid where space allows, generous whitespace, and no decorative elements beyond the approved logo and divider treatment.

- [ ] **Step 4: Replace only the PageShell story scaffold**

Render `<OriginStory />` after `<Hero />`; remove story-specific CSS and imports without changing walkthrough, features, film, or download markup.

- [ ] **Step 5: Verify Task 2**

Run the browser probe, `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all checks pass with no console errors, broken landmarks, or restricted asset references.

### Task 3: Phase 3 Integration Gate

**Files:**
- Modify only if a verified defect requires a focused fix.

**Interfaces:**
- Consumes: `Hero` and `OriginStory` from Tasks 1 and 2.
- Produces: Phase 3 verification evidence; no Phase 4 implementation.

- [ ] **Step 1: Verify responsive behavior**

At 320, 375, 768, 1024, and 1440px, assert document width equals viewport width, the CoffeeRing stays contained, media fits, navigation changes at the existing breakpoint, and all interactive targets are at least 44px.

- [ ] **Step 2: Verify accessibility and interaction**

Verify one h1, ordered headings, header/main/footer landmarks, skip-link focus transfer, visible focus indicators, descriptive image alt text, working internal anchors, and both APK downloads against the approved SHA-256.

- [ ] **Step 3: Verify reduced motion and progressive visibility**

Under `prefers-reduced-motion: reduce`, assert no active GSAP animation or residual inline transform/opacity on Hero or OriginStory. Disable JavaScript and confirm server-delivered fallback is not claimed; with JavaScript running but animation unavailable, content remains visible because CSS does not hide it.

- [ ] **Step 4: Run the final quality gates**

Run: `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all commands exit 0; public and dist asset checks pass; `dist/downloads/BistroBuddies.apk` retains SHA-256 `12bf82b502500f2eabd9e2942fa60c5624b62e135494a20a4ee8154a446cd5fd`.

- [ ] **Step 5: Review scope and git state**

Inspect `git diff`, confirm no restricted screenshots or unrelated repositories changed, and report Phase 3 readiness without committing, pushing, deploying, or starting Phase 4.
