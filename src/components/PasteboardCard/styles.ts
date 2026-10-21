import styled from "styled-components";
import {getColoredTextStrokeStyle} from "styles";
import DraggableCard from "components/DraggableCard";
import {MarkTop} from "components/Card/styles.ts";

export const PasteboardCardStyled = styled.div`
    margin-top: 16px;
`;

export const PasteboardCardWrapperStyled = styled.div`
    margin-top: -16px;
`;

const TextStrokeStyle = getColoredTextStrokeStyle("black");

export const PasteboardDraggableCardStyled = styled(DraggableCard).attrs({
    size: 6,
    wobbleIntensity: 3,
    wobbleSpeed: 0.001,
})<{ $color?: string }>`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    width: 180px;

    ${MarkTop.toString()} {
        top: 20px;
        left: 20px;
        color: ${({$color}) => $color ?? 'darkgreen'};
        font-size: 21px;
        letter-spacing: 1px;
        ${TextStrokeStyle};

        &::first-letter {
            ${TextStrokeStyle};
            font-size: 28px;
        }
    }
`;
