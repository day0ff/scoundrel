import type {FC} from "react";
import {useDroppable} from "@dnd-kit/core";
import {EmptyCardStyled} from "../../styles.ts";
import {EmptyCardSlotStyled} from "./styles.ts";
import type {EmptyCardSlotPropsType} from "./types.ts";

const EmptyCardSlot: FC<EmptyCardSlotPropsType> = ({zoneType, index, label, canDrop, color}) => {
    const {setNodeRef, isOver} = useDroppable({
        id: `${zoneType}:empty:${index}`,
        disabled: !canDrop,
    });

    return (
        <EmptyCardSlotStyled ref={setNodeRef} $glowing={canDrop && isOver} $color={color}>
            <EmptyCardStyled role="img" aria-label={label}>+</EmptyCardStyled>
        </EmptyCardSlotStyled>
    );
};

export default EmptyCardSlot;
