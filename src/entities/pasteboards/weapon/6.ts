import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type SixWeaponPasteboardDataType = WeaponPasteboardDataType<'6'>;

export const sixWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.6",
  name: "pasteboard.weapon.6.name",
  description: "pasteboard.weapon.6.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.6"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "6",
  isLocked: false,
  isNotFound: false,
} as const satisfies SixWeaponPasteboardDataType;
