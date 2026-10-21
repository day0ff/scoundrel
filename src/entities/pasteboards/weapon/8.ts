import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type EightWeaponPasteboardDataType = WeaponPasteboardDataType<'8'>;

export const eightWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.8",
  name: "pasteboard.weapon.8.name",
  description: "pasteboard.weapon.8.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.8"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "8",
  isLocked: false,
  isNotFound: false,
} as const satisfies EightWeaponPasteboardDataType;
