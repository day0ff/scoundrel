import styled from "styled-components";
import { getColoredTextStrokeStyle, PixelCardStyled } from "styles";
import DraggableDeck from "components/DraggableDeck";
import Tooltip from "components/Tooltip";
import { MarkTop } from "components/Card/styles.ts";

export const PackBoxStyled = styled.div`
  display: inline-block;
  margin-top: 16px;
`;

export const PackCardTooltipContentStyled = styled.div`
  position: absolute;
  inset: 0;
`;

export const PackTooltipStyled = styled(Tooltip)`
  cursor: pointer;
`;

export const PackCardWrapperStyled = styled.div`
  margin-top: -16px;
`;

export const PackBoxDraggableDeckStyled = styled(DraggableDeck).attrs({
  size: 6,
  wobbleIntensity: 3,
  wobbleSpeed: 0.001,
})<{ $color: string; $textStroke: string }>`
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  width: 200px;
  container-type: inline-size;
  aspect-ratio: 2 / 3;
  ${({ isSelected }) =>
    isSelected ? "filter: drop-shadow(0 0 8px #b77b34)" : null};

  ${MarkTop.toString()} {
    top: 10cqw;
    left: 10cqw;
    font-size: 10.5cqw;
    letter-spacing: -1px;
    color: ${({ $color }) => $color};
    ${({ $textStroke }) => getColoredTextStrokeStyle($textStroke)};

    &::first-letter {
      font-size: 14cqw;
      ${({ $textStroke }) => getColoredTextStrokeStyle($textStroke)};
    }
  }

  @media ${({ theme }) => theme.media.laptop} {
    width: 160px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: 140px;
  }
`;
