import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type OneWeaponPasteboardDataType = WeaponPasteboardDataType<'1'>;

export const oneWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.1",
  name: "pasteboard.weapon.1.name",
  description: "pasteboard.weapon.1.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.1"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "1",
  isLocked: false,
  isNotFound: false,
} as const satisfies OneWeaponPasteboardDataType;
