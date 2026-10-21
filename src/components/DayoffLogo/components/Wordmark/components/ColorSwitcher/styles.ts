import styled from "styled-components";

export const SwitchStyled = styled.label`
    position: relative;
    display: inline-block;
    width: 0.375em;
    height: 0.71875em;
    transform: translateY(0.1875em);

    &::after {
        content: ".games";
        position: absolute;
        bottom: -1em;
        left: 0;
        font-size: 0.28125em;
        letter-spacing: 0.30556em;
        opacity: 0.2;
        pointer-events: none;
    }
`;

export const SliderStyled = styled.span`
    position: absolute;
    inset: 0;
    cursor: pointer;
    background: currentColor;
    border-radius: 0.15625em;

    &::before {
        position: absolute;
        content: "";
        width: 0.171875em;
        height: 0.28125em;
        top: 0.109375em;
        left: 0.109375em;
        border-radius: 0.0625em;
        background: var(--logo-background);
        transition: background-color 1.2s, transform 0.4s;
    }
`;

export const InputStyled = styled.input`
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;

    &:checked + ${SliderStyled}::before {
        transform: translateY(0.234375em);
    }

    &:focus-visible + ${SliderStyled} {
        outline: 2px solid currentColor;
        outline-offset: 4px;
    }
`;
