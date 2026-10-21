---
name: react-component-structure
description: Follow repository conventions when creating or refactoring React components and organizing their props, styles, selectors, actions, constants, and child components.
---

# React Component Structure

## Purpose

This skill defines the required structure for React components in the application.

Use this skill when:

* creating a new React component;
* refactoring an existing React component;
* splitting a component into child components;
* adding Redux selectors or component-specific Redux actions;
* deciding where component-specific types, styles, constants, or actions should live.

The goal is to keep each component self-contained and make its related code easy to find.

---

# Component directory structure

Each non-trivial React component should have its own directory named after the component.

The standard structure is:

```text
NameOfComponent/
├── index.tsx
├── types.ts
├── styles.ts
├── selectors.ts
├── constants.ts
├── actions.ts
└── components/
    └── ChildComponent/
        ├── index.tsx
        ├── types.ts
        ├── styles.ts
        ├── selectors.ts
        ├── constants.ts
        ├── actions.ts
        └── components/
```

Not every file is required.

Create a file only when the component actually needs it.

For example, a presentational component with no Redux state may only need:

```text
Button/
├── index.tsx
├── types.ts
└── styles.ts
```

A component using Redux may additionally have:

```text
UserList/
├── index.tsx
├── types.ts
├── styles.ts
├── selectors.ts
├── constants.ts
└── actions.ts
```

---

# `index.tsx`

`index.tsx` is the entry point of the component.

It contains:

* the React functional component;
* component rendering logic;
* event handlers that are local to the component;
* calls to component selectors;
* dispatching Redux actions;
* composition of child components.

Example:

```tsx
import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks.ts';

import { clearItems } from './actions.ts';
import { selectItems } from './selectors.ts';
import { Container, Title } from './styles.ts';
import type { ItemListPropsType } from './types.ts';

const ItemList: FC<ItemListPropsType> = ({ title }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  const handleClear = () => {
    dispatch(clearItems());
  };

  return (
    <Container>
      <Title>{title}</Title>

      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      <button onClick={handleClear}>Clear</button>
    </Container>
  );
};

export default ItemList;
```

Do not put the following into `index.tsx` when they have their own dedicated file:

* styled-components;
* Redux selector definitions;
* large collections of constants;
* component-specific TypeScript types;
* reusable or combined Redux action logic.

---

# Translation keys

Do not build composite translation keys with template literals or string concatenation
(for example, `` t(`ui.gameResult.${outcome}.title`) ``). For variable-dependent keys,
define a dictionary of explicit, complete translation keys in `constants.ts` and
use a function that returns the required key by looking up the variable in that
dictionary. Pass the function's result to `t()` or `Trans`.

Use `as const satisfies` with the existing `TranslationKeysType` from
`localization/types.ts` to validate dictionary values and preserve literal types.
Reuse the relevant domain type for dictionary keys when one exists. Static literal
keys and existing values already typed as translation keys can be passed directly.

See `example/ExampleComponent/constants.ts` and `index.tsx` for a typed dictionary
and a `getTitleTranslationKey(collection)` lookup function used with `t()`.

---

# `types.ts`

`types.ts` contains types used specifically by the component.

The component props must use a type named after the component:

```ts
export type NameOfComponentPropsType = {
  // props
};
```

Example:

```ts
export type ItemListPropsType = {
  title: string;
  isReadonly?: boolean;
};

type Item = {
  id: string;
  name: string;
};
```

Use `type` for component types.

Do not duplicate application or domain types that already exist elsewhere in the project.

If a type is shared by multiple unrelated components, move it to the appropriate shared/domain location instead of duplicating it.

---

# `styles.ts`

`styles.ts` contains styled-components belonging to the component.

Example:

```ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h2`
  margin: 0;
`;
```

Keep component-specific styles in this file.

Child components define their own styles in their own `styles.ts`.

Do not create a global style for something that is only used by one component.

Follow the existing styled-components conventions in the repository.

## Responsive styles with Theme media queries

Use `theme.media` in component `styles.ts` files for shared width queries:

```ts
export const ContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media ${({theme}) => theme.media.tablet} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media ${({theme}) => theme.media.mobile} {
        grid-template-columns: 1fr;
    }
`;
```

The queries are defined in `src/context/Theme/constants.ts` and supplied by the
Theme provider for both color schemes. They contain the condition only; write
`@media` before the interpolation.

* `mobile`: maximum width 480px;
* `tablet`: maximum width 768px;
* `laptop`: maximum width 1024px;
* `desktop`: maximum width 1200px;
* `tv`: minimum width 1201px.

Maximum-width queries are cumulative: `tablet` also includes mobile widths.
Place narrower overrides after wider ones when they change the same property.
These names describe viewport widths, not device detection. In particular,
`theme.media.tablet` matches `theme.device?.isTabletCascade`, whereas
`theme.device?.isTablet` covers only 481–768px.

For orientation or component-specific height constraints, combine conditions:

```ts
@media ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
    gap: 4px;
}
```

Prefer media queries for layout styling; use `theme.device` flags when React
rendering or behavior needs to depend on viewport width. See
`example/ExampleComponent/styles.ts` for a responsive list example.

---

# `selectors.ts`

`selectors.ts` contains Redux selectors used specifically by the component.

Example:

```ts
import {createSelector} from "@reduxjs/toolkit";
import {blueprintsCollectionsSelector} from "store/features/collections/selectors.ts";
import {MAX_VISIBLE_ITEMS} from "./constants.ts";

export const exampleItemsSelector = createSelector(
    blueprintsCollectionsSelector,
    (blueprints) => blueprints.slice(0, MAX_VISIBLE_ITEMS)
);
```

Selectors that are specific to the component belong in this file.

Do not define component-specific selectors directly inside `index.tsx`.

## Reusable selectors

If a selector is a domain-level selector that is used by multiple unrelated components, it should live with the corresponding Redux slice/domain logic rather than inside one component.

Do not duplicate an existing selector just to keep it local.

---

# `constants.ts`

`constants.ts` contains constants used by the component.

Example:

```ts
export const MAX_VISIBLE_ITEMS = 10;

export const EMPTY_LIST_MESSAGE = 'No items available';
```

Only move meaningful constants here.

Do not move every string or number literal into `constants.ts`.

Use the existing project conventions when deciding whether a value should be a constant.

Application-wide constants should remain in their appropriate shared module.

---

# `actions.ts`

`actions.ts` contains component-specific Redux action logic.

Use this file when an operation requires:

* multiple Redux actions;
* component-specific dispatch logic;
* combining existing Redux actions into one component operation.

Example:

```ts
import type { AppDispatch } from 'store/types.ts';
import { itemsActions } from '../../store/itemsSlice';

export const clearItems = () => (dispatch: AppDispatch) => {
  dispatch(itemsActions.clear());
  dispatch(itemsActions.resetSelection());
};
```

The component can then use:

```ts
dispatch(clearItems());
```

## Direct dispatch

If an interaction only dispatches one existing Redux action, dispatch it directly from the component.

Example:

```ts
dispatch(itemsActions.removeItem(itemId));
```

Do not create a wrapper that only renames an existing action:

```ts
// Do not do this.
export const removeItem = (itemId: string) =>
  itemsActions.removeItem(itemId);
```

`actions.ts` exists for component-specific or combined action logic, not for creating unnecessary aliases.

---

# `components/`

`components/` contains child components that belong specifically to the parent component.

Example:

```text
UserList/
├── index.tsx
├── types.ts
├── styles.ts
├── selectors.ts
└── components/
    ├── UserListHeader/
    │   ├── index.tsx
    │   ├── types.ts
    │   └── styles.ts
    │
    └── UserListItem/
        ├── index.tsx
        ├── types.ts
        └── styles.ts
```

Child components follow the same rules as parent components.

A child component may have its own:

* `types.ts`;
* `styles.ts`;
* `selectors.ts`;
* `constants.ts`;
* `actions.ts`;
* `components/`.

Create only the files that the child actually needs.

---

# Component ownership

Put a component inside another component's `components/` directory when it is primarily an implementation detail of the parent.

Example:

```text
UserList/
└── components/
    └── UserListItem/
```

If a component becomes reusable across unrelated parts of the application, move it to an appropriate shared component location.

Do not keep a broadly reusable component deeply nested inside one feature.

---

# Redux rules

Follow these rules:

1. Component-specific selectors belong in `selectors.ts`.
2. Reusable domain selectors belong with the Redux/domain logic.
3. Simple single-action dispatches can be performed directly in `index.tsx`.
4. Combined or component-specific dispatch logic belongs in `actions.ts`.
5. Do not create wrappers that only rename existing Redux actions.
6. Do not duplicate existing selectors or Redux logic.
7. Use `useAppSelector` and `useAppDispatch` from `store/hooks.ts` and `createSelector` from `@reduxjs/toolkit`. New components do not need `connect`, map-state/map-dispatch prop types, or selector factories unless their behavior specifically requires them.

---

# Creating a new component

When creating a new component:

1. Create a directory named after the component.
2. Create `index.tsx`.
3. Create `types.ts` when the component has props or component-specific types.
4. Create `styles.ts` when the component uses styled-components.
5. Create `selectors.ts` when the component needs component-specific Redux selectors.
6. Create `constants.ts` when the component has meaningful component-specific constants.
7. Create `actions.ts` when the component needs combined or component-specific Redux action logic.
8. Create `components/` when the component has child components that belong specifically to it.
9. Follow the reference component included with this skill.
10. Reuse existing project types, selectors, actions, utilities, and components where appropriate.

---

# Reference implementation

The directory:

```text
example/ExampleComponent/
```

contains a reference implementation.

Use it to understand the expected structure and coding style. It follows
`../../../src/componentsShared/Collections` and its nested
`BlueprintCard` component:

* use a named `const` component typed with `FC<ComponentNamePropsType>` and a default export;
* use `ComponentNamePropsType` for props and reuse existing domain types;
* name the styles file `styles.ts` and give styled exports a `Styled` suffix;
* use configured source-root imports for shared modules and relative imports for component-local files;
* include `.ts` extensions for local types, selectors, constants, and styles, and import components by directory;
* follow the surrounding double-quoted imports and four-space indentation.

The example selects a limited list from the existing blueprint collection and renders
translated names through `components/ExampleItem/`. Its constant controls that limit;
`actions.ts` reads that list from the current state and opens a summary dialog. The
component dispatches this small thunk with `useAppDispatch`. This demonstrates
component-specific action logic rather than an alias for an existing action. The imports use this repository's
`src` aliases; this skill example is not mounted in the application.

Other snippets in this document illustrate responsibilities; their hypothetical item
store and actions must be replaced with existing project modules before use.

The reference implementation is a structural example, not application logic.

When creating a new component:

* follow the same file organization;
* follow the same naming conventions;
* follow the same import conventions;
* follow the same separation of responsibilities.

Do not copy business logic from the example.

---

# Important

Do not create every possible file automatically.

The following is valid:

```text
SimpleCard/
├── index.tsx
├── types.ts
└── styles.ts
```

The following is also valid:

```text
ComplexCard/
├── index.tsx
├── types.ts
├── styles.ts
├── selectors.ts
├── constants.ts
├── actions.ts
└── components/
    ├── CardHeader/
    └── CardContent/
```

Choose the structure based on the actual responsibilities of the component.
