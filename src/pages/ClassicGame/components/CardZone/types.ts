import type {TippyProps} from "components/Tooltip/types.ts";
import type {ZoneType} from "store/features/classic-game/types.ts";

export type CardZonePropsType = Pick<TippyProps, "appendTo"> & {
    framed?: boolean;
    cardAnimation?: "reveal" | "remove";
    zone: ZoneType;
    label: string;
    emptyLabel: string;
    previewEnemyId?: string;
    onAttack: (cardId: string, enemyId?: string) => void;
};
