import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type NineWeaponPasteboardDataType = WeaponPasteboardDataType<'9'>;

export const nineWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.9",
  name: "pasteboard.weapon.9.name",
  description: "pasteboard.weapon.9.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.9"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "9",
  isLocked: false,
  isNotFound: false,
} as const satisfies NineWeaponPasteboardDataType;
