import styled from "styled-components";
import {PixelCardStyled} from "styles";
import {CardFacetStyled} from "components/Card/styles.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import type {PasteboardRoleType} from "entities/pasteboards/types.ts";
import {CARD_INTERACTION_COLORS} from "../../constants.ts";
import {GameCardMarkStyle} from "../CardZone/components/GameCard/styles.ts";

export const CardDragPreviewStyled = styled.div<{$role: PasteboardRoleType; $showPotionGlow: boolean}>`
    ${GameCardMarkStyle};
    width: 100%;
    height: 100%;
    position: relative;
    isolation: isolate;
    perspective: 1000px;
    filter: drop-shadow(8px 12px 0 #00000099);
    pointer-events: none;

    &::before {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 20px;
        z-index: -1;
        box-shadow: 0 0 12px 4px ${CARD_INTERACTION_COLORS.potion},
            0 0 26px 6px color-mix(in srgb, ${CARD_INTERACTION_COLORS.potion} 55%, transparent);
        opacity: ${({$showPotionGlow}) => $showPotionGlow ? 1 : 0};
        pointer-events: none;
    }

    ${PixelCardStyled}::after {
        background: ${({$role}) => CARD_INTERACTION_COLORS[$role]};
    }

    ${CardFacetStyled} {
        ${OldScreenStyle};
        backface-visibility: hidden;

        &::after {
            border-radius: inherit;
            animation: none;
        }
    }
`;
