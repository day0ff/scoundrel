import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type FourWeaponPasteboardCardDataType = WeaponCardType<'4'>;

export const fourWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.4",
  type: "pasteboard",
  name: "card.pasteboard.weapon.4.name",
  suit: "weapon",
  rank: "4",
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
} as const satisfies FourWeaponPasteboardCardDataType;
