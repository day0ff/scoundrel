import {SuitTagType} from "./types.ts";
import {darkSuitTag} from "./dark.ts";
import {healSuitTag} from "./heal.ts";
import {skeletonSuitTag} from "./skeleton.ts";
import {weaponSuitTag} from "./weapon.ts";
import {fistSuitTag} from "./fist.ts";

export const SUIT_TAGS_MAP: Record<SuitTagType<string>["identifier"], SuitTagType<string>> = {
    "day0ff:tag-suit.dark": darkSuitTag,
    "day0ff:tag-suit.heal": healSuitTag,
    "day0ff:tag-suit.skeleton": skeletonSuitTag,
    "day0ff:tag-suit.weapon": weaponSuitTag,
    "day0ff:tag-suit.fist": fistSuitTag,
} as const;
