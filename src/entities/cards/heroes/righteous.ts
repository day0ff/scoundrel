import {BASE_URL} from "constants.ts";
import {HeroCardType} from "./types.ts";

const basePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/faces/heroes/righteous.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/grid.png`;

type RighteousHeroCardDataType = HeroCardType<"righteous">;

export const righteousCard = {
    identifier: "day0ff:card-hero.righteous",
    type: "hero",
    name: "card.hero.righteous.name",
    color: "wheat",
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
} satisfies RighteousHeroCardDataType;