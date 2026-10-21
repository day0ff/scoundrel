import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/Q.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type QueenWeaponPasteboardCardDataType = WeaponCardType<'Q'>;

export const queenWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.Q",
  type: "pasteboard",
  name: "card.pasteboard.weapon.Q.name",
  suit: "weapon",
  rank: "Q",
  color: "blue",
  face: {
    base: faceBasePath,
    image: faceImagePath,
    imageMode: "darken",
  },
  back: {
    base: backBasePath,
    image: backImagePath,
    imageMode: "darken",
  },
} as const satisfies QueenWeaponPasteboardCardDataType;
