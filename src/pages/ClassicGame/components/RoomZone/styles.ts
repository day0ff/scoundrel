import styled from "styled-components";
import {CardsStyled, EmptyCardStyled} from "../CardZone/styles.ts";

export const RoomZoneStyled = styled.div`
    min-width: 0;
    width: 100%;

    &[data-deal-paused="true"] [data-card-animation] {
        animation-play-state: paused;
    }

    ${CardsStyled} {
        padding-block: 16px 8px;
        gap: 20px;
        @media ${({theme}) => theme.media.tablet} {
            padding: 0;
            gap: 0;
        }
    }

    ${EmptyCardStyled} {
        width: 100%;
    }
`;
