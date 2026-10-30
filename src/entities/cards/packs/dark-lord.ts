import { BASE_URL } from "constants.ts";
import type { PackCardType } from "./types.ts";

export const darkLordPackCard = {
  identifier: "day0ff:card-pack.dark-lord",
  type: "pack",
  name: "card.pack.dark-lord.name",
  color: "#333",
  face: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/dark-lord/face.png`,
    imageMode: "normal",
  },
  back: {
    base: `${BASE_URL}/images/cards/base/white-paper.png`,
    image: `${BASE_URL}/images/packs/dark-lord/back.png`,
    imageMode: "normal",
  },
} satisfies PackCardType<"dark-lord">;
