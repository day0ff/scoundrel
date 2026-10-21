import {BASE_URL} from "constants.ts";
import {HeroCardType} from "./types.ts";

const basePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/backs/hero-white.png`;
const faceOverlayPath = `${BASE_URL}/images/cards/overlay/question.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/hero-black.png`;
const backOverlayPath = `${BASE_URL}/images/cards/overlay/lock.png`;

type BilletHeroCardDataType = HeroCardType<"billet">;

export const billetHeroCard = {
    identifier: "day0ff:card-hero.billet",
    type: "hero",
    name: "card.hero.billet.name",
    color: "black",
    face: {
        base: basePath,
        image: faceImagePath,
        imageMode: 'darken',
        overlay: faceOverlayPath,
        overlayMode: 'lighten',
    },
    back: {
        base: basePath,
        image: backImagePath,
        imageMode: 'darken',
        overlay: backOverlayPath,
        overlayMode: 'lighten',
    },
} satisfies BilletHeroCardDataType;