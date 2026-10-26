import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";
import type {ZoneKindType} from "entities/game/types.ts";

export type ZoneCardsPropsType = ModalStackControls & {
    zoneType: ZoneKindType;
    label: string;
};
