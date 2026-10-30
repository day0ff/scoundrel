import {skeletonKingPasteboard} from "./SkeletonKing.ts";
import {osteomancerPasteboard} from "./Osteomancer.ts";
import {RankType} from "../../types.ts";
import {aceSkeletonPasteboard} from "./A.ts";
import {oneSkeletonPasteboard} from "./1.ts";
import {twoSkeletonPasteboard} from "./2.ts";
import {threeSkeletonPasteboard} from "./3.ts";
import {fourSkeletonPasteboard} from "./4.ts";
import {fiveSkeletonPasteboard} from "./5.ts";
import {sixSkeletonPasteboard} from "./6.ts";
import {sevenSkeletonPasteboard} from "./7.ts";
import {eightSkeletonPasteboard} from "./8.ts";
import {nineSkeletonPasteboard} from "./9.ts";
import {tenSkeletonPasteboard} from "./T.ts";
import {jackSkeletonPasteboard} from "./J.ts";
import {queenSkeletonPasteboard} from "./Q.ts";
import {kingSkeletonPasteboard} from "./K.ts";
import {SkeletonPasteboardDataType} from "./types.ts";
import {thingPasteboard} from "./Thing.ts";
import {necromancerPasteboard} from "./Necromancer.ts";

export const PASTEBOARD_SKELETON_MAP = {
    [skeletonKingPasteboard.identifier]: skeletonKingPasteboard,
    [osteomancerPasteboard.identifier]: osteomancerPasteboard,
    [thingPasteboard.identifier]: thingPasteboard,
    [necromancerPasteboard.identifier]: necromancerPasteboard,
    "day0ff:pasteboard-skeleton.A": aceSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.1": oneSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.2": twoSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.3": threeSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.4": fourSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.5": fiveSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.6": sixSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.7": sevenSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.8": eightSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.9": nineSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.T": tenSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.J": jackSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.Q": queenSkeletonPasteboard,
    "day0ff:pasteboard-skeleton.K": kingSkeletonPasteboard,
} as const satisfies Partial<Record<
    SkeletonPasteboardDataType<RankType>["identifier"],
    SkeletonPasteboardDataType<RankType>
>>;

export const allSkeletonPasteBoards = Object.values(PASTEBOARD_SKELETON_MAP);
