import {useState, type FC} from "react";
import {useAppSelector} from "store/hooks.ts";
import {useWindowResizeObserver} from "hooks";
import {breakpoints} from "context/Theme/constants.ts";
import PaginatedGrid from "components/PaginatedGrid";
import ZoneCard from "./components/ZoneCard";
import {zoneCardsSelector} from "./selectors.ts";
import {CardsWrapperStyled, ZoneTitleStyled} from "./styles.ts";
import type {ZoneCardsPropsType} from "./types.ts";

const ZoneCards: FC<ZoneCardsPropsType> = ({zoneType, label}) => {
    const cards = useAppSelector(state => zoneCardsSelector(state, zoneType));
    const [selectedCardId, setSelectedCardId] = useState<string>();
    const {width, height} = useWindowResizeObserver();
    const isCompact = width <= breakpoints.laptop;
    const isLandscape = width > height;
    const compactLandscape = isCompact && isLandscape && height <= 480;
    const rows = compactLandscape ? 1 : 2;
    const columns = compactLandscape ? 5 : width <= breakpoints.mobile ? 3 : isCompact ? 4 : 5;
    // Match the pasteboard card widths and DraggableCardWrapper's vertical margins.
    const cardWidth = width <= breakpoints.tablet ? 120 : 140;
    const cardMargin = width <= breakpoints.tablet && width > height ? 8 : 16;
    const emptyItemSize = width <= breakpoints.laptop
        ? {width: cardWidth, height: cardWidth * 1.5 + cardMargin}
        : undefined;
    const items = cards.map(card => ({
        ...card,
        isSelected: selectedCardId === card.id,
        onSelect: () => setSelectedCardId(card.id),
    }));

    return (
        <>
            <ZoneTitleStyled>{label}</ZoneTitleStyled>
            <CardsWrapperStyled>
                <PaginatedGrid key={`${rows}-${columns}`} rowSize={rows} columnSize={columns} gap={isCompact ? 12 : 16} reserveEmptySpace={true} emptyItemSize={emptyItemSize} items={items} ItemComponent={ZoneCard}/>
            </CardsWrapperStyled>
        </>
    );
};

export default ZoneCards;
