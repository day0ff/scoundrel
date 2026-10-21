import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import type {RootState} from "../../types.ts";
import {updateProfileClassicGame} from "../profiles";
import {advancePhase, moveCard, playCard, setClassicGame} from "./index.ts";
import {audioManager} from "utils/AudioManager";

const CARD_SLIDE_SOUNDS = [
    "/sounds/card-slide-1.mp3",
    "/sounds/card-slide-2.mp3",
    "/sounds/card-slide-3.mp3",
    "/sounds/card-slide-4.mp3",
];

export const classicGameListenerMiddleware = createListenerMiddleware();
classicGameListenerMiddleware.startListening({
    matcher: isAnyOf(playCard, moveCard),
    effect: async (action, api) => {
        if (!playCard.match(action) && !moveCard.match(action)) return;
        const {payload} = action;
        const before = (api.getOriginalState() as RootState).classicGame;
        const after = (api.getState() as RootState).classicGame;
        const card = before?.zones[payload.from].cards.find(item => item.id === payload.cardId);
        if (!before || !after || !card || before === after) return;
        if (after.zones[payload.from].cards.some(item => item.id === card.id)) return;

        const movedToCrypt = !before.zones.crypt.cards.some(item => item.id === card.id)
            && after.zones.crypt.cards.some(item => item.id === card.id);
        const usedPotion = card.role === "potion" && movedToCrypt
            && (playCard.match(action) || (moveCard.match(action) && payload.from === "potions" && action.payload.to === "room"));
        let sounds: string[];
        if (usedPotion) {
            sounds = after.hero.health.current !== before.hero.health.current
                ? ["/sounds/bottle-pop-1.mp3", "/sounds/bottle-pop-2.mp3"]
                : CARD_SLIDE_SOUNDS;
        } else {
            if (!moveCard.match(action)) return;
            const {to} = action.payload;
            const removedEquipment = movedToCrypt && (card.role === "weapon" || card.role === "potion");
            const equippedFromRoom = payload.from === "room" && (to === "weapons" || to === "potions")
                && after.zones[to].cards.some(item => item.id === card.id);
            // Keep attack and other effect feedback as the only sound for those actions.
            if ((!removedEquipment && !equippedFromRoom) || after.animationSequence !== before.animationSequence) return;
            sounds = CARD_SLIDE_SOUNDS;
        }

        try {
            const url = sounds[Math.floor(Math.random() * sounds.length)];
            await audioManager.playSound({url});
        } catch (error: unknown) {
            console.warn("Unable to play card sound", error);
        }
    },
});
classicGameListenerMiddleware.startListening({
    matcher: isAnyOf(advancePhase, setClassicGame),
    effect: (_action, api) => {
        const {classicGame} = api.getState() as RootState;
        if (classicGame && !classicGame.outcome && classicGame.currentPhase !== classicGame.phaseLifecycle.waitingPhase) api.dispatch(advancePhase());
    },
});
classicGameListenerMiddleware.startListening({
    predicate: (action) => action.type.startsWith("classicGame/"),
    effect: (_action, api) => {
        const state = api.getState() as RootState;
        api.dispatch(updateProfileClassicGame(state.classicGame));
    },
});
