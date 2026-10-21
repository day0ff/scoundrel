import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TitleStyled} from "./styles.ts";
import {TitlePropsType} from "./types.ts";

const Title: FC<TitlePropsType> = () => {
    const {t} = useTranslation();

    return (
        <TitleStyled>
            {t`page.main-menu.title`}
        </TitleStyled>

    );
}

export default Title;