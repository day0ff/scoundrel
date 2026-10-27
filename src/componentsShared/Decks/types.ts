import type {DeckDataType} from "entities/decks/types.ts";
import type {TranslationKeysType} from "localization/types.ts";
import {ModalStackControls} from "../ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type DecksPropsType = ModalStackControls & Pick<TippyProps, "appendTo"> & {
    decks: DeckDataType<string>[];
    name: TranslationKeysType;
    color: string;
};
