import type {FC} from "react";
import {useTranslation} from "react-i18next";
import Tooltip from "components/Tooltip";
import {WeaponDurabilityStyled} from "./styles.ts";
import type {WeaponDurabilityPropsType} from "./types.ts";

const WeaponDurability: FC<WeaponDurabilityPropsType> = ({durability, appendTo, disabled}) => {
    const {t} = useTranslation();

    return (
        <Tooltip
            content={t("ui.weaponDurability.description")}
            appendTo={appendTo}
            disabled={disabled}
            placement="left"
            interactive={false}
        >
            <WeaponDurabilityStyled
                tabIndex={disabled ? -1 : 0}
                aria-label={t("ui.weaponDurability.label", {count: durability})}
            >
                {durability}
            </WeaponDurabilityStyled>
        </Tooltip>
    );
};

export default WeaponDurability;
