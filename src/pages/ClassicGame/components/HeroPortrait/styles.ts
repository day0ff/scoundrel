import styled from "styled-components";
import {MarkTop} from "components/Card/styles.ts";
import {getColoredTextStrokeStyle} from "styles";
import HeroCard from "componentsShared/Collections/components/Heroes/components/HeroCard";
import {HeroDraggableCardStyled} from "componentsShared/Collections/components/Heroes/components/HeroCard/styles.ts";
import {TooltipStyled} from "components/Tooltip/styles.ts";

export const HeroPortraitStyled = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 12px;
`;

export const TitleStyled = styled.h2`
    margin: 0;
    max-width: clamp(95px, 12vw, 150px);
    font-size: 18px;
    text-align: center;
    overflow-wrap: anywhere;
`;

export const CardArtworkStyled = styled(HeroCard)`
    width: clamp(95px, 12vw, 150px);
    max-width: 100%;

    > ${TooltipStyled} {
        display: block;
        width: 100%;
    }

    ${HeroDraggableCardStyled} {
        width: 100%;
        box-sizing: border-box;
    }

    ${MarkTop} {
        top: 12px;
        left: 12px;
        font-size: 14px;
        letter-spacing: -1px;
        ${getColoredTextStrokeStyle("black")};

        &::first-letter { font-size: 18px; }
    }
`;
