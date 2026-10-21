import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import PaginatedGrid from "components/PaginatedGrid";
import HeroCard from "./components/HeroCard";
import {heroesCardCollectionsSelector} from "./selectors.ts";
import {HeroTitleStyled, CardsWrapperStyled} from "./styles.ts";
import {HeroesPropsType} from "./types.ts";

const Heroes: FC<HeroesPropsType> = () => {
    const {t} = useTranslation();
    const heroes = useAppSelector(heroesCardCollectionsSelector);

    return (
        <>
            <HeroTitleStyled>
                {t`modal.collection.heroes.title`}
            </HeroTitleStyled>
            <CardsWrapperStyled>
                <PaginatedGrid rowSize={2} columnSize={3} items={heroes} ItemComponent={HeroCard}/>
            </CardsWrapperStyled>
        </>
    );
}

export default Heroes;