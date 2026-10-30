import { CollectionsStateType } from "./types.ts";
import { initHeroes } from "entities/heroes/constants.ts";
import { allDecks } from "entities/decks/constants.ts";
import { allPacks } from "entities/packs/constants.ts";
import { IS_DEV } from "constants.ts";

// To simulate one classic-pack victory, add this property inside progress:
// gamesWon: {"classic:day0ff:pack-classic": 1}
// This makes hasBeatenClassicPackSelector return true and enables PackSelection navigation.
export const initialCollectionsState = {
  heroes: initHeroes,
  decks: allDecks,
  packs: allPacks.map((pack) => ({ ...pack })),
  progress: {
    gamesCompleted: {},
    enemiesDefeated: {},
    processedEvents: {},
    // ...(IS_DEV && { gamesWon: { "classic:day0ff:pack-classic": 1 } }),
  },
} satisfies CollectionsStateType as CollectionsStateType;
