import styled from "styled-components";
import MenuButton from "pages/MainMenu/components/MenuButton";

export const HeaderMenuActionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
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
