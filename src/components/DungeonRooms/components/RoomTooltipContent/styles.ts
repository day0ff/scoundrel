import styled from "styled-components";
import CardTooltipContent from "components/CardTooltipContent";
import {CardTooltipTitleStyled} from "components/CardTooltipContent/styles.ts";
import type {DungeonRoomType} from "entities/dungeon-rooms/types.ts";

export const RoomTooltipContentStyled = styled(CardTooltipContent)<{$kind: DungeonRoomType["kind"]}>`
  position: relative;
  --card-tooltip-title-font-size: 42px;

  & ${CardTooltipTitleStyled} {
  color: ${({ $kind }) => {
    if ($kind === "treasure") return "gold";
    if ($kind === "royal") return "darkorange";
    if ($kind === "monster") return "red";
    return "darkslategray";
  }};
  text-shadow:
    -1px -1px 0 #222222,
    -1px 1px 0 #00000099,
    0 2px 1px #00000099,
    0 4px 1px darkgray;
  }

`;

export const RoomDangerStyled = styled.span`
  display: block;
  padding-top: 12px;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: #222222;
`;
