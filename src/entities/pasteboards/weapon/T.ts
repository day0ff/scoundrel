import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type TenWeaponPasteboardDataType = WeaponPasteboardDataType<'T'>;

export const tenWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.T",
  name: "pasteboard.weapon.T.name",
  description: "pasteboard.weapon.T.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.T"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "T",
  isLocked: false,
  isNotFound: false,
} as const satisfies TenWeaponPasteboardDataType;
