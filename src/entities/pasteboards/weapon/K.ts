import {DEFAULT_WEAPON_DURABILITY} from "./defaults.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { WeaponPasteboardDataType } from "./types.ts";

type KingWeaponPasteboardDataType = WeaponPasteboardDataType<'K'>;

export const kingWeaponPasteboard = {
  identifier: "day0ff:pasteboard-weapon.K",
  name: "pasteboard.weapon.K.name",
  description: "pasteboard.weapon.K.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.weapon.K"],
  suit: "weapon",
  role: "weapon",
  durability: DEFAULT_WEAPON_DURABILITY,
  rank: "K",
  isLocked: false,
  isNotFound: false,
} as const satisfies KingWeaponPasteboardDataType;
