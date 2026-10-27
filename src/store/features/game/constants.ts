import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPack} from "entities/packs/constants.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import {createGame} from "./helpers.ts";

export const getInitialGame = (
    heroIdentifier?: Parameters<typeof createGame>[2],
    mode: GameModeType = "classic",
    packIdentifier: PackIdentifierType = GAME_MODES[mode].defaultPackIdentifier,
) => createGame(
    initPack(packIdentifier).decks.flatMap(deck => deck.pasteboards),
    getSeededRandom(),
    heroIdentifier,
    mode,
    packIdentifier,
);
