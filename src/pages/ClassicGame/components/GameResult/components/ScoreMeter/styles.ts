import styled from "styled-components";

export const ScoreMeterStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;

    > div { display: flex; flex-direction: column; align-items: center; gap: 10px; }
`;

export const ValueStyled = styled.strong`
    font-size: 36px;
    font-variant-numeric: tabular-nums;
    color: #f4d77f;
`;

export const TrackStyled = styled.div`
    position: relative;
    width: 36px;
    height: 180px;
    border: 1px solid #c5ba87;
    border-radius: 8px;
    background: #0d1713;
`;

export const FillStyled = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 7px;
    background: linear-gradient(to top, #ae5750, #f4d77f 75%, #a0d56c);
`;

export const ZeroStyled = styled.div`
    position: absolute;
    left: -4px;
    right: -4px;
    border-top: 1px solid #f1edda;

    span { position: absolute; left: calc(100% + 8px); transform: translateY(-50%); font-size: 12px; }
`;

export const IndicatorStyled = styled.span`
    position: absolute;
    left: -14px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 10px solid #f4d77f;
    transform: translateY(50%);
    pointer-events: none;
`;
