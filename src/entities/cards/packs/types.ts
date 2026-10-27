import type {CardDataType} from "../types.ts";

export type PackCardType<Subtype extends string> = CardDataType<"pack", Subtype>;
