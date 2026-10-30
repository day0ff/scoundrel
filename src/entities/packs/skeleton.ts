import type { RankType } from "entities/types.ts";
import type { PasteboardDataType } from "entities/pasteboards/types.ts";
import type { PackDataType } from "./types.ts";
import { PACKS_CARDS_MAP } from "entities/cards/packs/constants.ts";
import { BASE_URL } from "constants.ts";

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

const skeletonCardsIdentifiers = [
  // "day0ff:pasteboard-skeleton.A",
  "day0ff:pasteboard-skeleton.2",
  // "day0ff:pasteboard-skeleton.3",
  // "day0ff:pasteboard-skeleton.4",
  // "day0ff:pasteboard-skeleton.5",
  // "day0ff:pasteboard-skeleton.6",
  // "day0ff:pasteboard-skeleton.7",
  // "day0ff:pasteboard-skeleton.8",
  // "day0ff:pasteboard-skeleton.9",
  // "day0ff:pasteboard-skeleton.T",
  // "day0ff:pasteboard-skeleton.J",
  // "day0ff:pasteboard-skeleton.Q",
  // "day0ff:pasteboard-skeleton.K.skeletonKing",
  // "day0ff:pasteboard-skeleton.F.necromancer",
  // "day0ff:pasteboard-skeleton.Q.skeletonQueen",
] as const satisfies Array<PasteboardDataType<string, RankType>["identifier"]>;

const weaponCardsIdentifiers = [
  // "day0ff:pasteboard-weapon.A",
  // "day0ff:pasteboard-weapon.2",
  // "day0ff:pasteboard-weapon.3",
  // "day0ff:pasteboard-weapon.4",
  // "day0ff:pasteboard-weapon.5",
  // "day0ff:pasteboard-weapon.6",
  // "day0ff:pasteboard-weapon.7",
  // "day0ff:pasteboard-weapon.8",
  // "day0ff:pasteboard-weapon.9",
  // "day0ff:pasteboard-weapon.T",
] as const satisfies Array<PasteboardDataType<string, RankType>["identifier"]>;

export const skeletonPack = {
  identifier: "day0ff:pack-skeleton",
  name: "pack.skeleton.name",
  description: "pack.skeleton.description",
  card: PACKS_CARDS_MAP["day0ff:card-pack.skeleton"],
  castle: `${BASE_URL}/images/packs/necromancer/castle.png`,
  room: `${BASE_URL}/images/packs/necromancer/room.png`,
  dungeon: `${BASE_URL}/images/packs/necromancer/dungen.png`,
  discard: `${BASE_URL}/images/packs/necromancer/discard.png`,
  crypt: `${BASE_URL}/images/packs/necromancer/crypt.png`,
  isLocked: false,
  isNotFound: false,
  condition: {
    description: "pack.necromancer.unlock.description",
    unlock: { type: "gamesWon", count: 1 },
    discover: { type: "gamesWon", count: 1 },
  },
  decks: [
    { identifier: "day0ff:deck-skeleton", cards: skeletonCardsIdentifiers },
    {
      identifier: "day0ff:deck-healPotions",
      cards: healPotionsCardsIdentifiers,
    },
    { identifier: "day0ff:deck-weapon", cards: weaponCardsIdentifiers },
  ],
} as const satisfies PackDataType<"skeleton">;
