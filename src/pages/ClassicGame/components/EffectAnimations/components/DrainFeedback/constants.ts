import {BASE_URL} from "constants.ts";

export const POP_SOUNDS = [1, 2].map(index => `${BASE_URL}/sounds/bottle-pop-${index}.mp3`);
export const DRAIN_SOUNDS = [1, 2].map(index => `${BASE_URL}/sounds/draining-${index}.mp3`);

export const GATHER_DURATION_MS = 650;
export const CRYPT_FLIGHT_DURATION_MS = 650;
export const DRAIN_SPELL_SOUND = `${BASE_URL}/sounds/spell-drain.mp3`;
