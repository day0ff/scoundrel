import {createSelector} from "@reduxjs/toolkit";
import {v4 as getUuid} from "uuid";
import {DeckDataType} from "entities/decks/types.ts";
import {decksCollectionsSelector} from "store/features/collections/selectors.ts";
import {DraggableCardType} from "components/DraggableCards/types.ts";

export const decksCardCollectionsSelector = createSelector(decksCollectionsSelector, (rooms: Array<DeckDataType<string>>): Array<DraggableCardType<DeckDataType<string>>> =>
    rooms.map((room) => ({
        ...room,
        isSelected: false,
        id: getUuid()
    }))
);

