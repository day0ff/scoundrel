import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/67.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type SixWeaponPasteboardCardDataType = WeaponCardType<'6'>;

export const sixWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.6",
  type: "pasteboard",
  name: "card.pasteboard.weapon.6.name",
  suit: "weapon",
  rank: "6",
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
} as const satisfies SixWeaponPasteboardCardDataType;
