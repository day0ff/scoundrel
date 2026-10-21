import { BASE_URL } from "constants.ts";
import { WeaponCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type TwoWeaponPasteboardCardDataType = WeaponCardType<'2'>;

export const twoWeaponPasteboardCard = {
  identifier: "day0ff:card-pasteboard.weapon.2",
  type: "pasteboard",
  name: "card.pasteboard.weapon.2.name",
  suit: "weapon",
  rank: "2",
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
} as const satisfies TwoWeaponPasteboardCardDataType;
