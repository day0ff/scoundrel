import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/J.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type JackWeaponPasteboardCardDataType = WeaponCardType<'J'>;

export const jackWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.J",
  type: "pasteboard",
  name: "card.pasteboard.weapon.J.name",
  suit: "weapon",
  rank: "J",
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
} as const satisfies JackWeaponPasteboardCardDataType;
