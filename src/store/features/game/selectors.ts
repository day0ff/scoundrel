import type {RootState} from "../../types.ts";

export const gameSelector = (state: RootState) => state.game;
export const gameOutcomeSelector = (state: RootState) => state.game?.outcome;
export const heroGameSelector = (state: RootState) => state.game?.hero;
export const heroHealthGameSelector = (state: RootState) => state.game?.hero.health;
export const activeEffectAnimationGameSelector = (state: RootState) => state.game?.animationEvents?.[0];
export const selectedCardIdGameSelector = (state: RootState) => state.game?.selectedCardId;
export const currentPhaseGameSelector = (state: RootState) => state.game?.currentPhase;
export const phaseLifecycleGameSelector = (state: RootState) => state.game?.phaseLifecycle;
export const turnNumberGameSelector = (state: RootState) => state.game?.turnNumber;
export const isPlayerActionGameSelector = (state: RootState) => !!state.game && !state.game.outcome && state.game.currentPhase === state.game.phaseLifecycle.waitingPhase;
export const seedGameSelector = (state: RootState) => state.game?.seed;
export const zonesGameSelector = (state: RootState) => state.game?.zones;

export const gameTimeSelector = (state: RootState) => state.game?.time ?? "00:00:00";
