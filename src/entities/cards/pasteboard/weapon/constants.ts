import {RankType} from "../../../types.ts";
import {WeaponCardType} from "./types.ts";
import {oneWeaponPasteboardCard} from "./1.ts";
import {twoWeaponPasteboardCard} from "./2.ts";
import {threeWeaponPasteboardCard} from "./3.ts";
import {fourWeaponPasteboardCard} from "./4.ts";
import {fiveWeaponPasteboardCard} from "./5.ts";
import {sixWeaponPasteboardCard} from "./6.ts";
import {sevenWeaponPasteboardCard} from "./7.ts";
import {eightWeaponPasteboardCard} from "./8.ts";
import {nineWeaponPasteboardCard} from "./9.ts";
import {tenWeaponPasteboardCard} from "./T.ts";
import {jackWeaponPasteboardCard} from "./J.ts";
import {queenWeaponPasteboardCard} from "./Q.ts";
import {kingWeaponPasteboardCard} from "./K.ts";
import {aceWeaponPasteboardCard} from "./A.ts";
import {billetWeaponPasteboardCard} from "./B.ts";

export const WEAPON_PASTEBOARD_CARDS_MAP = {
    "day0ff:card-pasteboard.weapon.1": oneWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.2": twoWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.3": threeWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.4": fourWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.5": fiveWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.6": sixWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.7": sevenWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.8": eightWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.9": nineWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.T": tenWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.J": jackWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.Q": queenWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.K": kingWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.A": aceWeaponPasteboardCard,
    "day0ff:card-pasteboard.weapon.B": billetWeaponPasteboardCard,
} as const satisfies Partial<
    Record<
        WeaponCardType<RankType>["identifier"],
        WeaponCardType<RankType>
    >
>;
