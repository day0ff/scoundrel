import styled from "styled-components";
import { DeckStackStyled } from "components/Deck/styles.ts";

export const DeckZoneStyled = styled.section<{$over: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    gap: 8px;
    padding: 14px 0 0;

    ${DeckStackStyled} {
        filter: ${({$over}) => $over
            ? "drop-shadow(0 0 8px #f4d77f) drop-shadow(0 0 20px #e4bd4580)"
            : "drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)"};
        transition: filter 180ms ease;

        @media (prefers-reduced-motion: reduce) {
            transition: none;
        }
    }
    h2 { font-size: 18px; margin: 0; }

    @media (orientation: portrait) {
        padding: 0;
    }
    
`;
