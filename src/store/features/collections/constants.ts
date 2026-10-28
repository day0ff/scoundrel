import {CollectionsStateType} from "./types.ts";
import {initHeroes} from "entities/heroes/constants.ts";
import {allDecks} from "entities/decks/constants.ts";
import {allPacks} from "entities/packs/constants.ts";

export const initialCollectionsState = ({
    heroes: initHeroes,
    decks: allDecks,
    packs: allPacks.map(pack => ({...pack})),
    progress: {gamesCompleted: {}, enemiesDefeated: {}, processedEvents: {}},
}) satisfies CollectionsStateType as CollectionsStateType;
