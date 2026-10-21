import {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "components/TooltipContent/constants.tsx";
import {PasteboardCardTooltipContentStyled} from "./styles.ts";
import {CardTooltipContentPropsType} from "./types.ts";

const PasteboardCardTooltipContent: FC<CardTooltipContentPropsType> = (
    {
        className,
        name,
        description,
        color,
        ...values
    }
) => {
    return (
        <PasteboardCardTooltipContentStyled className={className} name={name} $color={color}>
            <Trans
                i18nKey={description}
                components={TAG_COMPONENTS_MAP}
                values={values}
            />
        </PasteboardCardTooltipContentStyled>
    );
}

export default PasteboardCardTooltipContent;