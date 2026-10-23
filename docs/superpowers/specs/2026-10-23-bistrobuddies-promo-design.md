# BistroBuddies Promo Site Design Spec

Status: Ready for implementation
Date: 2026-10-23
Repository: `D:\VScode codes\bistrobuddies-promo`
Source app: `D:\VScode codes\Mobile\bistrobuddies\bistrobuddies-mobile`

## 1. Purpose

Build a static promotional website for the BistroBuddies Android ordering app. The site should explain the app, show the real product experience, and offer the APK for download. It is not a second ordering interface.

## 2. Goals

- Present BistroBuddies as a warm, editorial coffee brand rather than a generic app landing page.
- Use the real revised app screenshots instead of simulated UI.
- Make the ordering flow understandable in one scroll.
- Make the Android APK download obvious and trustworthy.
- Keep the implementation small: React, Vite, TypeScript, CSS Modules, and GSAP only.
- Meet accessibility, responsive, and reduced-motion requirements.
- Avoid unsupported claims and all sensitive customer data.

## 3. Non-goals

- No backend, authentication, database, or API integration.
- No live menu, cart, checkout, order tracking, or contact form.
- No router, Tailwind, component library, state manager, or extra animation library.
- No fabricated screenshots, fake device frames, fake testimonials, fake ratings, fake statistics, or fake social accounts.
- No Play Store badge until the app is actually published there.
- No autoplay video.
- No claims of real-time rider tracking, guaranteed delivery times, or nationwide availability.
- No deployment or release work without separate approval.

## 4. Verified Source Facts

### Revised app routes

The revised app exposes public browsing:

- Public: `dashboard`, `products`, `products/:id`, `about`, `company-history`, `about-products`, `contact-us`, `developers`, `terms`.
- Requires sign-in: `cart`, `checkout`, `my-orders`, `my-orders/:id`, `my-messages`, `profile`.

The site may say customers can browse the menu before signing in. It may say an account is required to place an order.

### Ordering flow

Verified flow:

1. Browse the menu and filter products.
2. Open a product.
3. Choose size, sugar level, and quantity.
4. Add to cart or use Buy Now.
5. Review the cart.
6. Checkout as a signed-in customer.
7. Pay by Cash on Delivery or GCash.
8. Receive confirmation.
9. Follow status stages: Pending, Confirmed, Preparing, Ready, On the Way, Delivered.
10. Revisit order history.

The app supports delivery orders. Do not imply pickup.

### Product customization

Verified size options: Small, Medium, Large.
Verified sugar options: No Sugar, Less Sugar, Regular, Extra Sugar.
Verified quantity range: 1 to 99.

Do not use the older "Sugar" wording as the option name. Use "Regular" when referring to the default.

### Business content

Verified:

- Name: BistroBuddies
- Tagline: COFFEE SHOP
- Location: Quezon City, Philippines
- Email: bistrobuddies@gmail.com
- Origin: created by five coffee-loving friends from the Technological Institute of the Philippines.
- Product claim: coffee made with fresh coffee beans selected for rich aroma and satisfying flavor.

Do not use the repository phone number. It is not approved public contact information.

### APK

- File: `public/downloads/BistroBuddies.apk`
- Package: `com.bistrobuddies.app`
- Version name: `1.0`
- Version code: `1`
- Size: `15,752,797` bytes, displayed as `15.8 MB`
- Minimum Android: `7.0` (API 24)
- Target SDK: `36`
- SHA-256: `12bf82b502500f2eabd9e2942fa60c5624b62e135494a20a4ee8154a446cd5fd`

The APK must not be rebuilt, renamed, moved, or modified. Vite copies `public/downloads/BistroBuddies.apk` into the production build automatically.

## 5. Content Rules

- Use plain, direct copy. No em dashes.
- No generic SaaS language such as "revolutionize", "seamless", "elevate", or "unlock".
- No unsupported superlatives.
- No invented story details, team names, addresses, phone numbers, delivery zones, or operating hours.
- No product prices beyond the verified "starting at ₱100" fact unless a specific product price is shown in context.
- No claims that the app is on the Play Store.
- No claims that GCash payment is instant. The app collects GCash details and payment proof for review.
- Use sentence case for body copy. Use uppercase only for short labels and eyebrow text.
- Keep product names exactly as shown in the app.
- Do not copy the em dashes that appear inside the app's product descriptions.

## 6. Asset Audit

The original inventory contained 26 JPEG screenshots, `1080x2400`. Following the approved privacy cleanup, only the 21 approved screenshots are stored in `public/screenshots/`.

### Safe for public use

| File | Content | Use |
|---|---|---|
| `menu-1.jpg` | Menu header, search, filters, product cards | Hero |
| `menu-2.jpg` | Iced product cards | Optional |
| `menu-3.jpg` | Iced product cards, scrolled | Walkthrough browse |
| `menu-4.jpg` | Iced product cards, scrolled | Optional |
| `menu-5.jpg` | Iced product cards, scrolled | Optional |
| `menu-6.jpg` | Iced product cards, scrolled | Optional |
| `menu-7.jpg` | Hot product cards, scrolled | Optional |
| `menu-8.jpg` | Hot product cards | Features variety |
| `menu-9.jpg` | Hot product cards, scrolled | Optional |
| `menu-10.jpg` | Menu cards, scrolled | Optional |
| `menu-11.jpg` | Menu cards, scrolled | Optional |
| `menu-12.jpg` | Menu cards, scrolled | Optional |
| `product-1.jpg` | Product details, size, sugar, actions | Walkthrough customize |
| `product-2.jpg` | Size, sugar, quantity, item price, actions | Features customize |
| `cart-1.jpg` | Cart items and quantities | Optional |
| `cart-2.jpg` | Cart summary and checkout action | Walkthrough review |
| `receipt-1.jpg` | Order confirmed and item summary | Optional |
| `receipt-2.jpg` | Payment summary, COD, track action | Walkthrough confirm |
| `order-1.jpg` | Order progress stages | Walkthrough track |
| `my-orders.jpg` | Order history list | Features history |
| `loading.jpg` | Splash screen with logo | Film fallback poster |

### Restricted, do not publish

| File | Reason |
|---|---|
| `home.jpg` | Shows a customer name |
| `checkout-1.jpg` | Shows name, phone, and address |
| `checkout-2.jpg` | Shows GCash QR code and account details |
| `checkout-3.jpg` | Shows GCash account name and number |
| `order-2.jpg` | Shows delivery details |

Do not place restricted files anywhere in the repository, import them, or reference them in markup. Vite publishes every file in `public/`, whether referenced or not. The five originals are backed up outside the repository at `D:\VScode codes\bistrobuddies-private-assets\2026-10-23-sensitive-screenshots\`, with SHA-256 records in `backup-manifest.json`. Remove restricted files from both `public/` and stale `dist/` output. The public asset safety check must pass before every production build.

## 7. Selected Asset Mapping

| Section | Asset | Purpose |
|---|---|---|
| Hero | `menu-1.jpg` | Show the real menu and app identity |
| Walkthrough: Browse | `menu-3.jpg` | Show product variety |
| Walkthrough: Customize | `product-1.jpg` | Show size, sugar, and actions |
| Walkthrough: Review | `cart-2.jpg` | Show cart summary and checkout |
| Walkthrough: Confirm | `receipt-2.jpg` | Show confirmed order and payment |
| Walkthrough: Track | `order-1.jpg` | Show delivery progress |
| Features: Browse | `menu-8.jpg` | Show hot drinks |
| Features: Customize | `product-2.jpg` | Show quantity and pricing controls |
| Features: History | `my-orders.jpg` | Show saved order history |
| Film fallback | `loading.jpg` | Branded poster, not a fake video |
| Origin | Official logo | Brand identity, no screenshot |

`menu-1.jpg` already contains the Android status and navigation bars. Do not add a simulated phone shell. Use a simple rounded image frame that preserves the full screenshot.

## 8. Visual System

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-espresso` | `#3B2418` | Primary text, dark surfaces |
| `--color-cream` | `#F5EDE4` | Page background |
| `--color-gold` | `#D4A96A` | Accent, focus, highlights |
| `--color-caramel` | `#A87C4F` | Secondary accent, large text only |
| `--color-muted` | `#6F5A45` | Body text on cream |
| `--color-paper` | `#FFF9F2` | Cards and elevated surfaces |
| `--color-line` | `#D9C8B8` | Borders and dividers |
| `--color-success` | `#2F6B4F` | Verified or available states |
| `--color-error` | `#9B3A32` | Errors only |

Contrast constraints:

- Espresso on cream: `12.48:1`
- Gold on espresso: `6.67:1`
- Muted on cream: `5.62:1`
- Caramel on cream: `3.20:1`, use only for large display text
- Gold on cream: `1.87:1`, decorative only, never body text

### Typography

- Display: Fraunces Variable, weight 600, tight tracking, line height `0.95`.
- Body and UI: Manrope Variable, weights 400 to 700.
- Display size: `clamp(3.4rem, 8vw, 7rem)`.
- Section heading: `clamp(2.2rem, 5vw, 4.25rem)`.
- Body: `1.0625rem`, line height `1.65`.
- Eyebrow: `0.75rem`, weight 700, uppercase, tracking `0.16em`.
- Button: `0.875rem`, weight 700, tracking `0.04em`.

Self-host both families through Fontsource. Do not load Google Fonts at runtime.

### Layout

- Container: `min(100% - 2rem, 1200px)`.
- Desktop grid: 12 columns.
- Tablet grid: 6 columns.
- Mobile grid: 1 column.
- Section spacing: `clamp(4.5rem, 10vw, 8rem)`.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Border radius: 4px for small controls, 12px for cards, 24px for large media.
- Shadows: warm and restrained, never neon or glassy.

### Texture and decoration

- Use a subtle coffee-ring SVG or CSS ring as an editorial accent.
- Use a fine paper grain only if it stays below noticeable contrast.
- No gradients, glassmorphism, glow, orbs, floating blobs, or purple-blue tech gradients.
- No fake app chrome, fake dashboards, or fake UI cards.

## 9. Page Architecture

### Header

- Logo and wordmark.
- Desktop anchors: How it works, Features, Film, Download.
- Primary action: Download for Android.
- Mobile: logo and Download action. Section links may be hidden to avoid a drawer.
- Sticky with a cream background and a thin bottom border after scroll.
- No heavy blur or transparent glass effect.

### Hero

- Eyebrow: `BistroBuddies Coffee Shop`.
- Headline: `BistroBuddies, in your pocket.`
- Supporting copy: browse the menu, customize a drink, and place an order from the Android app.
- Primary CTA: `Download the Android app`.
- Secondary CTA: `See how it works`.
- Metadata: version `1.0`, `15.8 MB`, Android `7.0+`.
- Visual: `menu-1.jpg` in a restrained frame with a coffee-ring accent.
- No autoplay video, no carousel, no spinning logo.

### Origin

- Short editorial section about five friends from the Technological Institute of the Philippines.
- Mention Quezon City and fresh beans.
- Use the official logo, generous whitespace, and one strong statement.
- No invented founding year, team names, or quotes.

### How It Works

- Five steps: Browse, Customize, Review, Confirm, Track.
- Desktop: pinned visual column with step text and crossfades.
- Mobile: stacked step cards with static images and short reveals.
- Use `menu-3`, `product-1`, `cart-2`, `receipt-2`, `order-1`.
- The pinned sequence must not trap scroll or hide content when JavaScript fails.
- Reduced motion: render all steps as a static list.

### Features

- Four to five concise cards:
  - Browse before signing in.
  - Choose size, sugar, and quantity.
  - Pay with COD or GCash.
  - Follow order progress.
  - Revisit order history.
- Use `menu-8`, `product-2`, `receipt-2`, `order-1`, and `my-orders` selectively.
- Avoid repeating the same screenshot in adjacent cards.
- No fake feature icons that imply unverified capabilities.

### Film

- Reserve a section for a 20 to 30 second Brag film.
- Use a poster and click-to-play only. No autoplay.
- If the film is not ready, show an honest branded placeholder with no play button.
- Use `loading.jpg` only in a vertical frame if no 16:9 poster exists.
- Planned files: `public/media/brag-poster.jpg`, `brag.mp4`, optional `brag.webm`, optional `brag.vtt`.
- Inspect the installed Brag skill before implementation and request approval before expensive rendering or extra dependencies.

### Download

- Restate the app value in one sentence.
- Show version, size, and Android minimum.
- Primary CTA links to `/downloads/BistroBuddies.apk` with the `download` attribute.
- Include a short install note: Android may ask to allow installs from the browser.
- Do not show a Play Store badge.
- Do not show a QR code for the APK.
- Keep the SHA-256 hash in the asset manifest, not necessarily in the visible UI.

### Footer

- Logo and short description.
- Anchor navigation.
- Verified email and location.
- Copyright.
- No invented social links, phone number, address, or store hours.

## 10. Component Plan

Suggested structure:

```text
src/
  components/
    Button/
    Container/
    ScreenshotFrame/
    SectionHeading/
    Header/
    Hero/
    OriginStory/
    HowItWorks/
    Features/
    FilmSection/
    DownloadSection/
    Footer/
  content/
    assets.ts
    site.ts
  hooks/
    usePrefersReducedMotion.ts
  styles/
    tokens.css
    base.css
    fonts.css
  App.tsx
  main.tsx
```

Rules:

- One CSS Module per component.
- Shared tokens in `src/styles/tokens.css`.
- No inline style objects except for small computed values.
- No comments unless they explain a non-obvious constraint.
- Use semantic HTML before ARIA.
- Use real `<a>` elements for navigation and downloads.
- Use real `<button>` elements only for actions such as the future video modal.

## 11. Motion Plan

- Use GSAP and `@gsap/react` with `useGSAP` and scoped cleanup.
- Hero entrance: staggered opacity and vertical offset, 0.6 to 0.8 seconds total.
- Section reveals: one-time fade and rise, small distance, no bounce.
- Walkthrough: pinned desktop sequence with crossfades and small scale changes.
- Mobile: no pinning; simple reveals.
- Use `gsap.matchMedia()` for breakpoint and reduced-motion conditions.
- Disable all non-essential animation when `prefers-reduced-motion: reduce`.
- Do not animate layout properties such as width or top.
- Do not hijack scrolling, lock the body, or add scroll-jacking snap points.

## 12. Responsive Behavior

Test at 320, 375, 768, 1024, and 1440 pixels.

- 320: single column, no horizontal overflow, 44px minimum tap targets, screenshot frame fits.
- 375: single column, comfortable gutters.
- 768: two-column hero if space allows, stacked walkthrough.
- 1024: pinned walkthrough enabled, desktop navigation visible.
- 1440: max-width container, generous whitespace, no stretched text lines.

The hero must not push the download CTA below the first viewport on small phones.

## 13. Accessibility

- Skip link to main content.
- One `h1`, ordered headings, semantic landmarks.
- Visible focus ring using gold on espresso and espresso on cream.
- Minimum 44x44 tap targets.
- Descriptive alt text for every screenshot.
- Screenshot captions when the image conveys a step.
- No text baked into images as the only source of information.
- Reduced-motion support.
- Keyboard-operable video modal when the film is added.
- Escape closes the modal and focus returns to the trigger.
- Video pauses when the modal closes.
- No autoplay audio.
- Captions for speech in the film.
- Contrast checks for all text and controls.

## 14. Performance and SEO

- Use width and height on all images to prevent layout shift.
- Lazy-load below-fold screenshots.
- Use `decoding="async"`.
- Use `fetchpriority="high"` only for the hero image.
- The screenshot set is about 13.7 MB total, so do not preload the full set.
- Do not upscale the 1080x2400 screenshots.
- Keep the initial JS bundle small. No chart, carousel, or UI library.
- Title: `BistroBuddies | Coffee Shop Android App`.
- Meta description: factual summary of browsing, ordering, and APK download.
- Canonical URL: set at deployment time.
- Open Graph and Twitter metadata.
- Create a 1200x630 OG image from brand assets. Do not use a cropped phone screenshot as the only social image.
- Theme color: espresso.
- Favicon: official logo mark.
- No analytics or tracking scripts unless approved.

## 15. Privacy and Security

- Do not use restricted screenshots.
- Do not embed Firebase config, API keys, or backend URLs.
- Do not add a contact form or collect user data.
- Do not add third-party embeds.
- Do not link to unverified social accounts.
- Do not expose the APK checksum as a security guarantee.
- Keep the APK at its verified path and hash.
- If a screenshot is replaced, re-audit it for names, phone numbers, addresses, order IDs, QR codes, and account details.

## 16. Acceptance Criteria

- All displayed screenshots are from the safe list.
- No sensitive screenshot is imported or referenced in source.
- No em dashes in site copy.
- No invented business facts or unsupported claims.
- APK download returns the verified file.
- Version, size, and Android minimum match the manifest.
- Layout works at all five test widths with no horizontal overflow.
- Keyboard navigation and focus states are usable.
- Reduced-motion mode removes non-essential motion.
- Contrast requirements pass.
- Header, hero, origin, walkthrough, features, film placeholder, download, and footer are present.
- `npm run build` passes.
- `npm run lint` passes.
- The production build includes `dist/downloads/BistroBuddies.apk` with the verified hash.

## 17. Build Sequence

1. Phase 1: finalize this spec, create the typed asset manifest, and report asset status.
2. Phase 2: install GSAP, `@gsap/react`, Fontsource Fraunces, and Fontsource Manrope. Add tokens, fonts, base styles, shared components, header, and footer.
3. Phase 3: build hero and origin sections.
4. Phase 4: build the pinned walkthrough and feature section.
5. Phase 5: build the film placeholder, download section, and final footer content.
6. Phase 6: run responsive, accessibility, reduced-motion, build, lint, and APK verification checks.

## 18. Risks and Open Items

- Restricted checkout screenshots block an exact checkout step visual. Use `receipt-2` and `cart-2` instead.
- The Brag film and poster are not available yet. The film section stays a placeholder until they are.
- The official logo has a white background and no alpha channel. Use it on a white or paper surface, or request approval before creating a transparent derivative.
- The app is Android-only. Do not imply iOS availability.
- The APK is a development artifact until the team confirms it is the public release build. The site may offer it, but the team must approve that distribution.
