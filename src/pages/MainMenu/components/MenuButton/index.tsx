import {type FC, type MouseEvent, type FocusEvent} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {IS_PROD} from "constants.ts";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {MenuButtonStyled} from "./styles.ts";
import {MenuButtonPropsType} from "./types.ts";

const MenuButton: FC<MenuButtonPropsType> = ({className, to, showBullet = true, value, onClick, onMouseEnter, onMouseLeave, onFocus, ...restProps}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const sounds = useButtonSounds<HTMLInputElement>();

    const handleMouseEnter = (event: MouseEvent<HTMLInputElement>) => {
        onMouseEnter?.(event);
        sounds.onMouseEnter(event);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLInputElement>) => {
        sounds.onMouseLeave();
        onMouseLeave?.(event);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        onFocus?.(event);
        sounds.onFocus(event);
    };

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        if (event.currentTarget.disabled) return;

        sounds.onClick(event);

        // Callers opening modals replace the default navigation behavior.
        if (onClick) {
            onClick(event);
            return;
        }
        if (!to || event.defaultPrevented) return;

        navigate(to, { replace: IS_PROD })
    }

    return (
        <MenuButtonStyled
            {...restProps}
            className={className}
            value={(showBullet ? '• ' : '') + t(value as string)}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
        />
    );
}

export default MenuButton;
