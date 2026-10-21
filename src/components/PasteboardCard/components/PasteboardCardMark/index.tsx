import {FC} from "react";
import {PasteboardCardMarkRankStyled, PasteboardCardMarkStyled, PasteboardCardSuitStyled} from "./styles.ts";
import {PasteboardCardMarkPropsType} from "./types.ts";

const PasteboardCardMark: FC<PasteboardCardMarkPropsType> = ({className, suit, rank, color}) => {
    return (
        <PasteboardCardMarkStyled className={className}>
            <PasteboardCardMarkRankStyled $color={color}>{rank}</PasteboardCardMarkRankStyled>
            <PasteboardCardSuitStyled>{suit}</PasteboardCardSuitStyled>
        </PasteboardCardMarkStyled>
    );
}

export default PasteboardCardMark;