import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/A.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type AceWeaponPasteboardCardDataType = WeaponCardType<'A'>;

export const aceWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.A",
  type: "pasteboard",
  name: "card.pasteboard.weapon.A.name",
  suit: "weapon",
  rank: "A",
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
} as const satisfies AceWeaponPasteboardCardDataType;
