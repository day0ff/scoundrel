import type {FC} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {activePackSelector, gameSelector} from "store/features/game/selectors.ts";
import {clearGame} from "store/features/game";
import {resetSelectedDungeon, selectGamePack} from "store/features/game/actions.ts";
import {packsCollectionsSelector} from "store/features/collections/selectors.ts";
import PackTabs from "componentsShared/PackTabs";
import PackBackground from "componentsShared/PackBackground";
import MenuButton from "pages/MainMenu/components/MenuButton";
import {
    DungeonPreviewStyled as PackSelectionStyled,
    DungeonPreviewTitleStyled as PackSelectionTitleStyled,
    ActionsStyled,
} from "pages/DungeonPreview/styles.ts";

const PackSelection: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const pack = useAppSelector(activePackSelector);
    const packs = useAppSelector(packsCollectionsSelector);
    const game = useAppSelector(gameSelector);
    const handleEnter = () => {
        if (!game || game.outcome) dispatch(resetSelectedDungeon());
        navigate("/dungeon-preview");
    };
    const handleHome = () => {
        if (game?.started === false || game?.outcome) dispatch(clearGame());
        navigate("/main-menu");
    };

    return (
        <PackSelectionStyled>
            <PackBackground src={pack.castle}/>
            <PackSelectionTitleStyled $color={pack.card.color ?? "black"}>{t(pack.name)}</PackSelectionTitleStyled>
            <PackTabs packs={packs} selectedIdentifier={pack.identifier}
                onSelect={identifier => dispatch(selectGamePack(identifier))}
                label={t("modal.packs.title")} idPrefix="select-pack" size="full"/>
            <ActionsStyled>
                <MenuButton value="page.pack-selection.enter" autoFocus data-page-autofocus onClick={handleEnter}/>
                <MenuButton value="page.pack-selection.home" onClick={handleHome}/>
            </ActionsStyled>
        </PackSelectionStyled>
    );
};

export default PackSelection;
