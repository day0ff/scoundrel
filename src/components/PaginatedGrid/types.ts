import {ComponentType, ReactElement} from "react";
import {ModalStackControls} from "../../componentsShared/ModalStack/types.ts";

export type GridAnimationPhaseType = "idle" | "exiting" | "entering";

export type PaginatedGridPropsType<T extends { id: string }> = {
    className?: string;
    items: T[];
    ItemComponent: ComponentType<T>;
    rowSize: number;
    columnSize: number;
    ratio?: number;
    offset?: number;
    gap?: number;
    /** Reserve the width and height of a full page without rendering empty items. */
    reserveEmptySpace?: boolean;
    /** Item dimensions when none can be measured. Defaults to 150 × 225 pixels. */
    emptyItemSize?: {width: number; height: number};
    onPush?: (newElement: ReactElement<ModalStackControls>) => void;
};
