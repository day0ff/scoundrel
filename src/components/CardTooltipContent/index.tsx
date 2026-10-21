import {FC} from "react";
import {useTranslation} from "react-i18next";
import WaveTypewriter from "components/TooltipContent/components/Formatters/components/WaveTypewriter";
import {CardTooltipContentStyled, CardTooltipDescriptionStyled, CardTooltipTitleStyled} from "./styles.ts";
import {CardTooltipContentPropsType} from "./types.ts";

const CardTooltipContent: FC<CardTooltipContentPropsType> = (
    {
        className,
        name,
        children,
    }
) => {
    const {t} = useTranslation();

    return (
        <CardTooltipContentStyled className={className}>
            <CardTooltipTitleStyled>
                <WaveTypewriter>{t(name)}</WaveTypewriter>
            </CardTooltipTitleStyled>
            <CardTooltipDescriptionStyled>
                {children}
            </CardTooltipDescriptionStyled>
        </CardTooltipContentStyled>
    );
}

export default CardTooltipContent;