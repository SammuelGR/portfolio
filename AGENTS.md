# Canonical Agent Instructions

`AGENTS.md` is the canonical instruction file for AI coding agents working in this repository.

All source code, documentation, comments, commit messages, filenames, and project-maintained UI/content copy must be written in English unless the user explicitly requests otherwise.

Do not duplicate project rules across multiple agent-instruction files. If another agent-specific file is ever added, keep it as a short pointer to this file.

## Project Summary

This repository is a personal portfolio application built with React, TypeScript, and Vite.

The project is currently in its initial setup phase. Treat undocumented product, design, content, architecture, routing, styling, testing, analytics, and external data choices as undecided.

Do not turn undecided areas into permanent project rules without explicit user approval or a concrete implementation already present in the repository.

## Current Stack

- Runtime/build: Vite.
- UI: React.
- Animation: Motion for React.
- Icons: Lucide React.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Internationalization: i18next with react-i18next.
- Linting: oxlint.
- Formatting: Prettier.
- Package manager: npm, with `package-lock.json` committed.
- Deployment: Vercel.

Production URL:

```txt
https://sammuelgr.vercel.app
```

Authoritative versions and scripts live in `package.json`. Read it before assuming available commands or dependencies.

## Current Repository Layout

```txt
src/
  @types/
    i18next.d.ts
    resources.d.ts
  app/
    Header/
      constants.ts
      DesktopNavigation.tsx
      Header.tsx
      LanguageSwitcher.tsx
      MobileMenuButton.tsx
      MobileNavigation.tsx
      types.ts
    Hero/
      assets/
        hero-background.jpg
        hero-background.webp
      Hero.tsx
    index.tsx
  constants/
    breakpoints.ts
  hooks/
    useMediaQuery.ts
  locales/
    en-US/
      translations.json
    pt-BR/
      translations.json
  styles/
    globals.css
  utils/
    cn.ts
  i18n.ts
  main.tsx
scripts/
  generate-i18n-types.mjs
public/
  favicon.png
index.html
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
package.json
package-lock.json
README.md
AGENTS.md
CLAUDE.md
```

The repository does not yet have a stable application structure beyond the Vite starter layout.

Do not create broad folder hierarchies speculatively. Add directories only when there are actual files and a clear boundary to preserve.

## Build And Validation Commands

Use the scripts defined in `package.json`:

```bash
npm run dev
npm run dev:host
npm run build
npm run check
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm run preview
```

Before claiming a code change is ready, run the strongest relevant local gate available:

```bash
npm run check
npm run build
```

If a command fails because the project lacks configuration, dependencies, or implementation, report the exact blocker instead of weakening the standard silently.

## TypeScript And React Rules

- Preserve TypeScript strictness implied by the active `tsconfig` files.
- Do not introduce `any` unless the boundary is genuinely untyped and the reason is documented locally.
- Keep runtime values and type-only imports distinct.
- Avoid TypeScript constructs that conflict with `erasableSyntaxOnly`.
- Do not leave unused locals, unused parameters, dead exports, or commented-out code.
- Declare default-exported React components with `export default function ComponentName()` instead of a separate trailing export.
- Prefer small React components with explicit props types.
- Keep JSX readable; extract helpers or child components when branching or mapping starts to obscure structure.
- Avoid global mutable state unless the requirement explicitly needs it.
- Do not add routing, state management, animation, styling, data-fetching, or content libraries before the project has an accepted decision for that category.

## Internationalization Rules

- Supported locales are `en-US` and `pt-BR`.
- Locale identifiers must use BCP 47 casing.
- Fallback language is `en-US`.
- Runtime i18n setup lives in `src/i18n.ts`.
- Translation resources live in `src/locales/{locale}/translations.json`.
- Keep translations in JSON, not TypeScript.
- Locale JSON files must use flat, dot-delimited keys instead of nested objects.
- Keep the complete key searchable as a literal string in every locale file, for example `header.closeMenu`.
- Use a single `translation` namespace until there is concrete pressure for additional namespaces.
- Do not use `i18next-http-backend` or `i18next-browser-languagedetector` unless the project requirements change.
- Initial language resolution must prefer a valid stored user choice, then browser language, then the fallback language.
- Browser language detection is manual: any browser language starting with `pt` resolves to `pt-BR`; everything else resolves to `en-US`.
- User language choice is persisted in `localStorage`.
- `src/@types/resources.d.ts` is generated from `src/locales/en-US/translations.json`.
- `src/@types/i18next.d.ts` owns the i18next module augmentation.
- All locale files must expose the same translation key structure.
- `scripts/generate-i18n-types.mjs` generates the i18next resource types from the canonical `en-US` locale, validates that every supported locale exposes the same flat, dot-delimited keys, and expands those keys into the nested type structure required by typed selectors.
- Run `npm run i18n:types` after changing translation JSON files; `npm run typecheck`, `npm run check`, and `npm run build` also run it.

## Styling Rules

- Use Tailwind CSS for styling.
- Import every Lucide icon with an `Icon` suffix alias, for example `import { Menu as MenuIcon } from 'lucide-react'`.
- Global CSS lives in `src/styles/globals.css`.
- Use `src/utils/cn.ts` to compose conditional Tailwind classes.
- Keep global CSS limited to Tailwind imports, base element defaults, and truly global browser normalization.
- Keep CSS declarations alphabetized inside each rule unless cascade, browser compatibility, or readability requires a different order.
- Keep Tailwind utility classes roughly alphabetized when practical, but do not sacrifice responsive/state grouping or readability.
- Break long `className` values across lines when they exceed the configured Prettier print width.
- Use Tailwind's `motion-safe:` variant for non-essential CSS movement such as transforms and animations; keep non-motion transitions, such as color changes, outside it.
- Reusable viewport media-query rules live in `src/constants/breakpoints.ts`.
- Do not add theme tokens, fonts, color palettes, or design-specific values until those decisions are explicitly accepted.
- Do not create component CSS files unless Tailwind utilities are insufficient for a concrete implementation.

## Import Rules

- The `@/*` alias maps to `src/*`.
- Use local relative imports for files in the same directory or tightly coupled nearby files.
- Use the `@/` alias when it makes cross-directory imports clearer.
- Do not rewrite imports solely for style churn.

## Formatting Rules

Follow `.prettierrc`:

- `printWidth`: 120
- `singleQuote`: true
- `trailingComma`: `all`
- `arrowParens`: `always`
- `endOfLine`: `lf`

In multiline JSX, separate adjacent sibling elements and expression blocks at the same indentation level with a blank line.

Do not mix formatting-only changes into unrelated feature or bug-fix edits unless formatting is required by the touched code.

## Workflow Rules

- Inspect the existing files before editing.
- Keep changes scoped to the requested task.
- Do not do adjacent feature work.
- Do not perform opportunistic refactors.
- Do not add abstractions before there is repeated pressure in the code.
- Do not rename files, move code, or reorganize directories unless the current task requires it.
- Do not revert user changes unless the user explicitly asks for it.
- Prefer direct, readable implementation over clever indirection.

## Decision Policy

The following areas are not decided by this file:

- Design system.
- Routing.
- Content model.
- Project sections.
- Image/media strategy.
- Testing framework.
- Analytics.
- CMS or external data source.

When work touches an undecided area:

1. Use the smallest local implementation that satisfies the current task, or ask the user if the choice would become hard to reverse.
2. Document accepted decisions in the appropriate project documentation once such documentation exists.
3. Update this file only when the decision becomes a standing rule for agents.

## Dependency Policy

Do not add a dependency just to avoid writing small, clear project code.

Before adding any dependency, verify:

- The requirement is real in the current task.
- The package is maintained.
- The bundle/runtime cost is acceptable for a portfolio site.
- The same result cannot be achieved cleanly with the current stack.

Ask before adding dependencies that establish project direction, including styling systems, routers, animation libraries, testing frameworks, CMS clients, analytics SDKs, or UI kits.

## Documentation Rules

- Keep documentation factual and operational.
- Do not add motivational filler, generic React advice, or tutorial content.
- Document decisions, commands, constraints, invariants, and non-obvious tradeoffs.
- Keep `README.md` user-facing.
- Keep `AGENTS.md` agent-facing and normative.
- If design, architecture, or content decisions become substantial, prefer dedicated files under `docs/` instead of overloading this file.

## Maintenance Rules

- Any change to scripts, commands, tooling, package manager behavior, build output, deployment, or supported runtime should update the relevant documentation in the same change.
- Any new standing rule for agents belongs in this file.
- Do not version-bump, tag releases, publish, deploy, or change package ownership unless the user explicitly asks.
- Do not commit secrets, credentials, tokens, private URLs, analytics keys, or personal contact details not intentionally provided as public portfolio content.

## Review Expectations

When reviewing changes in this repository:

- Prioritize correctness, regressions, accessibility, performance, maintainability, and missing validation.
- Report concrete file/line findings first.
- Distinguish facts from recommendations.
- Do not approve work that fails the configured local gates unless the failure is unrelated and explicitly documented.
