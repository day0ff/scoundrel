import {FC} from "react";
import {useTranslation} from "react-i18next";
import {HandTypes} from "entities/constants.ts";
import Tooltip from "components/Tooltip";
import WaveTypewriter from "components/TooltipContent/components/Formatters/components/WaveTypewriter";
import {HAND_TYPE_DESCRIPTION_TRANSLATIONS_MAP, HAND_TYPE_TRANSLATIONS_MAP} from "./constants.ts";
import {HandTypeTextStyled} from "./styles.ts";
import {HandTypeTextPropsType} from "./types.ts";


const HandTypeText: FC<HandTypeTextPropsType> = ({className, text = HandTypes.NONE}) => {
    const {t} = useTranslation();
    const name = HAND_TYPE_TRANSLATIONS_MAP[text] ?? HAND_TYPE_TRANSLATIONS_MAP[HandTypes.NONE];
    const description = HAND_TYPE_DESCRIPTION_TRANSLATIONS_MAP[text] ?? HAND_TYPE_DESCRIPTION_TRANSLATIONS_MAP[HandTypes.NONE];

    return (
        <HandTypeTextStyled className={className}>
            <Tooltip translationKey={description}>
                <span>
                    <WaveTypewriter>
                        {t(name)}
                    </WaveTypewriter>
                </span>
            </Tooltip>
        </HandTypeTextStyled>
    );
}

export default HandTypeText;