import { BASE_URL } from "constants.ts";
import { getPackCard } from "entities/cards/packs/helpers.ts";
import type { PackDataType } from "./types.ts";
import { PasteboardDataType } from "entities/pasteboards/types.ts";
import { RankType } from "entities/types.ts";

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
  "day0ff:pasteboard-skeleton.2",
  "day0ff:pasteboard-skeleton.2",
  "day0ff:pasteboard-skeleton.3",
  "day0ff:pasteboard-skeleton.3",
  "day0ff:pasteboard-skeleton.4",
  "day0ff:pasteboard-skeleton.4",
  "day0ff:pasteboard-skeleton.5",
  "day0ff:pasteboard-skeleton.5",
  "day0ff:pasteboard-skeleton.6",
  "day0ff:pasteboard-skeleton.6",
  "day0ff:pasteboard-skeleton.7",
  "day0ff:pasteboard-skeleton.7",
  "day0ff:pasteboard-skeleton.8",
  "day0ff:pasteboard-skeleton.8",
  "day0ff:pasteboard-skeleton.9",
  "day0ff:pasteboard-skeleton.9",
  "day0ff:pasteboard-skeleton.T",
  "day0ff:pasteboard-skeleton.T",
  "day0ff:pasteboard-skeleton.F.necromancer",
  "day0ff:pasteboard-skeleton.F.necromancer",
  "day0ff:pasteboard-skeleton.F.necromancer",
  "day0ff:pasteboard-skeleton.F.necromancer",
  "day0ff:pasteboard-skeleton.F.necromancer",
  "day0ff:pasteboard-skeleton.F.necromancer",

  // "day0ff:pasteboard-skeleton.F.thing",
  // "day0ff:pasteboard-skeleton.F.osteomancer",
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

export const necromancerPack = {
  identifier: "day0ff:pack-necromancer",
  name: "pack.necromancer.name",
  description: "pack.necromancer.description",
  card: getPackCard("day0ff:card-pack.necromancer"),
  castle: `${BASE_URL}/images/packs/necromancer/castle.png`,
  room: `${BASE_URL}/images/packs/necromancer/room.png`,
  dungeon: `${BASE_URL}/images/packs/necromancer/dungen.png`,
  discard: `${BASE_URL}/images/packs/necromancer/discard.png`,
  crypt: `${BASE_URL}/images/packs/necromancer/crypt.png`,
  isLocked: true,
  isNotFound: true,
  condition: {
    description: "pack.necromancer.unlock.description",
    unlock: [
      { type: "packUnlocked", packIdentifier: "day0ff:pack-skeleton" },
      { type: "enemiesDefeated", suit: "skeleton", count: 200 },
      { type: "gamesWon", count: 1 },
    ],
    discover: [
      { type: "packUnlocked", packIdentifier: "day0ff:pack-skeleton" },
      { type: "enemiesDefeated", suit: "skeleton", count: 200 },
      { type: "gamesWon", count: 1 },
    ],
  },
  decks: [
    { identifier: "day0ff:deck-skeleton", cards: skeletonCardsIdentifiers },
    {
      identifier: "day0ff:deck-healPotions",
      cards: healPotionsCardsIdentifiers,
    },
    { identifier: "day0ff:deck-weapon", cards: weaponCardsIdentifiers },
  ],
} as const satisfies PackDataType<"necromancer">;
