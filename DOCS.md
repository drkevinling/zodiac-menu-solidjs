# Zodiac Coffee Lounge Documentation

This document provides a comprehensive guide for maintaining and updating the Zodiac Coffee Lounge website.

## 🚀 Project Overview
- **Technology Stack**: SolidJS, TypeScript, Tailwind CSS.
- **Hosting**: Cloudflare Pages / Vercel.
- **Design Philosophy**: Mobile-first, premium aesthetics with high-quality imagery and smooth animations.

---

## 🛠️ Regular Operations

### 1. Changing or Adding Pictures
All images are stored in the `public/images/` directory.

**Steps to update an image:**
1.  **Prepare the Image**:
    - Use `.webp` format for better performance.
    - Recommended resolution: ~800x800px or larger for detail.
2.  **Upload to Project**:
    - Place the new image file in `/public/images/`.
3.  **Update Data**:
    - Open `src/data/menu.json`.
    - Find the item you want to update.
    - Change the `"image"` field to the new path (e.g., `"/images/new-latte.webp"`).
    - Update the `"alt"` text for accessibility.

---

### 2. Updating Menu Content
Menu data is entirely managed via `src/data/menu.json`.

**Fields Explained:**
- `id`: Unique identifier (e.g., `latte-special`).
- `name`: Full name of the coffee.
- `description`: A short, appetizing description.
- `price`: Numerical value (e.g., `4.50`).
- `category`: Matches an `id` in the `categories` array.
- `image`: Relative path from public root (e.g., `/images/item.webp`).
- `available`: `true` or `false` to show/hide the item.
- `order`: Numeric value to control display sequence.

---

### 3. Updating Social Media Links
Social links and their icons are managed in `src/data/social-links.json`.

- To change a URL, update the `url` field.
- To update the mobile app deep-link, change the `appUrl` field.
- Icons currently supported: `facebook`, `tiktok`, `instagram`.

---

## 🎨 UI & UX Guidelines (Standards)
The following rules MUST be followed during any UI updates (as defined in `AGENTS.md`):

- **Animation**: Use **Motion** or **Motion One** for animations.
- **Components**: Use **Tailwind** with **Headless UI**, **Preline**, or **FloatUI**.
- **Special Effects**: 
  - **Vanta.js** for backgrounds.
  - **COBE** for globe/3D scenes.
- **Aesthetics**: Maintain a premium feel with gradients, micro-animations, and high-quality typography.

---

## 🧪 Testing Guidelines

- **Framework**: Use **Vitest** for unit and integration testing.
- **Library**: Use **@testing-library/solid** for component testing.
- **Goal**: Maintain at least **80% code coverage**.
- **Organization**: Tests go in the `/tests/` folder in the root, matching the structure of `/src/`.
- **Primary Focus**: Ensure menu browsing and detail navigation flows are always tested.

---

## 💻 Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |
| `npm run preview` | Preview production build locally |

---

## 🚢 Deployment

### Cloudflare Pages
1. Push changes to the `main` branch.
2. Cloudflare will automatically build and deploy.

### Manual Vercel Deployment
1. Run `npx vercel`.
2. Ensure build command is `npm run build` and output directory is `dist`.

---

## 🐞 Troubleshooting: Vanta Clouds only behind logo on first load

### Symptoms
- On first visit (especially incognito / cold cache), clouds appear only behind the logo card.
- Welcome text and social buttons render outside the cloud background.
- After refresh, clouds expand correctly to the full header area.

### Root Cause
- This is a first-render sizing race:
  - Header content height changes after mount (image decode, font settle, animation start).
  - If Vanta binds to a nested overlay element, the canvas can keep stale dimensions from an early layout pass.
  - Refresh often hides the issue because assets are warmer and layout settles faster.

### Permanent Fix Applied
- Vanta now mounts directly on the real header container (`#hero-header`) instead of a child overlay.
- Vanta resize is forced with multiple stabilizers in `src/components/VantaClouds.tsx`:
  - `ResizeObserver` on the real host element.
  - `safeResize()` on `window` events: `load`, `resize`, `orientationchange`.
  - Staggered post-mount resizes (`0, 120, 300, 700, 1400, 2200ms`) to absorb late layout shifts.
- Header host is explicitly targeted in `src/App.tsx` via:
  - `<header id="hero-header" ...>`
  - `<VantaClouds targetId="hero-header" />`

### Why this works
- Vanta reads dimensions from the same element that visually owns the logo, welcome text, and social buttons.
- Any height growth in the header immediately triggers a canvas resize.

### Regression Prevention Checklist
- Do not mount Vanta on an absolutely-positioned child layer when full-header coverage is required.
- Keep `VantaClouds` attached to a stable host `id` and verify that `id` is unique.
- Preserve the `ResizeObserver` + post-mount resize sequence when refactoring.
- Test with:
  - normal mode hard reload
  - incognito first load
  - mobile viewport rotation
- If bug returns, inspect:
  - host element height vs Vanta canvas height at first paint
  - late layout shifts from image/font loading

### Files to check first
- `src/App.tsx`
- `src/components/VantaClouds.tsx`
