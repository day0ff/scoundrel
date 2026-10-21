import styled from "styled-components";
import {MaxWidthStyle} from "./MaxWidthStyle.ts";

export const HeaderContainerStyled = styled.header`
    position: absolute;
    top: 0;
    z-index: 10;
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
    padding: 4px;
    ${MaxWidthStyle}
`;


export const HeaderItemStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: calc(100% - 120px);
`;

export const HeaderItemCenterStyled = styled.div`
    width: 60px;
`;