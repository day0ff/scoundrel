import {CollectionsStateType} from "./types.ts";
import {initHeroes} from "entities/heroes/constants.ts";
import {allDecks} from "entities/decks/constants.ts";

export const initialCollectionsState = ({
    heroes: initHeroes,
    decks: allDecks,
}) satisfies CollectionsStateType as CollectionsStateType;
