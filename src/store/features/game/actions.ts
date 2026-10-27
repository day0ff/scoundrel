import type {ThunkAction, UnknownAction} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import {getPack} from "entities/packs/constants.ts";
import {selectedPackIdentifierSelector} from "store/features/profiles/selectors.ts";
import {resetDungeon} from "./index.ts";
import type {getInitialGame} from "./constants.ts";

type GameThunkType = ThunkAction<void, RootState, unknown, UnknownAction>;

// Preserve the active run's configuration, or use the profile's last selection.
export const resetSelectedDungeon = (
    heroIdentifier?: Parameters<typeof getInitialGame>[0],
    mode?: GameModeType,
): GameThunkType => (dispatch, getState) => {
    const state = getState();
    dispatch(resetDungeon(
        heroIdentifier ?? state.game?.hero.identifier,
        mode ?? state.game?.mode ?? "classic",
        state.game?.packIdentifier ?? selectedPackIdentifierSelector(state),
    ));
};

// Selecting a pack prepares an unstarted Classic run and remembers it on the profile.
export const selectGamePack = (identifier: PackIdentifierType): GameThunkType => (dispatch, getState) => {
    const pack = getPack(identifier);
    if (!pack || pack.isLocked || pack.isNotFound) return;
    const {game} = getState();
    if (game?.packIdentifier === identifier) return;
    dispatch(resetDungeon(game?.hero.identifier, "classic", identifier));
};
