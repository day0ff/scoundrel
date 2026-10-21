import {TranslationKeysType} from "localization/types.ts";

export type CardTooltipContentPropsType = {
    className?: string;
    name: TranslationKeysType;
    description: TranslationKeysType;
    payload?: number;
    color?: string;
};