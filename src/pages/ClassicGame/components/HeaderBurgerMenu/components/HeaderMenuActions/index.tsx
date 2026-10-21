import GameSettings from "./components/GameSettings";
import type {FC} from "react";
import {useDndContext} from "@dnd-kit/core";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";
import {surrenderGame} from "store/features/classic-game";
import {ActionButtonStyled, HeaderMenuActionsStyled} from "./styles.ts";
import type {HeaderMenuActionsPropsType} from "./types.ts";

const HeaderMenuActions: FC<HeaderMenuActionsPropsType> = ({onCloseMenu}) => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(classicGameSelector);
    const {active} = useDndContext();

    return (
        <HeaderMenuActionsStyled>
            <ActionButtonStyled value="link.page.home" to="/main-menu" showBullet={false}/>
            <ActionButtonStyled
                value="ui.game.surrender"
                showBullet={false}
                disabled={!game || !!game.outcome || !!active}
                onClick={() => {
                    onCloseMenu();
                    dispatch(surrenderGame());
                }}
            />
            <GameSettings/>
        </HeaderMenuActionsStyled>
    );
};

export default HeaderMenuActions;
