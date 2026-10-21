import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type BilletWeaponPasteboardDataType = WeaponPasteboardDataType<'B'>;

export const billetWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.B",
  name: "pasteboard.weapon.B.name",
  description: "pasteboard.weapon.B.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.B"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "B",
  isLocked: false,
  isNotFound: false,
} as const satisfies BilletWeaponPasteboardDataType;
