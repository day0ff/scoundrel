import {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "components/TooltipContent/constants.tsx";
import {CardTooltipContentPropsType} from "./types.ts";
import {DiceCardTooltipContentStyled} from "./styles.ts";

const DiceCardTooltipContent: FC<CardTooltipContentPropsType> = (
    {
        className,
        name,
        description,
        color,
        ...values
    }
) => {
    return (
        <DiceCardTooltipContentStyled className={className} name={name} $color={color}>
            <Trans
                i18nKey={description}
                components={TAG_COMPONENTS_MAP}
                values={values}
            />
        </DiceCardTooltipContentStyled>
    );
}

export default DiceCardTooltipContent;