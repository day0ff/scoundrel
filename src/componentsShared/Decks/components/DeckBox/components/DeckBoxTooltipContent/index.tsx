import {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "components/TooltipContent/constants.tsx";
import {CardTooltipContentPropsType} from "./types.ts";
import {DeckBoxTooltipContentStyled} from "./styles.ts";

const DeckBoxTooltipContent: FC<CardTooltipContentPropsType> = (
    {
        className,
        name,
        description,
        payload,
        color = 'black'
    }
) => {
    return (
        <DeckBoxTooltipContentStyled className={className} name={name} color={color}>
            <Trans
                i18nKey={description}
                components={TAG_COMPONENTS_MAP}
                values={{payload}}
            />
        </DeckBoxTooltipContentStyled>
    );
}

export default DeckBoxTooltipContent;