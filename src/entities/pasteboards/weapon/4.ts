import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type FourWeaponPasteboardDataType = WeaponPasteboardDataType<'4'>;

export const fourWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.4",
  name: "pasteboard.weapon.4.name",
  description: "pasteboard.weapon.4.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.4"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "4",
  isLocked: false,
  isNotFound: false,
} as const satisfies FourWeaponPasteboardDataType;
