import {useCallback, type FC} from "react";
import {useTheme} from "styled-components";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import PaginatedGrid from "components/PaginatedGrid";
import PasteboardCard from "./components/PasteboardCard";
import {PasteboardsTitleStyled, CardsWrapperStyled} from "./styles.ts";
import {PasteboardsPropsType} from "./types.ts";
import type {PasteboardCardPropsType} from "./components/PasteboardCard/types.ts";


const Pasteboards: FC<PasteboardsPropsType> = ({name, color, pasteboards, appendTo}) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const compactLandscape = useMediaQuery({query: `${theme.media.laptop} and (orientation: landscape) and (max-height: 480px)`});
    const columns = compactLandscape ? 5 : theme.device?.isMobile ? 3 : theme.device?.isLaptopCascade ? 4 : 5;
    const rows = compactLandscape ? 1 : 2;
    const CardItem = useCallback((props: PasteboardCardPropsType) => (
        <PasteboardCard {...props} appendTo={appendTo ?? props.appendTo}/>
    ), [appendTo]);

    return (
        <>
            <PasteboardsTitleStyled $color={color}>
                {t(name)}
            </PasteboardsTitleStyled>
            <CardsWrapperStyled>
                <PaginatedGrid key={`${rows}-${columns}`} rowSize={rows} columnSize={columns} gap={12} items={pasteboards.map(card => ({...card, id: card.identifier, isSelected: false}))} ItemComponent={CardItem}/>
            </CardsWrapperStyled>
        </>
    );
}

export default Pasteboards;
