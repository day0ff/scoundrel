import styled from "styled-components";
import {CardFacetStyled} from "components/Card/styles.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {GameCardMarkStyle} from "../../../CardZone/components/GameCard/styles.ts";

export const CallLayerStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    overflow: hidden;
    pointer-events: none;
    ${GameCardMarkStyle};

    ${CardFacetStyled} { ${OldScreenStyle}; }
`;
