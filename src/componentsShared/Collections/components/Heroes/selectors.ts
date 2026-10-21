import {createSelector} from "@reduxjs/toolkit";
import {v4 as getUuid} from "uuid";
import {HeroDataType} from "entities/heroes/types.ts";
import {heroesCollectionsSelector} from "store/features/collections/selectors.ts";
import {DraggableCardPropsType} from "components/DraggableCard/types.ts";

export const heroesCardCollectionsSelector = createSelector(heroesCollectionsSelector, (heroes: Array<HeroDataType<string>>): Array<DraggableCardPropsType & HeroDataType<string>> =>
    heroes.map((hero) => ({
        ...hero,
        isSelected: false,
        id: getUuid()
    }))
);

