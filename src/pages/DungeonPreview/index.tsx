import {useEffect, useRef, type FC} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {activePackSelector, gameSelector} from "store/features/game/selectors.ts";
import {startGame} from "store/features/game";
import {resetSelectedDungeon} from "store/features/game/actions.ts";
import MenuButton from "pages/MainMenu/components/MenuButton";
import DungeonRooms from "components/DungeonRooms";
import PackBackground from "componentsShared/PackBackground";
import {DungeonPreviewStyled, ActionsStyled, DungeonPreviewTitleStyled, DungeonPreviewParagraphStyled} from "./styles.ts";

const DungeonPreview: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const game = useAppSelector(gameSelector);
    const pack = useAppSelector(activePackSelector);
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
        <DungeonPreviewStyled ref={previewRef}>
            <PackBackground src={pack.room}/>
            <DungeonPreviewTitleStyled $color={pack.card.color ?? "black"}>{t(pack.name)}</DungeonPreviewTitleStyled>
            <DungeonPreviewParagraphStyled>{t("page.dungeon-preview.description")}</DungeonPreviewParagraphStyled>
            {game && <DungeonRooms appendTo={() => previewRef.current ?? document.body}/>}
            <ActionsStyled>
                <MenuButton value="ui.dungeonRooms.enter" autoFocus data-page-autofocus onClick={enterDungeon}/>
                <MenuButton value="ui.dungeonRooms.reroll" onClick={() => dispatch(resetSelectedDungeon(game?.hero.identifier))}/>
                <MenuButton
                    value={"ui.dungeonRooms.back"}
                    to={"/pack-selection"}
                />
            </ActionsStyled>
        </DungeonPreviewStyled>
    );
};
export default DungeonPreview;
