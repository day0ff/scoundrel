import styled from "styled-components";
import MenuButton from "pages/MainMenu/components/MenuButton";
import { TextStrokeWithShadowStyle } from "styles";

export const HeaderMenuActionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    max-width: 100%;
    pointer-events: auto;
    padding: 0 0 16px;
    @media ${({theme}) => theme.media.tablet} {
        gap: 8px;
    }

    @media ${({theme}) => theme.media.mobile} {
        gap: 0;
    }
`;

export const HeaderMenuTitleStyled = styled.h2`
    font-size: ${({theme}) => theme.fontSize.huge};
    text-align: center;
    ${TextStrokeWithShadowStyle};
    color: whitesmoke;
    margin: 0;
    line-height: 1.4;
    @media ${({theme}) => theme.media.tablet} {
        font-size: 28px;
        margin-bottom: -12px;
    }
    @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
        margin-bottom: -24px;    
        font-size: 22px;
    }
`;

export const ActionButtonStyled = styled(MenuButton)`
    max-width: 100%;
    box-sizing: border-box;
    min-height: 44px;

    @media ${({theme}) => theme.media.laptop} {
        font-size: 32px;
        letter-spacing: -2px;
    }

    @media ${({theme}) => theme.media.tablet} {
        font-size: 24px;
    }

    @media ${({theme}) => theme.media.mobile} {
        font-size: 20px;
    }
`;
