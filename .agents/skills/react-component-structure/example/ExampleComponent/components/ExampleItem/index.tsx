import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {ExampleItemStyled} from "./styles.ts";
import type {ExampleItemPropsType} from "./types.ts";

const ExampleItem: FC<ExampleItemPropsType> = ({name}) => {
    const {t} = useTranslation();

    return <ExampleItemStyled>{t(name)}</ExampleItemStyled>;
};

export default ExampleItem;
