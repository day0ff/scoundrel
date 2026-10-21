# AGENTS.md

## Project overview

This is a single-package React and TypeScript application built with Vite and managed with npm.
The root `package.json` defines dependencies and scripts; `package-lock.json` is the dependency lockfile.

## Repository structure

```text
src/
├── main.tsx               # Application entry point
├── index.tsx              # Root application component
├── components/React/      # React components
├── componentsShared/React/ # Shared React components
├── pages/                 # Page components
├── store/                 # Redux Toolkit store, feature slices, selectors, and actions
├── entities/              # Game domain types and logic
├── context/               # React contexts
├── hooks/                 # React hooks
├── helpers/               # Helper functions
├── utils/                 # Utilities
├── styles/                # Shared styling
├── localization/          # Translations and localization configuration
└── assets/                # Source assets
public/                    # Static public assets
.agents/skills/            # Repository-specific agent skills
```

Keep code in the existing `src/` structure. Place framework-independent code in the
appropriate existing domain, helper, or utility module. Keep React UI code in the
component directories and React hooks in `src/hooks/`.

Source-root imports such as `store/hooks.ts` resolve from `src/` through the
TypeScript configuration and Vite's tsconfig-paths plugin.

## Commands

Run commands from the repository root:

* `npm ci` — install dependencies from the lockfile.
* `npm start` — start the Vite development server.
* `npm run build` — create a production build without a separate TypeScript check.
* `npm run "check&build"` — run the TypeScript project checks and build.
* `npm run lint` — run ESLint.
* `npm run preview` — preview the production build.

## General rules

* Use npm for package management and keep `package-lock.json` in sync with dependency changes.
* Use TypeScript.
* Follow the existing project structure before introducing new directories or abstractions.
* Reuse existing utilities, types, components, selectors, and actions when appropriate.
* Avoid introducing abstractions without a concrete need.
* Keep components and modules focused on a single responsibility.
* Do not modify unrelated code while implementing a task.
* Before creating a new pattern, check whether the repository already has an established pattern for the same problem.

## React components

React components follow the project's component structure convention.

Before creating or significantly refactoring a React component, read:

```text
.agents/skills/react-component-structure/SKILL.md
```

The skill defines:

* component folder structure;
* component file responsibilities;
* component props types;
* styled-components;
* Redux selectors;
* Redux actions;
* component constants;
* child component structure;
* rules for deciding when a file should exist.

The skill also contains a reference component that should be used as a structural example.

## Skills

Skills are stored in:

```text
.agents/skills/
```

Before performing work covered by a skill, read the relevant `SKILL.md`.

Do not assume that a skill's conventions apply to unrelated parts of the project.
