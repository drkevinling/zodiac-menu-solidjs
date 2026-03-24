# Tasks: Coffee Menu Website

**Input**: Design documents from `/specs/001-coffee-menu-website/`
**Prerequisites**: plan.md, spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Tests are MANDATORY per Constitution Testing Standards - unit tests (min 80% coverage) for business logic, integration tests for critical paths (menu browsing, item selection, filtering).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project structure**: `src/`, `tests/`, `public/` at repository root
- Paths follow the structure defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure: src/components/, src/data/, src/routes/, src/types/, src/utils/, tests/unit/, tests/integration/, tests/__mocks__/, public/images/
- [X] T002 Initialize TypeScript 5.x project with SolidJS 1.x dependencies (solid-js, @solidjs/router) - package.json created, npm install in progress
- [X] T003 [P] Configure Vite build tool and dev server in vite.config.ts
- [X] T004 [P] Configure Vitest test runner in vitest.config.ts
- [X] T005 [P] Configure ESLint with SolidJS rules in .eslintrc.json
- [X] T006 [P] Configure TypeScript compiler options in tsconfig.json
- [X] T007 [P] Create package.json with scripts (dev, build, test, lint, preview)
- [X] T008 [P] Create public/index.html entry point
- [X] T009 Create src/index.tsx application entry point

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 Define TypeScript types for CoffeeMenuItem in src/types/menu.ts
- [X] T011 [P] Define TypeScript types for MenuCategory in src/types/menu.ts
- [X] T012 [P] Define TypeScript types for Menu in src/types/menu.ts
- [X] T013 Create sample menu data with categories and items in src/data/menu.json
- [X] T014 [P] Create menu mock data for testing in tests/__mocks__/menu-mock.ts
- [X] T015 Create price formatting utility function in src/utils/formatting.ts
- [X] T016 [P] Create menu data loading utility in src/utils/menu-loader.ts
- [X] T017 Create base App.tsx component with router setup in src/App.tsx
- [X] T018 [P] Configure Solid Router in src/routes/index.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Coffee Menu (Priority: P1) 🎯 MVP

**Goal**: Display a browsable list of coffee menu items with name, description, price, and image, optimized for mobile devices.

**Independent Test**: Open the website on a mobile device and scroll through the menu, verifying all items are visible with required information (name, description, price, image) and the layout is mobile-optimized.

### Tests for User Story 1 (MANDATORY) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation (per Constitution Testing Standards)**

- [X] T019 [P] [US1] Unit test for price formatting in tests/unit/formatting.test.ts
- [X] T020 [P] [US1] Unit test for menu data loading in tests/unit/menu-loader.test.ts
- [X] T021 [P] [US1] Integration test for menu browsing flow in tests/integration/Menu.test.ts
- [X] T022 [P] [US1] Integration test for mobile responsiveness in tests/integration/Menu.test.ts

### Implementation for User Story 1

- [X] T023 [P] [US1] Create shared Button component in src/components/shared/Button.tsx
- [X] T024 [P] [US1] Create shared Card component in src/components/shared/Card.tsx
- [X] T025 [P] [US1] Create shared Container component in src/components/shared/Container.tsx
- [X] T026 [P] [US1] Create shared Image component with lazy loading in src/components/shared/Image.tsx
- [X] T027 [P] [US1] Create CoffeeItem component in src/components/CoffeeItem/CoffeeItem.tsx
- [X] T028 [P] [US1] Create CoffeeMenu component in src/components/CoffeeMenu/CoffeeMenu.tsx
- [X] T029 [US1] Create Menu route in src/routes/Menu.tsx (depends on T023-T028)
- [X] T030 [US1] Implement responsive CSS Grid layout for CoffeeMenu in src/components/CoffeeMenu/CoffeeMenu.css
- [X] T031 [US1] Integrate CoffeeMenu and CoffeeItem components in Menu route
- [X] T032 [US1] Add loading skeleton states for images in CoffeeItem component
- [X] T033 [US1] Implement error handling for missing images in CoffeeItem component
- [X] T034 [US1] Add accessibility attributes (alt text, semantic HTML) to CoffeeItem and CoffeeMenu
- [X] T035 [US1] Add image optimization (lazy loading, responsive sizes) to shared Image component
- [X] T036 [US1] Configure root route redirect to /menu in src/routes/index.tsx
- [X] T037 [US1] Add Tailwind CSS configuration and refactor components to use Tailwind utilities

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Coffee Item Details (Priority: P2)

**Goal**: Provide a detailed view of individual coffee items with enlarged image and full description.

**Independent Test**: Tap on a coffee item and verify the detail view opens with expanded information and larger image, then return to the menu list.

### Tests for User Story 2 (MANDATORY) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation (per Constitution Testing Standards)**

- [ ] T037 [P] [US2] Integration test for item detail navigation in tests/integration/Detail.test.ts
- [ ] T038 [P] [US2] Integration test for scroll position preservation in tests/integration/Detail.test.ts
- [ ] T039 [P] [US2] Integration test for back navigation in tests/integration/Detail.test.ts

### Implementation for User Story 2

- [ ] T040 [P] [US2] Create CoffeeDetail component in src/components/CoffeeDetail/CoffeeDetail.tsx
- [ ] T041 [US2] Create Detail route in src/routes/Detail.tsx (depends on T040)
- [ ] T042 [US2] Implement enlarged image display in CoffeeDetail component
- [ ] T043 [US2] Implement back navigation button in CoffeeDetail component
- [ ] T044 [US2] Add navigation link from CoffeeItem to Detail view
- [ ] T045 [US2] Configure Detail route parameter (itemId) in Solid Router
- [ ] T046 [US2] Implement item lookup by ID in Detail route
- [ ] T047 [US2] Add accessibility features to CoffeeDetail (focus management, ARIA)
- [ ] T048 [US2] Handle invalid item ID with error message in Detail route

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Filter Menu by Category (Priority: P3)

**Goal**: Enable users to filter coffee menu items by category (Hot Coffee, Iced Coffee, Specialties, etc.).

**Independent Test**: Select different categories and verify only items in that category are displayed, with ability to reset to show all items.

### Tests for User Story 3 (MANDATORY) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation (per Constitution Testing Standards)**

- [ ] T049 [P] [US3] Unit test for category filtering logic in tests/unit/filtering.test.ts
- [ ] T050 [P] [US3] Integration test for category filtering in tests/integration/Menu.test.ts
- [ ] T051 [P] [US3] Integration test for reset filter in tests/integration/Menu.test.ts

### Implementation for User Story 3

- [ ] T052 [P] [US3] Create category filtering utility in src/utils/filtering.ts
- [ ] T053 [P] [US3] Create CategoryFilter component in src/components/CategoryFilter/CategoryFilter.tsx
- [ ] T054 [US3] Implement category filter UI with "All Categories" option in CategoryFilter component
- [ ] T055 [US3] Integrate CategoryFilter component with CoffeeMenu component
- [ ] T056 [US3] Add filter state management in CoffeeMenu component
- [ ] T057 [US3] Implement filtered item display in CoffeeMenu component
- [ ] T058 [US3] Add accessibility to CategoryFilter (keyboard navigation, ARIA labels)
- [ ] T059 [US3] Handle empty filter results with "No items found" message
- [ ] T060 [US3] Style CategoryFilter for mobile touch targets (≥44px)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T061 [P] Add comprehensive alt text validation in tests/unit/formatting.test.ts
- [ ] T062 [P] Add edge case tests (empty menu, missing images, long descriptions) in tests/unit/filtering.test.ts
- [ ] T063 [P] Add accessibility tests with axe-core in tests/integration/accessibility.test.ts
- [ ] T064 [P] Document component usage patterns in README.md
- [ ] T065 Code cleanup and refactoring to meet Code Quality principles
- [ ] T066 Performance optimization to meet performance budgets (page loads <3s on 3G)
- [ ] T067 [P] Additional unit tests to achieve 80% coverage minimum
- [ ] T068 UX consistency validation against WCAG 2.1 AA standards
- [ ] T069 Run quickstart.md validation and update if needed
- [ ] T070 Optimize bundle sizes with code splitting and lazy loading
- [ ] T071 Add responsive image variants (small, medium, large) to menu data
- [ ] T072 Configure image optimization in Vite build
- [ ] T073 Add error boundaries for graceful degradation
- [ ] T074 Implement progressive enhancement strategies
- [ ] T075 Add loading states and spinner components
- [ ] T076 Add color contrast validation to test suite

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation (Constitution Testing Standards)
- Components before routes
- Utilities before components
- Core implementation before integration
- Story complete before moving to next priority
- Verify 80% test coverage achieved before story completion

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Shared components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for price formatting in tests/unit/formatting.test.ts"
Task: "Unit test for menu data loading in tests/unit/menu-loader.test.ts"
Task: "Integration test for menu browsing flow in tests/integration/Menu.test.ts"
Task: "Integration test for mobile responsiveness in tests/integration/Menu.test.ts"

# Launch all shared components for User Story 1 together:
Task: "Create shared Button component in src/components/shared/Button.tsx"
Task: "Create shared Card component in src/components/shared/Card.tsx"
Task: "Create shared Container component in src/components/shared/Container.tsx"
Task: "Create shared Image component with lazy loading in src/components/shared/Image.tsx"

# Launch all Coffee components for User Story 1 together:
Task: "Create CoffeeItem component in src/components/CoffeeItem/CoffeeItem.tsx"
Task: "Create CoffeeMenu component in src/components/CoffeeMenu/CoffeeMenu.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently on mobile device
5. Deploy/demo if ready (MVP delivers immediate value!)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (P1 - priority)
   - Developer B: User Story 2 (P2)
   - Developer C: User Story 3 (P3)
3. Stories complete and integrate independently
4. Final Polish phase completed together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Performance requirement: page loads <3s on 3G connections
- Accessibility requirement: WCAG 2.1 AA compliance
- Test coverage requirement: minimum 80% for business logic
