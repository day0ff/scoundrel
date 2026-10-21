import type {FC} from "react";
import {useTranslation} from "react-i18next";
import Tooltip from "components/Tooltip";
import {WeaponLastKillStyled} from "./styles.ts";
import type {WeaponLastKillPropsType} from "./types.ts";

const WeaponLastKill: FC<WeaponLastKillPropsType> = ({rank, appendTo, disabled}) => {
    const {t} = useTranslation();

    return (
        <Tooltip
            content={t("ui.weaponLastKill.description")}
            appendTo={appendTo}
            disabled={disabled}
            placement="left"
            interactive={false}
        >
            <WeaponLastKillStyled
                tabIndex={disabled ? -1 : 0}
                aria-label={t("ui.weaponLastKill.label", {rank})}
            >
                {rank}
            </WeaponLastKillStyled>
        </Tooltip>
    );
};

export default WeaponLastKill;
