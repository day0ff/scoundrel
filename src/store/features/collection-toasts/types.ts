import type {CardDataType} from "entities/cards/types.ts";
import type {CollectionType} from "entities/types.ts";
import type {TranslationKeysType} from "localization/types.ts";

export type CollectionToastType = {
    id: string;
    name: TranslationKeysType;
    card: CardDataType<string, string>;
    kind: "unlocked" | "discovered";
    before: Pick<CollectionType, "isLocked" | "isNotFound">;
    after: Pick<CollectionType, "isLocked" | "isNotFound">;
};
