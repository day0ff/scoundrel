import styled from "styled-components";

export const FrameStyled = styled.div<{$cornerWidth: number; $cornerHeight: number}>`
    position: relative;
    box-sizing: border-box;
    min-width: ${({$cornerWidth}) => $cornerWidth * 2}px;
    min-height: ${({$cornerHeight}) => $cornerHeight * 2}px;
    padding: ${({$cornerHeight, $cornerWidth}) => `${$cornerHeight}px ${$cornerWidth}px`};
`;

export const FrameArtworkStyled = styled.div<{$cornerWidth: number; $cornerHeight: number}>`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: ${({$cornerWidth}) => $cornerWidth}px minmax(0, 1fr) ${({$cornerWidth}) => $cornerWidth}px;
    grid-template-rows: ${({$cornerHeight}) => $cornerHeight}px minmax(0, 1fr) ${({$cornerHeight}) => $cornerHeight}px;
    pointer-events: none;
    user-select: none;
`;

export const FramePieceStyled = styled.svg<{$piece: string; $borderWidth: number; $borderHeight: number}>`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    image-rendering: pixelated;

    ${({$piece, $borderWidth, $borderHeight}) => {
        switch ($piece) {
            case "topLeft": return "grid-area: 1 / 1;";
            case "top": return `grid-area: 1 / 2; height: ${$borderHeight}px;`;
            case "topRight": return "grid-area: 1 / 3;";
            case "left": return `grid-area: 2 / 1; width: ${$borderWidth}px;`;
            case "right": return `grid-area: 2 / 3; width: ${$borderWidth}px; justify-self: end;`;
            case "bottomLeft": return "grid-area: 3 / 1;";
            case "bottom": return `grid-area: 3 / 2; height: ${$borderHeight}px; align-self: end;`;
            case "bottomRight": return "grid-area: 3 / 3;";
        }
    }}
`;
