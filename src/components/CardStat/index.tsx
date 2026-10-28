import type {FC} from "react";
import Tooltip from "components/Tooltip";
import {CardStatStyled} from "./styles.ts";
import type {CardStatPropsType} from "./types.ts";

const CardStat: FC<CardStatPropsType> = ({value, label, description, appendTo, disabled}) => (
    <Tooltip content={description} appendTo={appendTo} disabled={disabled} placement="left" interactive={false}>
        <CardStatStyled tabIndex={disabled ? -1 : 0} aria-label={label}>{value}</CardStatStyled>
    </Tooltip>
);

export default CardStat;
