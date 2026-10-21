import type {FC} from "react";
import MainFrame from "components/MainFrame";
import {useTheme} from "context/Theme/useTheme.ts";
import {UnframedTitleStyled} from "./styles.ts";
import type {TitleFramePropsType} from "./types.ts";

const TitleFrame: FC<TitleFramePropsType> = ({children, keepFrame = false}) => {
    const {theme} = useTheme();

    if (theme.device?.isTabletCascade) {
        return <div hidden>{children}</div>;
    }

    if (theme.device?.isLaptopCascade && !keepFrame) {
        return <UnframedTitleStyled>{children}</UnframedTitleStyled>;
    }

    return (
        <MainFrame variant="title" tileVariant="tile" cornerRadius={32}>
            {children}
        </MainFrame>
    );
};

export default TitleFrame;
