import type {FC} from "react";
import {useTranslation} from "react-i18next";
import CardStat from "components/CardStat";
import type {WeaponLastKillPropsType} from "./types.ts";

const WeaponLastKill: FC<WeaponLastKillPropsType> = ({rank, strength, appendTo, disabled}) => {
    const {t} = useTranslation();

    return (
        <CardStat
            value={strength ?? rank}
            label={t("ui.weaponLastKill.label", {rank: strength ?? rank})}
            description={t("ui.weaponLastKill.description")}
            appendTo={appendTo}
            disabled={disabled}
        />
    );
};

export default WeaponLastKill;
