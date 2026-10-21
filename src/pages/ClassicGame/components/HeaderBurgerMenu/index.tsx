import {useState, type FC} from "react";
import {useTheme} from "context/Theme/useTheme.ts";
import {HeaderMenuModalStyled} from "./styles.ts";
import HeaderMenuActions from "./components/HeaderMenuActions";
import {HeaderMenuButtonStyled} from "../../styles.ts";

const HeaderBurgerMenu: FC = () => {
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
                    initialNode={<HeaderMenuActions onCloseMenu={() => setIsOpen(false)}/>}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default HeaderBurgerMenu;
