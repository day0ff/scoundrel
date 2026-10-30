import {BASE_URL} from "constants.ts";
import type { PackCardType } from "./types.ts";

export const skeletonPackCard = {
  identifier: "day0ff:card-pack.skeleton",
  type: "pack",
  name: "card.pack.skeleton.name",
  color: "gray",
  face: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/necromancer/face.png`,
    imageMode: "darken",
  },
  back: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/necromancer/back.png`,
    imageMode: "darken",
  },
} satisfies PackCardType<"skeleton">;
