import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type SevenWeaponPasteboardDataType = WeaponPasteboardDataType<'7'>;

export const sevenWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.7",
  name: "pasteboard.weapon.7.name",
  description: "pasteboard.weapon.7.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.7"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "7",
  isLocked: false,
  isNotFound: false,
} as const satisfies SevenWeaponPasteboardDataType;
