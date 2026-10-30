import { BASE_URL } from "constants.ts";
import type { PackCardType } from "./types.ts";

export const necromancerPackCard = {
  identifier: "day0ff:card-pack.necromancer",
  type: "pack",
  name: "card.pack.necromancer.name",
  color: "skyblue",
  face: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/necromancer/face.png`,
    imageMode: "normal",
  },
  back: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/necromancer/back.png`,
    imageMode: "normal",
  },
} satisfies PackCardType<"necromancer">;
