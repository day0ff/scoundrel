import {packsCollectionsSelector} from "store/features/collections/selectors.ts";
import {useAppSelector} from "store/hooks.ts";
import {useCallback, type FC} from "react";
import {useTheme} from "styled-components";
import {useMediaQuery} from "react-responsive";
import {useTranslation} from "react-i18next";
import PaginatedGrid from "components/PaginatedGrid";
import PackBox from "./components/PackBox";

import {PacksTitleStyled, PacksWrapperStyled} from "./styles.ts";
import {PacksPropsType} from "./types.ts";
import type {PackBoxPropsType} from "./components/PackBox/types.ts";

const Packs: FC<PacksPropsType> = ({onPush, appendTo}) => {
    const {t} = useTranslation();
    const collection = useAppSelector(packsCollectionsSelector);
    const packs = collection.map(pack => ({...pack, id: pack.identifier, isSelected: false}));
    const theme = useTheme();
    const compactLandscape = useMediaQuery({query: `${theme.media.laptop} and (orientation: landscape) and (max-height: 480px)`});
    const columns = compactLandscape ? 4 : theme.device?.isTabletCascade ? 2 : theme.device?.isLaptopCascade ? 3 : 4;
    const rows = compactLandscape ? 1 : 2;
    const PackItem = useCallback((props: PackBoxPropsType) => (
        <PackBox {...props} appendTo={appendTo ?? props.appendTo}/>
    ), [appendTo]);
    return (
        <>
            <PacksTitleStyled>
                {t("modal.packs.title")}
            </PacksTitleStyled>
            <PacksWrapperStyled>
                <PaginatedGrid key={`${rows}-${columns}`} rowSize={rows} columnSize={columns} gap={32} items={packs} ItemComponent={PackItem} onPush={onPush}/>
            </PacksWrapperStyled>
        </>
    );
}

export default Packs;
