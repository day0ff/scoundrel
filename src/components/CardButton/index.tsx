import {FC} from "react";
import {CardButtonBorderStyled, CardButtonStyled} from "./styles.ts";
import {CardButtonPropsType} from "./types.ts";

const CardButton: FC<CardButtonPropsType> = ({$size = 4, className, children, ...buttonProps}) => {
    return (
        <CardButtonBorderStyled $size={$size} className={className}>
            <CardButtonStyled $size={$size} {...buttonProps}>
                {children}
            </CardButtonStyled>
        </CardButtonBorderStyled>
    );
}

export default CardButton;