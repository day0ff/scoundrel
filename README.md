# Scoundrel

This is the **Scoundrel** game repository, a browser-based React and TypeScript application. Scoundrel is a solitaire card game with a dungeon-crawling theme: cards represent monsters, weapons, and healing potions, and you must manage your health and equipment to survive the dungeon.

## Technologies

The project is a single-package application managed with npm. It uses:

- **React 19 and TypeScript** for the interface and typed application logic.
- **Vite** for the development server and production builds.
- **Redux Toolkit and React Redux** for state management, with **Redux Persist** for persistence.
- **React Router** for navigation.
- **styled-components** for styling.
- **dnd-kit** for draggable and sortable cards.
- **React Spring** for animations.
- **i18next and react-i18next** for localization.
- **vite-plugin-pwa** for progressive web app support.
- **ESLint** for linting.

Application code lives in `src/`: page and reusable component folders contain the UI, `store/` contains Redux state, and `entities/` contains game domain types and logic. Static assets live in `public/`.

## Development

Install dependencies and start the development server from the repository root:

```sh
npm ci
npm start
```

Other available commands:

| Command | Description |
| --- | --- |
| `npm run build` | Create a production build. |
| `npm run "check&build"` | Run TypeScript checks and create a production build. |
| `npm run lint` | Run ESLint. |
| `npm run preview` | Preview the production build locally. |

## Frame component

`Frame` is a reusable, resizable React container with a pixel-art border. It uses styled-components and SVG slices from a sprite image to keep corners at their native size while repeating the edges. It supports three border variants and custom sprite configurations.

For usage examples, sprite preparation, and configuration details, read the [Frame component README](src/components/Frame/README.md).
