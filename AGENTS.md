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
- Language: TypeScript.
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
  App.tsx
  main.tsx
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
- Prefer small React components with explicit props types.
- Keep JSX readable; extract helpers or child components when branching or mapping starts to obscure structure.
- Avoid global mutable state unless the requirement explicitly needs it.
- Do not add routing, state management, animation, styling, data-fetching, or content libraries before the project has an accepted decision for that category.

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

- Styling system.
- Design system.
- Routing.
- Content model.
- Project sections.
- Animation approach.
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
