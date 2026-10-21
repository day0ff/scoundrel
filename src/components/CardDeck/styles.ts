import styled from "styled-components";

export const CardDeckStyled = styled.div`
    display: grid;
    gap: 12px;
    justify-items: center;
`;

export const DeckStackStyled = styled.div<{$empty: boolean}>`
    position: relative;
    width: clamp(80px, 12vw, 150px);
    aspect-ratio: 2 / 3;
    border: 2px dashed #b3b9a566;
    border-radius: 10px;
    display: grid;
    place-items: center;
    box-shadow: ${({$empty}) => $empty ? "none" : "4px 4px 0 #30382c, 8px 8px 0 #121b16"};
    pointer-events: none;
`;
