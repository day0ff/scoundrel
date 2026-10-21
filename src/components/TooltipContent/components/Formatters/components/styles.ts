import {keyframes} from "styled-components";

export const bounce = keyframes`
    0% {
        transform: translateY(0);
    }
    3% {
        transform: translateY(-12%);
    }
    6% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(0);
    }
`;

export const fadeIn = keyframes`
    to {
        opacity: 1;
    }
`;