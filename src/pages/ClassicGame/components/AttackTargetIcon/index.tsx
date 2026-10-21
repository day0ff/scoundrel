import type {FC} from "react";
import {BASE_URL} from "constants.ts";
import {useTranslation} from "react-i18next";
import Tooltip from "components/Tooltip";
import type {AttackTargetIconPropsType} from "./types.ts";
import {TargetIconStyled} from "./styles.ts";

const AttackTargetIcon: FC<AttackTargetIconPropsType> = ({visible, appendTo, hoverable = true}) => {
    const {t} = useTranslation();

    return (
        <Tooltip
            disabled={!visible || !hoverable}
            content={t("ui.attackTarget.description")}
            placement="top"
            appendTo={appendTo}
            interactive={false}
            delay={0}
        >
            <TargetIconStyled
                $visible={visible}
                $hoverable={hoverable}
                src={`${BASE_URL}/images/interface/target.png`}
                alt=""
                aria-hidden="true"
                draggable={false}
            />
        </Tooltip>
    );
};

export default AttackTargetIcon;
