import {useCallback, type FC} from "react";
import {useTheme} from "styled-components";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import PaginatedGrid from "components/PaginatedGrid";
import DeckBox from "./components/DeckBox";

import {decksCardCollectionsSelector} from "./selectors.ts";
import {DecksTitleStyled, DecksWrapperStyled} from "./styles.ts";
import {DecksPropsType} from "./types.ts";
import type {DeckBoxPropsType} from "./components/DeckBox/types.ts";

const Decks: FC<DecksPropsType> = ({onPush, appendTo}) => {
    const {t} = useTranslation();
    const decks = useAppSelector(decksCardCollectionsSelector);
    const theme = useTheme();
    const compactLandscape = useMediaQuery({query: `${theme.media.laptop} and (orientation: landscape) and (max-height: 480px)`});
    const columns = compactLandscape ? 4 : theme.device?.isTabletCascade ? 2 : theme.device?.isLaptopCascade ? 3 : 4;
    const rows = compactLandscape ? 1 : 2;
    const DeckItem = useCallback((props: DeckBoxPropsType) => (
        <DeckBox {...props} appendTo={appendTo ?? props.appendTo}/>
    ), [appendTo]);
    return (
        <>
            <DecksTitleStyled>
                {t`modal.decks.title`}
            </DecksTitleStyled>
            <DecksWrapperStyled>
                <PaginatedGrid key={`${rows}-${columns}`} rowSize={rows} columnSize={columns} gap={12} items={decks} ItemComponent={DeckItem} onPush={onPush}/>
            </DecksWrapperStyled>
        </>
    );
}

export default Decks;
