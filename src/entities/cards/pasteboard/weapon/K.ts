import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type KingWeaponPasteboardCardDataType = WeaponCardType<'K'>;

export const kingWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.K",
  type: "pasteboard",
  name: "card.pasteboard.weapon.K.name",
  suit: "weapon",
  rank: "K",
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
} as const satisfies KingWeaponPasteboardCardDataType;
