import {BASE_URL} from "constants.ts";
import {HeroCardType} from "./types.ts";

const basePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/faces/heroes/wanderer.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/grid.png`;

type WandererHeroCardDataType = HeroCardType<"wanderer">;

export const wandererCard = {
    identifier: "day0ff:card-hero.wanderer",
    type: "hero",
    name: "card.hero.wanderer.name",
    color: "purple",
    face: {
        base: basePath,
        image: faceImagePath,
        imageMode: 'darken'
    },
    back: {
        base: basePath,
        image: backImagePath,
        imageMode: 'darken',
    },
} satisfies WandererHeroCardDataType;