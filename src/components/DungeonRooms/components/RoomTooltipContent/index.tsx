import type {FC} from "react";
import {Trans} from "react-i18next";
import {TAG_COMPONENTS_MAP} from "components/TooltipContent/constants.tsx";
import {RoomTooltipContentStyled, RoomDangerStyled} from "./styles.ts";
import type {RoomTooltipContentPropsType} from "./types.ts";

const RoomTooltipContent: FC<RoomTooltipContentPropsType> = ({className, kind, name, description, danger, dangerTranslationKey}) => {
    return (
        <RoomTooltipContentStyled className={className} name={name} $kind={kind}>
            <Trans i18nKey={description} components={TAG_COMPONENTS_MAP}/>
            {danger && dangerTranslationKey && (
                <RoomDangerStyled>
                    <Trans i18nKey={dangerTranslationKey} components={TAG_COMPONENTS_MAP}/>
                </RoomDangerStyled>
            )}
        </RoomTooltipContentStyled>
    );
};

export default RoomTooltipContent;
