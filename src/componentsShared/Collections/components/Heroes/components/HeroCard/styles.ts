import styled from "styled-components";
import {getColoredTextStrokeStyle} from "styles";
import DraggableCard from "components/DraggableCard";
import {MarkTop} from "components/Card/styles.ts";

export const HeroCardStyled = styled.div`
    margin-top: 16px;
`;

export const HeroCardWrapperStyled = styled.div`
    margin-top: -16px;
`;

const WhiteSmokeTextStrokeStyle = getColoredTextStrokeStyle("whitesmoke");

export const HeroDraggableCardStyled = styled(DraggableCard).attrs({
    size: 6,
    wobbleIntensity: 3,
    wobbleSpeed: 0.001,
})`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    width: 250px;

    ${MarkTop.toString()} {
        top: 20px;
        left: 20px;
        font-size: 21px;
        letter-spacing: -1px;
        ${WhiteSmokeTextStrokeStyle};
    
        &::first-letter {
            font-size: 28px;
        }
    }
`;