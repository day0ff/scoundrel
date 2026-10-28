import {getCardStrength} from "entities/pasteboards/helpers.ts";
import {getEncounterStrength} from "entities/pasteboards/encounters.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";

const cardValue = (card: Pick<PlayingCardType, "rank" | "strength">) => getCardStrength(card) ?? 0;

export const calculateScoreRange = (cards: PlayingCardType[], maxLife: number) => ({
    min: -cards.filter(card => card.role === "enemy").reduce((sum, card) => sum + getEncounterStrength(card), 0),
    max: maxLife + Math.max(0, ...cards.filter(card => card.role === "potion").map(cardValue)),
});

export const calculateGameScore = (state: GameStateType): number => {
    const life = state.hero.health.current;
    if (state.outcome === "defeat") {
        const remaining = [state.zones.dungeon, state.zones.room, state.zones.discard];
        return life - remaining.flatMap(zone => zone.cards)
            .filter(card => card.role === "enemy").reduce((sum, card) => sum + getEncounterStrength(card), 0);
    }
    const potions = state.zones.potions.cards.filter(card => card.role === "potion");
    const lastPotionValue = state.lastPlayedCard?.role === "potion" ? cardValue(state.lastPlayedCard) : 0;
    const bonus = life === state.hero.health.max
        ? Math.max(lastPotionValue, ...potions.map(cardValue)) : 0;
    return life + bonus;
};
