import type {FC} from "react";
import WaveTypewriter from "components/TooltipContent/components/Formatters/components/WaveTypewriter";
import {
    CardTooltipContentStyled,
    CardTooltipDescriptionStyled,
    CardTooltipTitleStyled,
} from "components/CardTooltipContent/styles.ts";
import type {DeckTooltipContentPropsType} from "./types.ts";

const DeckTooltipContent: FC<DeckTooltipContentPropsType> = ({className, name, description}) => {
    return (
        <CardTooltipContentStyled className={className}>
            <CardTooltipTitleStyled>
                <WaveTypewriter>{name}</WaveTypewriter>
            </CardTooltipTitleStyled>
            <CardTooltipDescriptionStyled>
                {description}
            </CardTooltipDescriptionStyled>
        </CardTooltipContentStyled>
    );
};

export default DeckTooltipContent;
