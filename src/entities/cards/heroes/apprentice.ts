import {BASE_URL} from "constants.ts";
import {HeroCardType} from "./types.ts";

const basePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/faces/heroes/apprentice.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/grid.png`;

type ApprenticeHeroCardDataType = HeroCardType<"apprentice">;

export const apprenticeCard = {
    identifier: "day0ff:card-hero.apprentice",
    type: "hero",
    name: "card.hero.apprentice.name",
    color: "#6172fc",
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
} satisfies ApprenticeHeroCardDataType;