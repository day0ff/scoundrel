import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type JackWeaponPasteboardDataType = WeaponPasteboardDataType<'J'>;

export const jackWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.J",
  name: "pasteboard.weapon.J.name",
  description: "pasteboard.weapon.J.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.J"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "J",
  isLocked: false,
  isNotFound: false,
} as const satisfies JackWeaponPasteboardDataType;
