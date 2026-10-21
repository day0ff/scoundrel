import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type ThreeWeaponPasteboardDataType = WeaponPasteboardDataType<'3'>;

export const threeWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.3",
  name: "pasteboard.weapon.3.name",
  description: "pasteboard.weapon.3.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.3"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "3",
  isLocked: false,
  isNotFound: false,
} as const satisfies ThreeWeaponPasteboardDataType;
