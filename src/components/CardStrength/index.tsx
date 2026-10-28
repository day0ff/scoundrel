import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {RANK_STRENGTH_MAP} from "entities/constants.ts";
import CardStat from "components/CardStat";
import type {CardStrengthPropsType} from "./types.ts";

const CardStrength: FC<CardStrengthPropsType> = ({rank, strength, appendTo, disabled}) => {
    const {t} = useTranslation();
    if (strength === undefined || strength === RANK_STRENGTH_MAP[rank]) return null;
    const label = t("ui.cardStrength", {strength});
    return <CardStat value={strength} label={label} description={label} appendTo={appendTo} disabled={disabled}/>;
};

export default CardStrength;
