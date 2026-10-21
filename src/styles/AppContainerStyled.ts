import styled from "styled-components";
import {BorderStyle} from "./BorderStyle.ts";
import {OldScreenStyle} from "./OldScreenStyle.ts";

export const AppContainerStyled = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    ${OldScreenStyle};

    & .tippy-content {
        ${OldScreenStyle};
    }

    & .tippy-box {
        ${BorderStyle};
    }
`;
