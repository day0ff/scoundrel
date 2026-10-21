import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {showExampleSummary} from "./actions.ts";
import ExampleItem from "./components/ExampleItem";
import {exampleItemsSelector} from "./selectors.ts";
import {ExampleComponentStyled, ExampleTitleStyled, ExampleListStyled} from "./styles.ts";
import type {ExampleComponentPropsType} from "./types.ts";
import {COLLECTION_TITLE_TRANSLATIONS} from "./constants.ts";

const getTitleTranslationKey = (collection: ExampleComponentPropsType["collection"]) =>
    COLLECTION_TITLE_TRANSLATIONS[collection];

const ExampleComponent: FC<ExampleComponentPropsType> = ({collection}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const items = useAppSelector(exampleItemsSelector);

    return (
        <ExampleComponentStyled>
            <ExampleTitleStyled>{t(getTitleTranslationKey(collection))}</ExampleTitleStyled>
            <ExampleListStyled>
                {items.map(({identifier, name}) => (
                    <ExampleItem key={identifier} name={name}/>
                ))}
            </ExampleListStyled>
            <button type="button" onClick={() => dispatch(showExampleSummary())}>
                Show summary
            </button>
        </ExampleComponentStyled>
    );
};

export default ExampleComponent;
