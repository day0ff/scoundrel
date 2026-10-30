import {assassinPasteboard} from "./Assassin.ts";
import {darkQueenPasteboard} from "./DarkQueen.ts";
import {darkLordPasteboard} from "./DarkLord.ts";
import {darkDragonPasteboard} from "./DarkDragon.ts";
import {RankType} from "../../types.ts";
import {aceDarkLordPasteboard} from "./A.ts";
import {oneDarkLordPasteboard} from "./1.ts";
import {twoDarkLordPasteboard} from "./2.ts";
import {threeDarkLordPasteboard} from "./3.ts";
import {fourDarkLordPasteboard} from "./4.ts";
import {fiveDarkLordPasteboard} from "./5.ts";
import {sixDarkLordPasteboard} from "./6.ts";
import {sevenDarkLordPasteboard} from "./7.ts";
import {eightDarkLordPasteboard} from "./8.ts";
import {nineDarkLordPasteboard} from "./9.ts";
import {tenDarkLordPasteboard} from "./T.ts";
import {jackDarkLordPasteboard} from "./J.ts";
import {queenDarkLordPasteboard} from "./Q.ts";
import {kingDarkLordPasteboard} from "./K.ts";
import {DarkLordPasteboardDataType} from "./types.ts";

export const PASTEBOARD_DARK_MAP = {
    [assassinPasteboard.identifier]: assassinPasteboard,
    [darkQueenPasteboard.identifier]: darkQueenPasteboard,
    [darkLordPasteboard.identifier]: darkLordPasteboard,
    [darkDragonPasteboard.identifier]: darkDragonPasteboard,
    "day0ff:pasteboard-dark.A": aceDarkLordPasteboard,
    "day0ff:pasteboard-dark.1": oneDarkLordPasteboard,
    "day0ff:pasteboard-dark.2": twoDarkLordPasteboard,
    "day0ff:pasteboard-dark.3": threeDarkLordPasteboard,
    "day0ff:pasteboard-dark.4": fourDarkLordPasteboard,
    "day0ff:pasteboard-dark.5": fiveDarkLordPasteboard,
    "day0ff:pasteboard-dark.6": sixDarkLordPasteboard,
    "day0ff:pasteboard-dark.7": sevenDarkLordPasteboard,
    "day0ff:pasteboard-dark.8": eightDarkLordPasteboard,
    "day0ff:pasteboard-dark.9": nineDarkLordPasteboard,
    "day0ff:pasteboard-dark.T": tenDarkLordPasteboard,
    "day0ff:pasteboard-dark.J": jackDarkLordPasteboard,
    "day0ff:pasteboard-dark.Q": queenDarkLordPasteboard,
    "day0ff:pasteboard-dark.K": kingDarkLordPasteboard,
} as const satisfies Partial<Record<
    DarkLordPasteboardDataType<RankType>["identifier"],
    DarkLordPasteboardDataType<RankType>
>>;

export const allDarkPasteBoards = Object.values(PASTEBOARD_DARK_MAP);
