import {TranslationKeysType} from "localization/types.ts";
import {PropsWithChildren} from "react";

export type CardTooltipContentPropsType = PropsWithChildren<{
    className?: string;
    name: TranslationKeysType;
}>;