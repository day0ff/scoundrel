import styled from "styled-components";
import {DraggableCardWrapper} from "components/DraggableCard/styles.ts";

export const ZoneCardStyled = styled(DraggableCardWrapper)`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    width: clamp(80px, 14vw, 150px);
    cursor: pointer;
`;
