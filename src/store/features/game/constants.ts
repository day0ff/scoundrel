import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initDeck} from "entities/decks/constants.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import {createGame} from "./helpers.ts";

export const getInitialGame = (heroIdentifier?: Parameters<typeof createGame>[2], mode: GameModeType = "classic") => createGame(
    GAME_MODES[mode].decks.flatMap(deck => initDeck(deck.identifier, [...deck.cards]).pasteboards),
    getSeededRandom(),
    heroIdentifier,
    mode,
);
