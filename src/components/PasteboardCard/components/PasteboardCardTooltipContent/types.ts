import {TranslationKeysType} from "localization/types.ts";
import {EffectPayload} from "entities/effects/types.ts";

export type CardTooltipContentPropsType = EffectPayload & {
    className?: string;
    name: TranslationKeysType;
    description: TranslationKeysType;
    color?: string;
};