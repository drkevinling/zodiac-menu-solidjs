# Quickstart Guide: Coffee Menu Website

**Feature**: Coffee Menu Website
**Date**: 2026-03-24
**Purpose**: Guide for developers to set up, run, test, and deploy the coffee menu website

## Overview

This guide provides step-by-step instructions for working with the Coffee Menu Website project. The website is a static site built with SolidJS that displays a coffee menu with pictures, optimized for mobile devices.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or later
- **npm**: Version 9.x or later (comes with Node.js)
- **Git**: For version control

Verify installations:
```bash
node --version  # Should be v18.x or later
npm --version   # Should be 9.x or later
git --version   # Should show git version
```

## Project Structure

```
zodiac-web-cloudflare/
├── src/
│   ├── components/          # SolidJS UI components
│   ├── data/                # Static data files
│   │   └── menu.json        # Coffee menu data (editable!)
│   ├── routes/              # Route definitions
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root application component
│   └── index.tsx            # Application entry point
├── tests/                   # Test files
├── public/                  # Static assets
│   └── images/             # Coffee item images
├── package.json
├── tsconfig.json
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── .eslintrc.json         # ESLint configuration
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zodiac-web-cloudflare
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- SolidJS and related packages
- TypeScript and type definitions
- Vite (build tool and dev server)
- Vitest (test runner)
- Testing Library for SolidJS
- ESLint (linting)
- Other development dependencies

### 3. Verify Installation

```bash
npm run dev
```

The development server should start at `http://localhost:5173`. Open this URL in your browser to verify the website loads.

## Development Workflow

### Starting the Development Server

```bash
npm run dev
```

- Opens at `http://localhost:5173`
- Hot module replacement (HMR) enabled
- Changes to files are reflected immediately

### Building for Production

```bash
npm run build
```

- Creates optimized production build in `dist/` directory
- Minifies JavaScript and CSS
- Optimizes assets for deployment

### Previewing Production Build

```bash
npm run preview
```

- Serves the production build locally
- Useful for testing before deployment

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Editing Menu Content

### Adding a New Coffee Item

1. Open `src/data/menu.json`
2. Add a new item to the `items` array:

```json
{
  "id": "mocha",
  "name": "Mocha",
  "description": "Rich chocolate coffee with steamed milk",
  "price": 4.50,
  "category": "hot-coffee",
  "image": "/images/mocha.jpg",
  "alt": "Mocha in a ceramic cup with chocolate dusting",
  "available": true
}
```

3. Add the image file to `public/images/mocha.jpg`
4. The item will appear automatically on the website

### Adding a New Category

1. Open `src/data/menu.json`
2. Add a new category to the `categories` array:

```json
{
  "id": "specialties",
  "name": "Specialties",
  "description": "Seasonal and specialty drinks",
  "order": 3
}
```

3. Update existing items to use the new category (set `"category": "specialties"`)
4. The category will appear in the filter dropdown

### Removing an Item or Category

1. Open `src/data/menu.json`
2. Remove the item or category object from the array
3. Save the file
4. The website will update automatically

**Important**: When removing a category, ensure all items in that category are also removed or reassigned to another category.

## Creating Components

### Component Template

```tsx
import { Component } from 'solid-js';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export default function MyComponent(props: MyComponentProps) {
  return (
    <div class="my-component">
      <h2>{props.title}</h2>
      <button onClick={props.onAction}>Click me</button>
    </div>
  );
}
```

### Adding a New Component

1. Create component file in `src/components/` (e.g., `MyComponent.tsx`)
2. Define props interface
3. Implement component logic
4. Export component
5. Import and use in routes or other components

## Adding Routes

### Adding a New Route

1. Create route component in `src/routes/` (e.g., `About.tsx`):

```tsx
import { Component } from 'solid-js';

export default function About() {
  return (
    <main>
      <h1>About Us</h1>
      <p>Learn about our coffee shop</p>
    </main>
  );
}
```

2. Register route in `src/routes/index.tsx` or create route file following Solid Router conventions
3. Update navigation links in `App.tsx` or navigation components

## Testing

### Writing Unit Tests

```typescript
// tests/unit/filtering.test.ts
import { describe, it, expect } from 'vitest';
import { filterByCategory } from '../../src/utils/filtering';
import mockMenu from '../__mocks__/menu-mock';

describe('filterByCategory', () => {
  it('should filter items by category', () => {
    const hotCoffeeItems = filterByCategory(mockMenu.items, 'hot-coffee');
    expect(hotCoffeeItems.length).toBeGreaterThan(0);
    expect(hotCoffeeItems.every(item => item.category === 'hot-coffee')).toBe(true);
  });
});
```

### Writing Integration Tests

```typescript
// tests/integration/Menu.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import Menu from '../../src/routes/Menu';
import mockMenu from '../__mocks__/menu-mock';

describe('Menu Route', () => {
  it('should display coffee items', () => {
    render(() => <Menu />);
    expect(screen.getByText('Hot Coffee')).toBeInTheDocument();
    expect(screen.getByText('Espresso')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test filtering.test.ts

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage Requirements

Per the Constitution Testing Standards:
- **Minimum 80% coverage** for all business logic
- **Integration tests** for critical user flows (menu browsing, item selection)
- **Edge case tests** (missing images, empty menu, slow connections)

## Accessibility Testing

### Using axe-core

```bash
npm install --save-dev @axe-core/vitest
```

```typescript
import { axe, toHaveNoViolations } from '@axe-core/vitest';
expect.extend(toHaveNoViolations);

test('Menu page is accessible', async () => {
  const { container } = render(() => <Menu />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators are visible
- [ ] Screen reader testing completed
- [ ] Touch targets are at least 44x44 pixels
- [ ] Text scaling works up to 200%

## Performance Optimization

### Checking Bundle Size

```bash
npm run build
npx vite-bundle-visualizer
```

### Lighthouse Audits

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audits
4. Target scores:
   - Performance: ≥90
   - Accessibility: 100
   - Best Practices: ≥90
   - SEO: ≥90

### Performance Budgets

- Initial bundle: <50KB gzipped
- Each route chunk: <30KB gzipped
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1

## Deployment

### GitHub Pages

1. Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/<repository-name>/',  // Add repository name
  build: {
    outDir: 'dist'
  }
});
```

2. Update `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Install and deploy:

```bash
npm install --save-dev gh-pages
npm run deploy
```

### Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist/`
4. Deploy on push to main branch

### Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow prompts to configure

### Manual Deployment

1. Build the site:

```bash
npm run build
```

2. Upload `dist/` directory contents to your hosting provider

## Troubleshooting

### Common Issues

**Issue**: Development server won't start

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Images not displaying

**Solution**:
- Verify image files exist in `public/images/`
- Check image paths in `menu.json` match actual filenames
- Ensure images are in supported formats (JPG, PNG, WebP)

**Issue**: Tests failing

**Solution**:
```bash
# Clear test cache
npm run test -- --clear-cache

# Run tests in debug mode
npm run test -- --debug
```

**Issue**: Build errors

**Solution**:
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix auto-fixable ESLint issues
npm run lint:fix
```

## Development Best Practices

### Code Style

- Use TypeScript for all files
- Follow SolidJS best practices (use signals, avoid manual DOM manipulation)
- Use functional components with hooks
- Keep components small and focused
- Use descriptive variable and function names

### Commit Messages

Follow conventional commit format:
- `feat: add category filtering feature`
- `fix: handle missing images gracefully`
- `docs: update quickstart guide`
- `test: add integration tests for menu browsing`
- `refactor: simplify filtering logic`

### Branching

- Create feature branch from main: `git checkout -b feature/my-feature`
- Commit changes: `git add . && git commit -m "feat: my feature"`
- Push branch: `git push origin feature/my-feature`
- Create pull request
- Address review comments
- Merge to main

## Resources

### Documentation

- [SolidJS Docs](https://www.solidjs.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library for SolidJS](https://testing-library.com/docs/solid-testing-library/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools

- [SolidJS Playground](https://playground.solidjs.com/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Vite Bundle Visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer)
- [Axe DevTools](https://www.deque.com/axe/devtools/)

### Constitution

Refer to the project Constitution for quality standards and development principles:
- Code Quality principles
- Testing Standards (80% coverage mandatory)
- UX Consistency (WCAG 2.1 AA)
- Performance Requirements (3s load on 3G)

## Getting Help

If you encounter issues not covered in this guide:

1. Check error messages in browser console
2. Check error messages in terminal
3. Review test failures for hints
4. Consult SolidJS documentation
5. Ask for help in team communication channels

## Next Steps

After completing this quickstart:

1. ✅ Set up development environment
2. ✅ Understand project structure
3. ✅ Run development server
4. ✅ Edit menu data to add your own coffee items
5. ✅ Add images to `public/images/`
6. ✅ Write tests for new features
7. ✅ Run accessibility checks
8. ✅ Build for production
9. ✅ Deploy to hosting provider

Happy brewing! ☕
