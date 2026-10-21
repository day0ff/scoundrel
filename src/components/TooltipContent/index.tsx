import {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "./constants.tsx";
import {TooltipContentStyled} from "./styles.ts";
import {TooltipContentPropsType} from "./types.ts";

const TooltipContent: FC<TooltipContentPropsType> = (
    {
        className,
        translationKey,
        values
    }
) => {
    return (
        <TooltipContentStyled className={className}>
            <Trans i18nKey={translationKey} components={TAG_COMPONENTS_MAP} values={values}/>
        </TooltipContentStyled>
    );
}

export default TooltipContent;