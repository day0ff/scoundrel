import {createSelector} from "@reduxjs/toolkit";
import {blueprintsCollectionsSelector} from "store/features/collections/selectors.ts";
import {MAX_VISIBLE_ITEMS} from "./constants.ts";

export const exampleItemsSelector = createSelector(
    blueprintsCollectionsSelector,
    (blueprints) => blueprints.slice(0, MAX_VISIBLE_ITEMS)
);
