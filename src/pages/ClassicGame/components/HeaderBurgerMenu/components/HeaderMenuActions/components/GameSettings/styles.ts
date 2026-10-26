import styled from "styled-components";

export const GameSettingsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    max-width: 100%;
    color: #f1edda;

    [aria-pressed="true"] {
        color: #f4d77f;
        text-decoration: underline;
    }
`;
