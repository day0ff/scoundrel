import {RankType} from "../../../types.ts";
import {DarkLordCardType} from "./types.ts";
import {oneDarkLordPasteboardCard} from "./1.ts";
import {twoDarkLordPasteboardCard} from "./2.ts";
import {threeDarkLordPasteboardCard} from "./3.ts";
import {fourDarkLordPasteboardCard} from "./4.ts";
import {fiveDarkLordPasteboardCard} from "./5.ts";
import {sixDarkLordPasteboardCard} from "./6.ts";
import {sevenDarkLordPasteboardCard} from "./7.ts";
import {eightDarkLordPasteboardCard} from "./8.ts";
import {nineDarkLordPasteboardCard} from "./9.ts";
import {tenDarkLordPasteboardCard} from "./T.ts";
import {jackDarkLordPasteboardCard} from "./J.ts";
import {queenDarkLordPasteboardCard} from "./Q.ts";
import {kingDarkLordPasteboardCard} from "./K.ts";
import {aceDarkLordPasteboardCard} from "./A.ts";
import {billetDarkLordPasteboardCard} from "./B.ts";

export const DARK_PASTEBOARD_CARDS_MAP = {
    "day0ff:card-pasteboard.dark.1": oneDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.2": twoDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.3": threeDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.4": fourDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.5": fiveDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.6": sixDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.7": sevenDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.8": eightDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.9": nineDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.T": tenDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.J": jackDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.Q": queenDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.K": kingDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.A": aceDarkLordPasteboardCard,
    "day0ff:card-pasteboard.dark.B": billetDarkLordPasteboardCard,
} as const satisfies Partial<
    Record<
        DarkLordCardType<RankType>["identifier"],
        DarkLordCardType<RankType>
    >
>;
