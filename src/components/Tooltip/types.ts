import {ComponentProps, ReactElement} from "react";
import Tippy from '@tippyjs/react';
import {TranslationKeysType} from "localization/types.ts";

export type TippyProps = ComponentProps<typeof Tippy>;

export type TooltipPropsType = Omit<TippyProps, "animation"> & {
    className?: string;
    translationKey?: TranslationKeysType;
    children?: ReactElement<any>;
    maxWidth?: string;
    minWidth?: string;
    values?: {};
};