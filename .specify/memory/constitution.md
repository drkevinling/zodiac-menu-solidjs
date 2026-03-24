<!--
## Sync Impact Report

**Version Change**: None → 1.0.0 (Initial ratification)

**Modified Principles**:
- All principles are newly established:
  * Code Quality (NON-NEGOTIABLE)
  * Testing Standards (NON-NEGOTIABLE)
  * User Experience Consistency (NON-NEGOTIABLE)
  * Performance Requirements (NON-NEGOTIABLE)

**Added Sections**:
- Quality Gates
- Development Workflow
- Governance (amendment procedure, versioning, compliance review)

**Removed Sections**: None (template initially populated)

**Templates Updated**:
- ✅ .specify/templates/plan-template.md (Constitution Check gates aligned)
- ✅ .specify/templates/spec-template.md (Non-Functional Requirements added)
- ✅ .specify/templates/tasks-template.md (Testing changed from OPTIONAL to MANDATORY)

**Follow-up TODOs**: None

**Deferred Items**: None
-->

# Zodiac Web Constitution

## Core Principles

### Code Quality (NON-NEGOTIABLE)

Code MUST be production-ready, maintainable, and follow language-specific best practices. All code MUST pass linting and formatting checks before merging. Code reviews are mandatory with at least one approval required. Naming conventions MUST be consistent across the codebase. Complex logic MUST be documented with clear comments. No commented-out code or dead code is allowed in production branches.

**Rationale**: High-quality code ensures maintainability, reduces technical debt, and enables team velocity by making the codebase predictable and safe to modify.

### Testing Standards (NON-NEGOTIABLE)

Test-Driven Development (TDD) is the default approach: write tests first, ensure they fail, then implement. All business logic MUST have corresponding unit tests with minimum 80% coverage. Integration tests MUST exist for all API endpoints and critical user flows. Tests MUST be automated and run in CI/CD pipeline. Test cases MUST cover edge cases and error scenarios. All tests MUST be independent and can run in any order.

**Rationale**: Comprehensive testing prevents regressions, enables confident refactoring, and serves as living documentation of system behavior and requirements.

### User Experience Consistency (NON-NEGOTIABLE)

UI components MUST follow established design system patterns with consistent styling, spacing, and interaction behavior. All interfaces MUST meet WCAG 2.1 AA accessibility standards. Responsive design is mandatory with mobile-first approach. Error messages MUST be clear, actionable, and presented in user-friendly language. Loading states and feedback indicators MUST be present for all async operations. Navigation patterns MUST be consistent across all pages and flows.

**Rationale**: Consistent UX reduces user cognitive load, builds trust, and ensures all users including those with disabilities can effectively use the application.

### Performance Requirements (NON-NEGOTIABLE)

All page loads MUST complete within 3 seconds on 3G connections. API responses MUST return within 500ms for 95th percentile under expected load. Bundle sizes MUST be optimized with code splitting and lazy loading. Database queries MUST be optimized and use proper indexing. Image assets MUST be optimized and served in modern formats. Performance budgets MUST be established and enforced in CI/CD. Real user monitoring (RUM) MUST be implemented to track actual performance metrics.

**Rationale**: Performance directly impacts user engagement, conversion rates, and SEO rankings. Fast, responsive applications provide competitive advantage and reduce user frustration.

## Quality Gates

All code changes MUST pass automated quality gates before merging:

- **Linting**: Zero warnings, zero errors
- **Formatting**: Automated formatter must pass without modifications
- **Unit Tests**: Minimum 80% coverage, all tests passing
- **Integration Tests**: All critical path tests passing
- **Performance**: Budget checks must pass (bundle size, load time)
- **Security**: No known vulnerabilities in dependencies

Quality gates MUST be enforced through branch protection rules. Exceptions require documented rationale and team lead approval.

## Development Workflow

All development MUST follow the established workflow:

1. Create feature branch from main
2. Write/update tests for the intended changes
3. Implement changes following code quality principles
4. Run full test suite locally
5. Create pull request with clear description
6. Address all review comments
7. Ensure all quality gates pass
8. Merge to main with squashing allowed

Commit messages MUST follow conventional commit format. Breaking changes MUST be clearly indicated in PR descriptions. Documentation updates are required for any user-facing changes.

## Governance

This Constitution is the ultimate authority for all development decisions. It supersedes any conflicting practices or conventions. All team members MUST familiarize themselves with these principles and apply them consistently.

**Amendment Procedure**: Proposed amendments MUST be documented with rationale, reviewed by at least two senior team members, and approved by project lead before adoption. All amendments MUST include a version bump and migration plan if existing code needs updates.

**Versioning**: Follow semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Principle removal or redefinition requiring backward-incompatible changes
- MINOR: New principles or sections added, existing guidance materially expanded
- PATCH: Clarifications, wording improvements, non-semantic refinements

**Compliance Review**: All pull requests MUST verify compliance with current Constitution principles. Code reviewers MUST check adherence to relevant principles during review. Non-compliance MUST block merging until resolved. Complexity deviations MUST be explicitly justified in PR descriptions.

**Version**: 1.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
