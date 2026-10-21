import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {endTurn, skipRoom} from "store/features/classic-game";
import Tooltip from "components/Tooltip";
import {canEndRoomSelector, canSkipRoomSelector, showEndTurnSelector} from "./selectors.ts";
import {TurnButtonStyled} from "./styles.ts";
import type {TurnControlsPropsType} from "./types.ts";

const TurnControls: FC<TurnControlsPropsType> = ({disabled = false}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const canEnd = useAppSelector(canEndRoomSelector);
    const canSkip = useAppSelector(canSkipRoomSelector);
    const showEndTurn = useAppSelector(showEndTurnSelector);

    return (
        <Tooltip translationKey="ui.turn.hint">
            <span>
                <TurnButtonStyled
                    $canSkip={!disabled && !showEndTurn && canSkip}
                    disabled={disabled || (showEndTurn ? !canEnd : !canSkip)}
                    onClick={() => dispatch(showEndTurn ? endTurn() : skipRoom())}
                >
                    {t(showEndTurn ? "ui.button.endTurn" : "ui.button.skipRoom")}
                </TurnButtonStyled>
            </span>
        </Tooltip>
    );
};

export default TurnControls;
