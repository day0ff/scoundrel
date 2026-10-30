import styled from "styled-components";
import {CardFacetStyled} from "components/Card/styles.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {GameCardMarkStyle} from "../../../CardZone/components/GameCard/styles.ts";

export const HatchLayerStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
    ${GameCardMarkStyle};
    ${CardFacetStyled} { ${OldScreenStyle}; }
`;

export const EggTemplateStyled = styled.div`
    position: absolute;
    visibility: hidden;
`;
