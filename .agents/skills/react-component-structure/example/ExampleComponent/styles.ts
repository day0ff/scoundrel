import styled from "styled-components";

export const ExampleComponentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const ExampleTitleStyled = styled.h2`
    margin: 0;
`;

export const ExampleListStyled = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;

    @media ${({theme}) => theme.media.tablet} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media ${({theme}) => theme.media.mobile} {
        grid-template-columns: 1fr;
        gap: 8px;
    }
`;
