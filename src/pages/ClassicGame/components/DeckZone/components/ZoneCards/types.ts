import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";
import type {ZoneKindType} from "store/features/classic-game/types.ts";

export type ZoneCardsPropsType = ModalStackControls & {
    zoneType: ZoneKindType;
    label: string;
};
