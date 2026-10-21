import type {RootState} from "../../types.ts";

export const classicGameSelector = (state: RootState) => state.classicGame;
export const classicGameOutcomeSelector = (state: RootState) => state.classicGame?.outcome;
export const heroClassicGameSelector = (state: RootState) => state.classicGame?.hero;
export const heroHealthClassicGameSelector = (state: RootState) => state.classicGame?.hero.health;
export const activeEffectAnimationClassicGameSelector = (state: RootState) => state.classicGame?.animationEvents?.[0];
export const selectedCardIdClassicGameSelector = (state: RootState) => state.classicGame?.selectedCardId;
export const currentPhaseClassicGameSelector = (state: RootState) => state.classicGame?.currentPhase;
export const phaseLifecycleClassicGameSelector = (state: RootState) => state.classicGame?.phaseLifecycle;
export const turnNumberClassicGameSelector = (state: RootState) => state.classicGame?.turnNumber;
export const isPlayerActionClassicGameSelector = (state: RootState) => !!state.classicGame && !state.classicGame.outcome && state.classicGame.currentPhase === state.classicGame.phaseLifecycle.waitingPhase;
export const seedClassicGameSelector = (state: RootState) => state.classicGame?.seed;
export const zonesClassicGameSelector = (state: RootState) => state.classicGame?.zones;
