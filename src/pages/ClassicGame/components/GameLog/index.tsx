import {useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import ModalStack from "componentsShared/ModalStack";
import {useAppSelector} from "store/hooks.ts";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";
import {GameButtonStyled} from "../../styles.ts";
import LogViewer from "./components/LogViewer";

const GameLog: FC = () => {
    const {t} = useTranslation();
    const game = useAppSelector(classicGameSelector);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <GameButtonStyled disabled={!game?.log} onClick={() => setIsOpen(true)}>{t("ui.gameLog.title")}</GameButtonStyled>
            {isOpen && game?.log && (
                <ModalStack
                    isOpen={isOpen}
                    initialNode={<LogViewer/>}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default GameLog;
