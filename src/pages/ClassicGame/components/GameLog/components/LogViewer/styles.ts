import styled from "styled-components";

export const LogViewerStyled = styled.section`
    width: min(760px, calc(90vw - 84px));
    max-height: calc(90vh - 124px);
    overflow: auto;
    box-sizing: border-box;
    color: #f1edda;
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: left;

    h2, p { margin: 0; }
    header { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
    header h2 { flex: 1; }
    label { display: flex; flex-direction: column; gap: 8px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #526148; }
    pre { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; }
    ol { padding-left: 28px; margin: 0; }
    li { padding: 8px 0; }
    summary { cursor: pointer; }
`;
