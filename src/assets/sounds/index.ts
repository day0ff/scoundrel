import {BASE_URL} from "constants.ts";

const DiceHover = `${BASE_URL}/sounds/dice-hover.wav`;
const DiceRoll = `${BASE_URL}/sounds/dice-roll.wav`;
const PieceImpact1 = `${BASE_URL}/sounds/piece-impact-1.mp3`;
const PieceImpact2 = `${BASE_URL}/sounds/piece-impact-2.mp3`;

export const SOUND_PATHS = {
    Unlock: `${BASE_URL}/sounds/unlock.mp3`,
    Transition: `${BASE_URL}/sounds/transition.mp3`,
    CardShove: `${BASE_URL}/sounds/card-shove.ogg`,
    DeckShove: `${BASE_URL}/sounds/deck-shove.mp3`,
    Keypress1: `${BASE_URL}/sounds/keypress-1.mp3`,
    Keypress2: `${BASE_URL}/sounds/keypress-2.mp3`,
    Keypress3: `${BASE_URL}/sounds/keypress-3.mp3`,
    Win1: `${BASE_URL}/sounds/win-1.mp3`,
    Win2: `${BASE_URL}/sounds/win-2.mp3`,
    Defeat1: `${BASE_URL}/sounds/defeat-1.mp3`,
    Defeat2: `${BASE_URL}/sounds/defeat-2.mp3`,
    Theme1: `${BASE_URL}/sounds/theme-1.mp3`,
    DiceHover,
    DiceRoll,
    PieceImpact1,
    PieceImpact2,
} as const;
