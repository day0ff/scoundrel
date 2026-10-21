import {FC} from "react";
import {useTranslation} from "react-i18next";
import {    heroesStatisticsCollectionSelector} from "store/features/collections/selectors.ts";
import {CollectionButton} from "./components/CollectionButton";
import Heroes from "./components/Heroes";
import {CollectionsButtonsContainerStyled, CollectionsTitleStyled} from "./styles.ts";
import {CollectionsPropsType} from "./types.ts";

const Collections: FC<CollectionsPropsType> = ({onPush}) => {
    const {t} = useTranslation();

    return (
        <>
            <CollectionsTitleStyled>
                {t`modal.collections.title`}
            </CollectionsTitleStyled>
            <CollectionsButtonsContainerStyled>
                <CollectionButton translationKey={"collections.heroes.button.text"} selector={heroesStatisticsCollectionSelector} onClick={() => onPush?.(<Heroes/>)}/>
            </CollectionsButtonsContainerStyled>
        </>
    );
}

export default Collections;