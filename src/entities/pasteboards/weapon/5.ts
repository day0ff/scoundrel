import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type FiveWeaponPasteboardDataType = WeaponPasteboardDataType<'5'>;

export const fiveWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.5",
  name: "pasteboard.weapon.5.name",
  description: "pasteboard.weapon.5.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.5"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "5",
  isLocked: false,
  isNotFound: false,
} as const satisfies FiveWeaponPasteboardDataType;
