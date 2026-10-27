import {useEffect, useRef, type FC} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {BASE_URL} from "constants.ts";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {gameSelector} from "store/features/game/selectors.ts";
import {clearGame, startGame} from "store/features/game";
import {resetSelectedDungeon} from "store/features/game/actions.ts";
import MenuButton from "pages/MainMenu/components/MenuButton";
import DungeonRooms from "components/DungeonRooms";
import {DungeonPreviewStyled, ActionsStyled, DungeonPreviewTitleStyled, DungeonPreviewParagraphStyled} from "./styles.ts";

const DungeonPreview: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const game = useAppSelector(gameSelector);
    const previewRef = useRef<HTMLElement>(null);
    const initialized = useRef(false);
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if (!game) dispatch(resetSelectedDungeon());
    }, [dispatch, game]);
    const enterDungeon = () => {
        dispatch(startGame());
        navigate("/classic-game");
    };
    return (
        <DungeonPreviewStyled ref={previewRef} $url={`${BASE_URL}/images/backgrounds/classic-dangen.png`}>
            <DungeonPreviewTitleStyled>{t("page.dungeon-preview.title")}</DungeonPreviewTitleStyled>
            <DungeonPreviewParagraphStyled>{t("page.dungeon-preview.description")}</DungeonPreviewParagraphStyled>
            {game && <DungeonRooms appendTo={() => previewRef.current ?? document.body}/>}
            <ActionsStyled>
                <MenuButton value="ui.dungeonRooms.enter" autoFocus data-page-autofocus onClick={enterDungeon}/>
                <MenuButton value="ui.dungeonRooms.reroll" onClick={() => dispatch(resetSelectedDungeon(game?.hero.identifier))}/>
                <MenuButton value="ui.dungeonRooms.back" onClick={() => { dispatch(clearGame()); navigate("/main-menu"); }}/>
            </ActionsStyled>
        </DungeonPreviewStyled>
    );
};
export default DungeonPreview;
