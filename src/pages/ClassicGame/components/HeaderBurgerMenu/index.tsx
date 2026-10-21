import {useState, type FC} from "react";
import {useTheme} from "context/Theme/useTheme.ts";
import {HeaderMenuModalStyled} from "./styles.ts";
import HeaderMenuActions from "./components/HeaderMenuActions";
import {HeaderMenuButtonStyled} from "../../styles.ts";
import type {HeaderBurgerMenuPropsType} from "./types.ts";

const HeaderBurgerMenu: FC<HeaderBurgerMenuPropsType> = ({onHome, onSurrender}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {theme} = useTheme();

    if (!theme.device?.isTabletCascade) return null;

    return (
        <>
            <HeaderMenuButtonStyled
                $tabletMenu
                value="ui.game.menu.label"
                showBullet={false}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
            />
            {isOpen && (
                <HeaderMenuModalStyled
                    isOpen={isOpen}
                    initialNode={<HeaderMenuActions onHome={onHome} onSurrender={onSurrender} onCloseMenu={() => setIsOpen(false)}/>}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default HeaderBurgerMenu;
