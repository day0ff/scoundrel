import {useId, type FC} from "react";
import {useTranslation} from "react-i18next";
import TitleFrame from "../TitleFrame";
import {useAppSelector} from "store/hooks.ts";
import {heroClassicGameSelector} from "store/features/classic-game/selectors.ts";
import {HeroPortraitStyled, TitleStyled, CardArtworkStyled} from "./styles.ts";

const HeroPortrait: FC = () => {
    const {t} = useTranslation();
    const hero = useAppSelector(heroClassicGameSelector);
    const titleId = useId();

    if (!hero) return null;

    return (
        <HeroPortraitStyled data-hero-portrait aria-labelledby={titleId}>
            <TitleFrame>
                <TitleStyled id={titleId}>{t("ui.heroPortrait.title")}</TitleStyled>
            </TitleFrame>
            <CardArtworkStyled
                {...hero}
                id={`hero-portrait:${hero.identifier}`}
                isSelected={false}
                isSelectable
                isFlippable
            />
        </HeroPortraitStyled>
    );
};

export default HeroPortrait;
