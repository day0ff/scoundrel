import {useState, type FC} from "react";
import {useAppSelector} from "store/hooks.ts";
import PaginatedGrid from "components/PaginatedGrid";
import ZoneCard from "./components/ZoneCard";
import {zoneCardsSelector} from "./selectors.ts";
import {CardsWrapperStyled, ZoneTitleStyled} from "./styles.ts";
import type {ZoneCardsPropsType} from "./types.ts";

const ZoneCards: FC<ZoneCardsPropsType> = ({zoneType, label}) => {
    const cards = useAppSelector(state => zoneCardsSelector(state, zoneType));
    const [selectedCardId, setSelectedCardId] = useState<string>();
    const items = cards.map(card => ({
        ...card,
        isSelected: selectedCardId === card.id,
        onSelect: () => setSelectedCardId(card.id),
    }));

    return (
        <>
            <ZoneTitleStyled>{label}</ZoneTitleStyled>
            <CardsWrapperStyled>
                <PaginatedGrid rowSize={2} columnSize={5} reserveEmptySpace={true} items={items} ItemComponent={ZoneCard}/>
            </CardsWrapperStyled>
        </>
    );
};

export default ZoneCards;
