# zodiac-web-cloudflare Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-24

## Active Technologies

- TypeScript 5.x with SolidJS 1.x + SolidJS framework, Solid Router (for navigation), TypeScript for type safety (001-coffee-menu-website)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x with SolidJS 1.x: Follow standard conventions

## Recent Changes

- 001-coffee-menu-website: Added TypeScript 5.x with SolidJS 1.x + SolidJS framework, Solid Router (for navigation), TypeScript for type safety

<!-- MANUAL ADDITIONS START -->

## UI UX Design Guidelines

- **Animation**: Use [Motion](https://motion.dev) or **Motion One** for low‑level CSS/Web Animations.
- **Components**: Use **Tailwind** with [Headless UI](https://headlessui.com/), [Preline](https://preline.co/), or [FloatUI](https://floatui.com/).
- **FX**: Use [Vanta.js](https://vanta.js.org/) for quick backgrounds and [COBE](https://cobe.vercel.app/) for globe scenes.

## Testing Guidelines

- **Framework**: Use **Vitest** for unit and integration testing.
- **Library**: Use **@testing-library/solid** for component testing.
- **Coverage**: Aim for a minimum of **80% code coverage** for all business logic and core components.
- **Structure**: Tests should be placed in the `tests/` directory at the root, mimicking the `src/` directory structure.
- **Flows**: Critical user paths (e.g., browsing menu, detail navigation) must be covered by integration tests.

<!-- MANUAL ADDITIONS END -->
