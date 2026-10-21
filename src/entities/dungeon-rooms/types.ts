import type {TranslationKeysType} from "localization/types.ts";
import type {IdentifierType} from "entities/types.ts";

export type DungeonRoomDangerType = "easy" | "normal" | "hard";

export type DungeonRoomKindType = "treasure" | "room" | "royal" | "monster";

export type DungeonRoomDataType<Kind extends DungeonRoomKindType = DungeonRoomKindType> = {
    identifier: IdentifierType<"dungeonRoom", Kind>;
    kind: Kind;
    name: Extract<TranslationKeysType, `dungeonRoom.${Kind}.name`>;
    description: Extract<TranslationKeysType, `dungeonRoom.${Kind}.description`>;
    icon: string;
};

export type DungeonRoomType = DungeonRoomDataType & {
    danger?: DungeonRoomDangerType;
    strength: number;
    enemies: number;
    status: "upcoming" | "current" | "completed";
};
