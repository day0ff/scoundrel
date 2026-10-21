import styled from "styled-components";
import Tile from "components/Tile";

export const MainFrameTileStyled = styled(Tile)<{$isOver: boolean}>`
    &::before {
        transition: filter 0.15s ease-in-out;
        filter: ${({$isOver}) => $isOver ? "brightness(1.4)" : "brightness(0.8)"};
    }
`;
