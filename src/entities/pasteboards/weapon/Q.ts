import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type QueenWeaponPasteboardDataType = WeaponPasteboardDataType<'Q'>;

export const queenWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.Q",
  name: "pasteboard.weapon.Q.name",
  description: "pasteboard.weapon.Q.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.Q"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "Q",
  isLocked: false,
  isNotFound: false,
} as const satisfies QueenWeaponPasteboardDataType;
