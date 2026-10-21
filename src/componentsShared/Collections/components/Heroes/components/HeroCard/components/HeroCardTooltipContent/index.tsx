import {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "components/TooltipContent/constants.tsx";
import {HeroCardTooltipContentStyled} from "./styles.ts";
import {CardTooltipContentPropsType} from "./types.ts";

const HeroCardTooltipContent: FC<CardTooltipContentPropsType> = (
    {
        className,
        name,
        description,
        color,
    }
) => {
    return (
        <HeroCardTooltipContentStyled className={className} name={name} $color={color}>
            <Trans
                i18nKey={description}
                components={TAG_COMPONENTS_MAP}
            />
        </HeroCardTooltipContentStyled>
    );
}

export default HeroCardTooltipContent;