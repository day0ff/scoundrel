import styled from "styled-components";

export const EmptyCardSlotStyled = styled.div<{$glowing: boolean; $color: string}>`
    position: absolute;
    inset: 0;
    pointer-events: none;
    filter: ${({$glowing, $color}) => $glowing
        ? `drop-shadow(0 0 8px ${$color}) drop-shadow(0 0 20px color-mix(in srgb, ${$color} 50%, transparent))`
        : "none"};
`;
