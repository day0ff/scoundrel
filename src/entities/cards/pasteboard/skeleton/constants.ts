import {skeletonDragonPasteboardCard} from "./SkeletonDragon.ts";
import {skeletonQueenPasteboardCard} from "./SkeletonQueen.ts";
import {skeletonKingPasteboardCard} from "./SkeletonKing.ts";
import {osteomancerPasteboardCard} from "./Osteomancer.ts";
import {RankType} from "../../../types.ts";
import {SkeletonCardType} from "./types.ts";
import {oneSkeletonPasteboardCard} from "./1.ts";
import {twoSkeletonPasteboardCard} from "./2.ts";
import {threeSkeletonPasteboardCard} from "./3.ts";
import {fourSkeletonPasteboardCard} from "./4.ts";
import {fiveSkeletonPasteboardCard} from "./5.ts";
import {sixSkeletonPasteboardCard} from "./6.ts";
import {sevenSkeletonPasteboardCard} from "./7.ts";
import {eightSkeletonPasteboardCard} from "./8.ts";
import {nineSkeletonPasteboardCard} from "./9.ts";
import {tenSkeletonPasteboardCard} from "./T.ts";
import {jackSkeletonPasteboardCard} from "./J.ts";
import {queenSkeletonPasteboardCard} from "./Q.ts";
import {kingSkeletonPasteboardCard} from "./K.ts";
import {aceSkeletonPasteboardCard} from "./A.ts";
import {billetSkeletonPasteboardCard} from "./B.ts";
import {thingPasteboardCard} from "./Thing.ts";
import {necromancerPasteboardCard} from "./Necromancer.ts";

export const SKELETON_PASTEBOARD_CARDS_MAP = {
    [skeletonDragonPasteboardCard.identifier]: skeletonDragonPasteboardCard,
    [skeletonQueenPasteboardCard.identifier]: skeletonQueenPasteboardCard,
    [skeletonKingPasteboardCard.identifier]: skeletonKingPasteboardCard,
    [osteomancerPasteboardCard.identifier]: osteomancerPasteboardCard,
    [thingPasteboardCard.identifier]: thingPasteboardCard,
    [necromancerPasteboardCard.identifier]: necromancerPasteboardCard,
    "day0ff:card-pasteboard.skeleton.1": oneSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.2": twoSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.3": threeSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.4": fourSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.5": fiveSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.6": sixSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.7": sevenSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.8": eightSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.9": nineSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.T": tenSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.J": jackSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.Q": queenSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.K": kingSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.A": aceSkeletonPasteboardCard,
    "day0ff:card-pasteboard.skeleton.B": billetSkeletonPasteboardCard,
} as const satisfies Partial<
    Record<
        SkeletonCardType<RankType>["identifier"],
        SkeletonCardType<RankType>
    >
>;
