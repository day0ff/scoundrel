import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import {CollectionStatisticsType} from "store/features/collections/selectors.ts";
import {CollectionButtonStyled} from "./styles.ts";
import {CollectionButtonPropsType} from "./types.ts";

export function CollectionButton<T extends CollectionStatisticsType> ({className, translationKey, selector, onClick}: CollectionButtonPropsType<T>){
    const {t} = useTranslation();
    const {available, total} = useAppSelector(selector);

    return (
        <CollectionButtonStyled className={className} onClick={onClick}>
            {t(translationKey, {available, total})}
        </CollectionButtonStyled>
    );
}
