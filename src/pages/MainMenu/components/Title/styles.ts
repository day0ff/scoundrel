import styled, {keyframes} from "styled-components";

const scanLines = keyframes`
    0% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -4px -4px 2px fuchsia, 4px 4px 2px blue;
    }

    20% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -6px -6px 2px fuchsia, 6px 4px 2px blue;
    }

    40% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -4px -4px 2px fuchsia, 4px 4px 2px blue;
    }

    60% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -2px -2px 2px fuchsia, 2px 2px 2px blue;
    }
    
    80% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -2px -2px 2px fuchsia, 2px 2px 2px blue;
    }

    100% {
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -4px -4px 2px fuchsia, 4px 4px 2px blue;
    }
`;

export const TitleStyled = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0;
    user-select: none;
    text-align: center;
    text-transform: capitalize;
    font-size: 108px;
    color: brown;
    text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black, -4px -4px 2px fuchsia, 4px 4px 2px blue;
    animation: ${scanLines} 12s linear infinite;
    max-width: 360px;
    line-height: 1.2;

    @media ${({theme}) => theme.media.laptop} {
        font-size: clamp(80px, 10vw, 96px);
    }
    @media ${({theme}) => theme.media.tablet} {
        font-size: clamp(40px, 9vw, 64px);
        max-width: 100%;
    }
    @media ${({theme}) => theme.media.mobile} {
        font-size: clamp(28px, 9vw, 42px);
    }
    @media (orientation: landscape) and (max-height: 480px) {
        font-size: clamp(28px, 8vw, 64px);
        max-width: 100%;
    }
`;
