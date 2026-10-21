import {FC} from "react";
import {useTranslation} from "react-i18next";
import Tooltip from "../Tooltip";
import {TooltipContentStyled} from "../TooltipContent/styles.ts";
import {TagPropsType} from "./types.ts";
import {TagContentStyled} from "./styles.ts";
import RootTag from "../TooltipContent/components/RootTag";

const Tag: FC<TagPropsType> = ({isRoot = false, name, description, style}) => {
    const {t} = useTranslation();

    return isRoot ? (
        <TooltipContentStyled $isRoot={isRoot} style={style}>
            <RootTag>
                {t(name)}
            </RootTag>
        </TooltipContentStyled>
    ) : (
        <Tooltip translationKey={description}>
            <TagContentStyled style={style}>
                <RootTag>
                    {t(name)}
                </RootTag>
            </TagContentStyled>
        </Tooltip>
    );
}

export default Tag;