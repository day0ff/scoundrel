import {RankType} from "../../types.ts";
import {aceWeaponPasteboard} from "./A.ts";
import {oneWeaponPasteboard} from "./1.ts";
import {twoWeaponPasteboard} from "./2.ts";
import {threeWeaponPasteboard} from "./3.ts";
import {fourWeaponPasteboard} from "./4.ts";
import {fiveWeaponPasteboard} from "./5.ts";
import {sixWeaponPasteboard} from "./6.ts";
import {sevenWeaponPasteboard} from "./7.ts";
import {eightWeaponPasteboard} from "./8.ts";
import {nineWeaponPasteboard} from "./9.ts";
import {tenWeaponPasteboard} from "./T.ts";
import {jackWeaponPasteboard} from "./J.ts";
import {queenWeaponPasteboard} from "./Q.ts";
import {kingWeaponPasteboard} from "./K.ts";
import {WeaponPasteboardDataType} from "./types.ts";

export const PASTEBOARD_WEAPON_MAP = {
    "day0ff:pasteboard-weapon.A": aceWeaponPasteboard,
    "day0ff:pasteboard-weapon.1": oneWeaponPasteboard,
    "day0ff:pasteboard-weapon.2": twoWeaponPasteboard,
    "day0ff:pasteboard-weapon.3": threeWeaponPasteboard,
    "day0ff:pasteboard-weapon.4": fourWeaponPasteboard,
    "day0ff:pasteboard-weapon.5": fiveWeaponPasteboard,
    "day0ff:pasteboard-weapon.6": sixWeaponPasteboard,
    "day0ff:pasteboard-weapon.7": sevenWeaponPasteboard,
    "day0ff:pasteboard-weapon.8": eightWeaponPasteboard,
    "day0ff:pasteboard-weapon.9": nineWeaponPasteboard,
    "day0ff:pasteboard-weapon.T": tenWeaponPasteboard,
    "day0ff:pasteboard-weapon.J": jackWeaponPasteboard,
    "day0ff:pasteboard-weapon.Q": queenWeaponPasteboard,
    "day0ff:pasteboard-weapon.K": kingWeaponPasteboard,
} as const satisfies Partial<Record<
    WeaponPasteboardDataType<RankType>["identifier"],
    WeaponPasteboardDataType<RankType>
>>;

export const allWeaponPasteBoards = Object.values(PASTEBOARD_WEAPON_MAP);
