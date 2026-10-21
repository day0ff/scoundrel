import {createSelector} from "@reduxjs/toolkit";
import {v4 as getUuid} from "uuid";
import {jokersCollectionsSelector} from "store/features/collections/selectors.ts";
import {JokerDataType} from "entities/jokers/types.ts";
import {DraggableCardPropsType} from "components/DraggableCard/types.ts";

export const jokersCardCollectionsSelector = createSelector(jokersCollectionsSelector, (heroes: Array<JokerDataType<string>>): Array<DraggableCardPropsType & JokerDataType<string>> =>
    heroes.map((hero) => ({
        ...hero,
        isSelected: false,
        id: getUuid()
    }))
);

