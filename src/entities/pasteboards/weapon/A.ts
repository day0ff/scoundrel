import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type AceWeaponPasteboardDataType = WeaponPasteboardDataType<'A'>;

export const aceWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.A",
  name: "pasteboard.weapon.A.name",
  description: "pasteboard.weapon.A.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.A"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "A",
  isLocked: false,
  isNotFound: false,
} as const satisfies AceWeaponPasteboardDataType;
