import {FC} from "react";
import {DefaultLoaderStyled} from "./styles.ts";
import {DefaultLoaderPropsType} from "./types.ts";
import {useTranslation} from "react-i18next";

const DefaultLoader: FC<DefaultLoaderPropsType> = ({isVisible, className}) => {
    const {t} = useTranslation();

    return (
        <DefaultLoaderStyled $isVisible={isVisible} className={className}>
            {t`loading.default.text`}
        </DefaultLoaderStyled>
    );
};

export default DefaultLoader;
