import styled from "styled-components";
import {getColoredTextStrokeStyle, PixelCardStyled} from "styles";
import DraggableDeck from "components/DraggableDeck";
import Tooltip from "components/Tooltip";
import {MarkTop} from "components/Card/styles.ts";

export const DeckBoxStyled = styled.div`
    display: inline-block;
    margin-top: 16px;
`;

export const RoomCardTooltipContentStyled = styled.div`
    position: absolute;
    inset: 0;
`;

export const RoomTooltipStyled = styled(Tooltip)`
    cursor: pointer;
`;

export const RoomCardWrapperStyled = styled.div`
    margin-top: -16px;
`;

const TextStrokeStyle = getColoredTextStrokeStyle("black");

export const DeckBoxDraggableDeckStyled = styled(DraggableDeck).attrs({
    size: 6,
    wobbleIntensity: 3,
    wobbleSpeed: 0.001,
})<{$color: string}>`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    width: 200px;
    container-type: inline-size;
    aspect-ratio: 2 / 3;
    ${({isSelected}) => isSelected ? "filter: drop-shadow(0 0 8px #b77b34)" : null};

    ${MarkTop.toString()} {
        top: 10cqw;
        left: 10cqw;
        font-size: 10.5cqw;
        letter-spacing: -1px;
        color: ${({$color}) => $color};
        ${TextStrokeStyle};

        &::first-letter {
            font-size: 14cqw;
            ${TextStrokeStyle};
        }
    }

    ${PixelCardStyled}::after {
        background-color: ${({isSelected, $color}) => isSelected ? $color : "black"};
    }

    @media ${({theme}) => theme.media.laptop} {
        width: 160px;
    }
    @media ${({theme}) => theme.media.tablet} {
        width: 140px;
    }
`;

export const LabelsWrapperStyled = styled.div`
    position: absolute;
    display: flex;
    justify-content: center; 
    flex-wrap: nowrap;
    width: 130px;
    background-color: transparent;
    left: 50%;
    bottom: 30%;
    transform: translateX(-50%);
    pointer-events: none;
    
    & svg {
        filter: drop-shadow(2px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 -1px 0 black);
    }
    
    & > * {
        flex: 1 1 25px;
        margin: 0 -25px;
    }
`;

export const LabelWrapperStyled = styled.span`
    display: inline-block;
    text-align: center;
`;
