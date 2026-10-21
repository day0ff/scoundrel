import {RankType} from "entities/types.ts";
import {PasteboardDataType} from "entities/pasteboards/types.ts";
import {ModalStackControls} from "../../../../../ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type PasteboardsPropsType = ModalStackControls & Pick<TippyProps, "appendTo"> & {
    pasteboards: Array<PasteboardDataType<string, RankType>>;
};
