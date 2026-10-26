import type {DeckDataType} from "entities/decks/types.ts";
import {ModalStackControls} from "../../../../../ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type PasteboardsPropsType = ModalStackControls & Pick<TippyProps, "appendTo"> & Pick<DeckDataType<string>, "name" | "pasteboards"> & {
    color: string;
};
