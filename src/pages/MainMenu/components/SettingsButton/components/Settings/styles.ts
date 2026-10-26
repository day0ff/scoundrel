import styled from "styled-components";
import {CollectionsTitleStyled} from "componentsShared/Collections/styles.ts";

export const SettingsStyled = styled.section`
    box-sizing: border-box;
    width: min(760px, 100%);
    color: #f1edda;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-bottom: 24px;
    min-width: 0;
    line-height: 1.5;

    ${CollectionsTitleStyled} {
        grid-column: 1 / -1;
        margin: 0;
        line-height: 1.4;
    }

    @media ${({theme}) => theme.media.tablet} {
        display: flex;
        flex-direction: column;
        width: min(400px, 100%);
        font-size: 14px;
        gap: 16px;
        ${CollectionsTitleStyled} { font-size: 28px; }
    }

    @media ${({theme}) => theme.media.mobile} {
        ${CollectionsTitleStyled} { font-size: 22px; }
    }

    @media (orientation: landscape) and (max-height: 480px) {
        display: grid;
        width: min(640px, 100%);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        font-size: 12px;
        ${CollectionsTitleStyled} { grid-column: 1 / -1; font-size: 24px; }
    }

    input { accent-color: #d2a052; cursor: pointer; }
    input:focus-visible {
        outline: 3px solid #f4d77f;
        outline-offset: 4px;
    }
`;

export const ControlsStyled = styled.fieldset`
    margin: 0;
    padding: 16px;
    border: 1px solid #c5ba87;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    overflow-wrap: anywhere;

    @media ${({theme}) => theme.media.tablet}, (orientation: landscape) and (max-height: 480px) {
        padding: 12px;
        gap: 12px;
    }

    legend { padding: 0 8px; }
`;

export const ToggleStyled = styled.label`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    min-height: 44px;

    input { width: 20px; height: 20px; flex-shrink: 0; }
`;

export const VolumeStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;

    input { grid-column: 1 / -1; width: 100%; margin: 0; min-height: 32px; }
`;
