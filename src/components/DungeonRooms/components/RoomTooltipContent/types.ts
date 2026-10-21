import type {DungeonRoomDangerType, DungeonRoomType} from "entities/dungeon-rooms/types.ts";
import type {TranslationKeysType} from "localization/types.ts";

export type RoomTooltipContentPropsType = Pick<DungeonRoomType, "kind" | "name" | "description" | "danger"> & {
    className?: string;
    dangerTranslationKey?: Extract<TranslationKeysType, `ui.dungeonRooms.${DungeonRoomDangerType}`>;
};
