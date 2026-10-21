import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type TwoWeaponPasteboardDataType = WeaponPasteboardDataType<'2'>;

export const twoWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.2",
  name: "pasteboard.weapon.2.name",
  description: "pasteboard.weapon.2.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.2"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "2",
  isLocked: false,
  isNotFound: false,
} as const satisfies TwoWeaponPasteboardDataType;
