import {useCallback, type FC} from "react";
import {useTheme} from "styled-components";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import PaginatedGrid from "components/PaginatedGrid";
import DeckBox from "./components/DeckBox";

import {DecksTitleStyled, DecksWrapperStyled} from "./styles.ts";
import {DecksPropsType} from "./types.ts";
import type {DeckBoxPropsType} from "./components/DeckBox/types.ts";

const Decks: FC<DecksPropsType> = ({onPush, appendTo, decks, name, color}) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const compactLandscape = useMediaQuery({query: `${theme.media.laptop} and (orientation: landscape) and (max-height: 480px)`});
    const columns = compactLandscape ? 4 : theme.device?.isTabletCascade ? 2 : theme.device?.isLaptopCascade ? 3 : 4;
    const rows = compactLandscape ? 1 : 2;
    const DeckItem = useCallback((props: DeckBoxPropsType) => (
        <DeckBox {...props} appendTo={appendTo ?? props.appendTo}/>
    ), [appendTo]);
    return (
        <>
            <DecksTitleStyled $color={color}>
                {t(name)}
            </DecksTitleStyled>
            <DecksWrapperStyled>
                <PaginatedGrid key={`${rows}-${columns}`} rowSize={rows} columnSize={columns} gap={12} items={decks.map((deck, index) => ({...deck, id: `${deck.identifier}-${index}`, isSelected: false}))} ItemComponent={DeckItem} onPush={onPush}/>
            </DecksWrapperStyled>
        </>
    );
}

export default Decks;
