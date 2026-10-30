import { BASE_URL } from "constants.ts";
import { getPackCard } from "entities/cards/packs/helpers.ts";
import type { PackDataType } from "./types.ts";
import { PasteboardDataType } from "entities/pasteboards/types.ts";
import { RankType } from "entities/types.ts";

const darkLordCardsIdentifiers = [
  "day0ff:pasteboard-dark.1",
  "day0ff:pasteboard-dark.2",
  "day0ff:pasteboard-dark.3",
  "day0ff:pasteboard-dark.4",
  "day0ff:pasteboard-dark.5",
  "day0ff:pasteboard-dark.6",
  "day0ff:pasteboard-dark.7",
  "day0ff:pasteboard-dark.8",
  "day0ff:pasteboard-dark.9",
  "day0ff:pasteboard-dark.T",
  "day0ff:pasteboard-dark.1",
  "day0ff:pasteboard-dark.2",
  "day0ff:pasteboard-dark.3",
  "day0ff:pasteboard-dark.4",
  "day0ff:pasteboard-dark.5",
  "day0ff:pasteboard-dark.6",
  "day0ff:pasteboard-dark.7",
  "day0ff:pasteboard-dark.8",
  "day0ff:pasteboard-dark.9",
  "day0ff:pasteboard-dark.T",
  "day0ff:pasteboard-dark.J",
  "day0ff:pasteboard-dark.Q",
  "day0ff:pasteboard-dark.K",
] as const satisfies Array<PasteboardDataType<string, RankType>["identifier"]>;

const healPotionsCardsIdentifiers = [
  "day0ff:pasteboard-heal.A",
  "day0ff:pasteboard-heal.2",
  "day0ff:pasteboard-heal.3",
  "day0ff:pasteboard-heal.4",
  "day0ff:pasteboard-heal.5",
  "day0ff:pasteboard-heal.6",
  "day0ff:pasteboard-heal.7",
  "day0ff:pasteboard-heal.8",
  "day0ff:pasteboard-heal.9",
  "day0ff:pasteboard-heal.T",
] as const satisfies Array<PasteboardDataType<string, RankType>["identifier"]>;

const weaponCardsIdentifiers = [
  "day0ff:pasteboard-weapon.A",
  "day0ff:pasteboard-weapon.2",
  "day0ff:pasteboard-weapon.3",
  "day0ff:pasteboard-weapon.4",
  "day0ff:pasteboard-weapon.5",
  "day0ff:pasteboard-weapon.6",
  "day0ff:pasteboard-weapon.7",
  "day0ff:pasteboard-weapon.8",
  "day0ff:pasteboard-weapon.9",
  "day0ff:pasteboard-weapon.T",
] as const satisfies Array<PasteboardDataType<string, RankType>["identifier"]>;

export const darkLordPack = {
  identifier: "day0ff:pack-dark-lord",
  name: "pack.dark-lord.name",
  description: "pack.dark-lord.description",
  card: getPackCard("day0ff:card-pack.dark-lord"),
  castle: `${BASE_URL}/images/packs/dark-lord/castle.png`,
  room: `${BASE_URL}/images/packs/dark-lord/room.png`,
  dungeon: `${BASE_URL}/images/packs/dark-lord/dungen.png`,
  discard: `${BASE_URL}/images/packs/dark-lord/discard.png`,
  crypt: `${BASE_URL}/images/packs/dark-lord/crypt.png`,
  isLocked: true,
  isNotFound: true,
  condition: {
    description: "pack.dark-lord.unlock.description",
    unlock: { type: "gamesWon", count: 1 },
    discover: { type: "gamesWon", count: 1 },
  },
  decks: [
    { identifier: "day0ff:deck-darkLord", cards: darkLordCardsIdentifiers },
    {
      identifier: "day0ff:deck-healPotions",
      cards: healPotionsCardsIdentifiers,
    },
    { identifier: "day0ff:deck-weapon", cards: weaponCardsIdentifiers },
  ],
  styles: {
    text: {
      stroke: "silver",
    },
  },
} as const satisfies PackDataType<"dark-lord">;
