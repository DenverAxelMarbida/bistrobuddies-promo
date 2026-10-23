# Phase 4 Walkthrough and Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved five-step app walkthrough and verified feature section with a pinned desktop narrative, lightweight mobile/tablet sequence, and complete reduced-motion fallback.

**Architecture:** A dedicated `HowItWorks` component owns one typed step dataset and renders two purposeful views: a static paired text/screenshot list that is the default, and a desktop-only enhanced track activated by GSAP after initialization. A separate `Features` component renders five verified feature cards from approved screenshots. Both components keep content visible by default and use the existing shared motion registration.

**Tech Stack:** React 19, TypeScript, CSS Modules, GSAP, ScrollTrigger, `@gsap/react`, Vite, Playwright browser verification.

**Spec:** `docs/superpowers/specs/2026-10-23-bistrobuddies-promo-design.md`

## Global Constraints

- Preserve the existing cream, espresso, gold, Fraunces, and Manrope visual system and completed Phase 2/3 components.
- Phase 4 includes both the pinned walkthrough and feature section from specification sections 9 and 17; do not implement Phase 5.
- Walkthrough screenshots are exactly `menu-3`, `product-1`, `cart-2`, `receipt-2`, and `order-1` in Browse, Customize, Review, Confirm, Track order.
- Feature screenshots are selected from `menu-8`, `product-2`, `receipt-2`, `order-1`, and `my-orders`; all copy must match verified routes, customization, payment, and order status facts.
- Never reference `home`, `checkout-1`, `checkout-2`, `checkout-3`, or `order-2` screenshots.
- Use `useGSAP`, `gsap.matchMedia()`, scoped cleanup, opacity/transform animation only, and no scroll locking, snapping, looping, or body mutation.
- Desktop enhancement starts at 64rem and 48rem viewport height only when normal text scale can contain the visual; mobile, tablet, short desktop, enlarged text, reduced motion, and failed enhancement retain the static list.
- Keep all screenshots in semantic figures with descriptive alt text and visible captions; animation must not be the only source of information.
- Preserve APK behavior and public asset policy. Add no dependencies.
- Do not commit, push, deploy, modify reference repositories, or begin Phase 5 without explicit permission.

## Review Focus

- React StrictMode and breakpoint changes must leave no pin spacers, stale inline styles, or duplicate ScrollTriggers.
- A short desktop viewport must fall back to the static sequence rather than pin a phone that cannot fit.
- Deep-linking to `#how-it-works` must land below the sticky header without trapping the first wheel/keyboard scroll.
- A screenshot load failure must preserve each step's text and show the existing readable fallback instead of collapsing the sequence.
- Five walkthrough and five feature screenshots must remain lazy below the fold without layout shift or restricted asset exposure.

---

### Task 1: Static and Mobile Walkthrough

**Files:**
- Create: `src/components/HowItWorks/HowItWorks.tsx`
- Create: `src/components/HowItWorks/HowItWorks.module.css`
- Modify: `src/components/PageShell/PageShell.tsx`
- Modify: `src/components/PageShell/PageShell.module.css`

**Interfaces:**
- Consumes: `ScreenshotId`, `Container`, `ScreenshotFrame`, and `SectionLabel`.
- Produces: `HowItWorks(): JSX.Element`; internal `WalkthroughStep` records with `title`, `detail`, `screenshot`, and `caption`.

- [ ] **Step 1: Write and run the failing static walkthrough browser probe**

At 320, 375, and 768px assert `#how-it-works` contains an ordered list of exactly five paired step cards in the approved order, exact approved screenshot paths, visible captions, verified copy, no restricted asset paths, lazy image loading, and zero horizontal overflow. Abort one walkthrough image request and assert its text remains while the existing readable image fallback appears. Assert the 320px layout also survives 200% root text size.

Run: `npm run build` followed by the temporary Playwright probe.
Expected: FAIL because the existing scaffold has no walkthrough screenshots or paired cards.

- [ ] **Step 2: Implement `HowItWorks(): JSX.Element` static structure**

Create the typed five-step dataset and render the section heading, factual sign-in note, and mobile/tablet ordered list. Each list item contains its step number through list semantics/CSS, `h3`, concise detail, and one `ScreenshotFrame` with caption.

- [ ] **Step 3: Implement mobile-first walkthrough CSS**

Use one column at phone widths and a readable text/media grid per card from 40rem upward while retaining a stacked sequence through tablet widths. Keep screenshots within the viewport, reserve image aspect ratio, and use border/divider rhythm rather than generic floating cards.

- [ ] **Step 4: Replace only the PageShell walkthrough scaffold**

Render `<HowItWorks />` after `<OriginStory />`; remove the local `steps` data and walkthrough-only CSS without changing Hero, OriginStory, feature scaffold, film, download, or footer.

- [ ] **Step 5: Verify Task 1**

Run the static walkthrough probe, `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all pass with no console errors, overflow, unsupported claims, or restricted assets.

### Task 2: Desktop ScrollTrigger Enhancement

**Files:**
- Modify: `src/components/HowItWorks/HowItWorks.tsx`
- Modify: `src/components/HowItWorks/HowItWorks.module.css`

**Interfaces:**
- Consumes: Task 1 `WalkthroughStep` dataset and configured `gsap`/`ScrollTrigger` from `src/lib/motion.ts`.
- Produces: desktop enhanced track marked by section `data-enhanced="true"` only while its GSAP media context is active.

- [ ] **Step 1: Write and run the failing desktop enhancement probe**

At 1024 and 1440px with no motion preference, assert one enhanced track, zero pin spacers, a stable CSS-sticky visual position during the active range, and screenshot opacity/scale changes synchronized to all five text steps. Resize 1024→768→1024 and assert the enhanced attribute changes true→absent→true with no duplicate triggers or retained inline styles. At 1024 with reduced motion and at 1024×600 assert no enhancement and five static cards.

Run: `npm run build` followed by the temporary Playwright probe.
Expected: FAIL because no desktop enhanced track or pinning exists.

- [ ] **Step 2: Add the desktop enhanced markup**

Reuse the same typed dataset to render an enhanced ordered text track and stacked `ScreenshotFrame` visual layers. Keep the enhanced view hidden and out of the accessibility tree until its GSAP media callback sets `data-enhanced="true"`.

- [ ] **Step 3: Implement scoped desktop pinning and synchronization**

Select desktop mode at `(min-width: 64rem) and (min-height: 48rem)` only at normal text scale. Set the first visual active, use CSS `position: sticky` for native visual pinning, create per-step enter/back ScrollTriggers that crossfade and slightly scale layers, and remove the enhancement attribute in callback cleanup. Never create pin spacers, lock scrolling, or snap the page.

- [ ] **Step 4: Add mobile/tablet reveal motion**

For `(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)`, reveal each static card once with a small opacity/y transition and no pinning. Do not run either motion branch for reduced motion.

- [ ] **Step 5: Verify Task 2**

Run desktop enhancement and static probes, then `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all pass; StrictMode/breakpoint cleanup leaves exactly the expected pin state.

### Task 3: Verified Feature Section

**Files:**
- Create: `src/components/Features/Features.tsx`
- Create: `src/components/Features/Features.module.css`
- Modify: `src/components/PageShell/PageShell.tsx`
- Modify: `src/components/PageShell/PageShell.module.css`

**Interfaces:**
- Consumes: `ScreenshotId`, `Container`, `ScreenshotFrame`, `SectionLabel`, and configured `gsap`.
- Produces: `Features(): JSX.Element`; five semantic feature records with `title`, `detail`, and approved `screenshot`.

- [ ] **Step 1: Write and run the failing feature-section probe**

Assert `#features` contains exactly five factual feature items: browse before sign-in (`menu-8`), size/sugar/quantity (`product-2`), COD or GCash proof flow (`receipt-2`), order progress (`order-1`), and order history (`my-orders`). Assert no fake icons, controls, unapproved prices, restricted assets, or repeated adjacent screenshots.

Run: `npm run build` followed by the temporary Playwright probe.
Expected: FAIL because the scaffold has only three text definitions and no approved feature screenshots.

- [ ] **Step 2: Implement `Features(): JSX.Element`**

Render a semantic section and list of five feature articles from one local typed dataset. Give the browse item deliberate lead treatment, then arrange four supporting items without adding controls or decorative icons.

- [ ] **Step 3: Implement responsive feature CSS and restrained reveals**

Use a mobile stack, a two-column tablet layout, and an asymmetric desktop grid where the lead item spans additional space. Keep image frames smaller than walkthrough media and use one-time small opacity/y reveals only under no-preference motion.

- [ ] **Step 4: Replace only the PageShell feature scaffold**

Render `<Features />` after `<HowItWorks />`; remove feature-only PageShell CSS while preserving Phase 5 film/download scaffolds.

- [ ] **Step 5: Verify Task 3**

Run feature, walkthrough, and desktop probes, then `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`.
Expected: all pass with five approved feature items and no Phase 5 changes.

### Task 4: Phase 4 Integration Gate

**Files:**
- Modify only if a demonstrated Phase 4 defect requires a focused fix.

**Interfaces:**
- Consumes: `HowItWorks` and `Features` from Tasks 1–3.
- Produces: complete Phase 4 verification evidence; no Phase 5 implementation.

- [ ] **Step 1: Verify responsive and visual behavior**

At 320, 375, 768, 1024, and 1440px assert no horizontal overflow, no layout shift from screenshots, 44px interactive targets, readable walkthrough/feature widths, expected static vs enhanced variants, and visually inspect representative screenshots.

- [ ] **Step 2: Verify animation lifecycle**

Verify desktop sticky behavior through all five steps, reverse scrolling, resize cleanup, short-height fallback, mobile no-sticky behavior, React StrictMode zero pin spacers, and no residual inline transform/opacity after unmount/media deactivation.

- [ ] **Step 3: Verify accessibility and reduced motion**

Verify heading order, ordered-list semantics, screenshot alt/captions, skip-link and anchor behavior, visible focus, reduced-motion static list, keyboard scrolling through the pinned range, 200% text resize, and content visibility without successful enhancement. Load `#how-it-works` directly and assert sticky-header scroll padding keeps its heading visible and the next keyboard scroll advances normally.

- [ ] **Step 4: Verify security and existing contracts**

Assert no restricted screenshot files or references, all displayed screenshots belong to the approved manifest, both APK links download the file with SHA-256 `12bf82b502500f2eabd9e2942fa60c5624b62e135494a20a4ee8154a446cd5fd`, and Hero/OriginStory snapshots remain unchanged.

- [ ] **Step 5: Run final commands and review scope**

Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:assets`; inspect `git diff --check`, `git status`, and the complete Phase 4 diff. Obtain one independent whole-branch review, fix Critical/Important findings with RED→GREEN evidence, and report without committing, pushing, deploying, or starting Phase 5.
