import {memo, type FC} from "react";
import Frame from "components/Frame";
import {MAIN_FRAME_MAP} from "./constants.ts";
import {MainFrameTileStyled} from "./styles.ts";
import type {MainFramePropsType} from "./types.ts";

export type {MainFramePropsType, MainFrameVariant} from "./types.ts";

const MemoFrame = memo(Frame);

const MainFrame: FC<MainFramePropsType> = ({className, variant = "outer", tileVariant, indent, cornerRadius, isOver = false, ...props}) => (
    <MainFrameTileStyled className={className} variant={tileVariant} indent={indent} cornerRadius={cornerRadius} $isOver={isOver}>
        <MemoFrame {...props} {...MAIN_FRAME_MAP[variant]}/>
    </MainFrameTileStyled>
);

export default MainFrame;
