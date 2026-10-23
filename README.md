# BistroBuddies Promo

Static Android app promotional site built with React, Vite, TypeScript, CSS Modules, and self-hosted Fraunces and Manrope fonts. GSAP and its React integration are installed for the later motion phase.

## Development

```sh
npm ci
npm run dev
```

## Validation and production build

```sh
npm run typecheck
npm run lint
npm run test:assets
npm run build
npm run preview
```

`npm run build` runs the public asset safety check **before** TypeScript and Vite, then verifies the generated `dist/`. Use this command for production builds. `npm run check:assets` and `npm run check:dist` also run the checks independently.

## Public asset policy

Vite copies everything in `public/`, including files the site never references. Keep private source material outside this repository.

- `scripts/public-assets.json` records the reviewed paths and SHA-256 digests for the 21 screenshots, original logo, and APK.
- The guard rejects restricted filenames at any depth, known restricted file hashes even after renaming, unreviewed files, symbolic links, missing assets, and altered reviewed bytes.
- New public assets require a content review and a deliberate update to the policy. Do not automatically regenerate the allowlist from everything in `public/`.
- The guard checks file identity, not the meaning of new image content. A changed or newly approved image still needs visual privacy review.
- The five restricted screenshots were moved to the approved external backup folder. Their backup records are outside the repository; no private image is needed to run the guard tests.

The APK remains at `public/downloads/BistroBuddies.apk`. The build copies it to `dist/downloads/BistroBuddies.apk` and verifies SHA-256:

```text
12bf82b502500f2eabd9e2942fa60c5624b62e135494a20a4ee8154a446cd5fd
```

## Foundation

- `src/styles/`: design tokens, Fontsource imports, base styles, focus and reduced-motion defaults.
- `src/components/`: Container, Button, SectionLabel, CoffeeRing, ScreenshotFrame, Header, Footer, and PageShell, each with a CSS Module.
- `src/content/assets.ts`: approved screenshot metadata, download metadata, and official logo reference.
- `src/content/navigation.ts`: shared in-page navigation.
- `docs/superpowers/specs/2026-10-23-bistrobuddies-promo-design.md`: approved design direction.

Phase 2 includes static structural sections with working navigation and downloads. Full hero choreography, the pinned screenshot walkthrough, detailed feature visuals, and the Brag film are later work. The film section is an explicit coming-soon placeholder with no play control.

The site has no backend, forms, analytics, or external font requests. Deployment and Phase 3 require separate approval.
