import styled from "styled-components";
import {ButtonStyled} from "styles";

export const CollectionButtonStyled = styled(ButtonStyled)`
    padding: 16px 24px;
    background-color: #b90000;
    font-size: ${({theme}) => theme.fontSize.medium};
`;
