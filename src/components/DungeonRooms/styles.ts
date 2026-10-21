import styled from "styled-components";
import { DUNGEON_ROOM_GLOW_COLORS } from "./constants.ts";
import type { DungeonRoomType } from "entities/dungeon-rooms/types.ts";

export const DungeonRoomsStyled = styled.ol<{$fadeLeft: boolean; $fadeRight: boolean}>`
  --room-width: 76px;
  --room-icon-size: 56px;
  --room-connector-top: 22px;
  --room-connector-height: 12px;
  --room-index-height: 30px;
  --room-index-padding: 12px;
  --room-index-font-size: 12px;
  position: relative;
  isolation: isolate;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  list-style: none;
  margin: 0;
  padding: 12px 24px;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  align-items: center;
  justify-content: flex-start;
  mask-image: linear-gradient(
    to right,
    ${({$fadeLeft}) => $fadeLeft ? "transparent" : "black"},
    ${({$fadeLeft}) => $fadeLeft ? "rgba(0, 0, 0, 0.15)" : "black"} 16px,
    black min(64px, 40%),
    black calc(100% - min(64px, 40%)),
    ${({$fadeRight}) => $fadeRight ? "rgba(0, 0, 0, 0.15)" : "black"} calc(100% - 16px),
    ${({$fadeRight}) => $fadeRight ? "transparent" : "black"}
  );

  > :first-child { margin-left: auto; }
  > :last-child { margin-right: auto; }

  @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
    --room-width: 60px;
    --room-icon-size: 44px;
    --room-connector-top: 18px;
    --room-connector-height: 8px;
    --room-index-height: 24px;
    --room-index-padding: 8px;
    --room-index-font-size: 10px;
    padding: 10px 16px;
  }
`;

export const RoomStyled = styled.li<{ $status: DungeonRoomType["status"] }>`
  flex: 0 0 var(--room-width);
  position: relative;
  text-align: center;
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    left: -50%;
    right: 50%;
    top: var(--room-connector-top);
    height: var(--room-connector-height);
    box-sizing: border-box;
    background: ${({ $status }) =>
      $status === "upcoming" ? "#3d321d" : "#ffc342"};
    border: 2px solid
      ${({ $status }) => ($status === "upcoming" ? "#66512b" : "#ffe29a")};
  }
  > span {
    position: relative;
    z-index: 1;
    display: inline-block;
    transform: ${({ $status }) =>
      $status === "current" ? "scale(1.25)" : "none"};
    filter: ${({ $status }) =>
      $status === "completed" ? "brightness(50%) grayscale(25%)" : "none"};
    transition:
      transform 150ms ease,
      filter 150ms ease;
  }
  &:first-child::before {
    display: none;
  }
  div[tabindex] {
    outline: none;
  }
  &:hover,
  &:focus-within {
    > span {
      z-index: 2;
      transform: ${({ $status }) =>
        $status === "current" ? "scale(1.25)" : "scale(1.2)"};
      filter: ${({ $status }) =>
        $status === "completed"
          ? "brightness(60%) grayscale(25%)"
          : "brightness(120%)"};
    }
  }
  @media (prefers-reduced-motion: reduce) {
    > span {
      transition: none;
    }
  }
`;

export const IconStyled = styled.img<{ $danger?: DungeonRoomType["danger"] }>`
  position: relative;
  width: var(--room-icon-size);
  height: var(--room-icon-size);
  object-fit: contain;
  filter: ${({ $danger }) =>
    $danger
      ? `drop-shadow(0 0 7px ${DUNGEON_ROOM_GLOW_COLORS[$danger]})`
      : "none"};
`;

export const RoomIndexStyled = styled.span`
  position: relative;
  isolation: isolate;
  display: block;
  width: 32px;
  height: var(--room-index-height);
  margin: 0 auto;
  padding-top: var(--room-index-padding);
  box-sizing: border-box;
  color: wheat;
  font-size: var(--room-index-font-size);
  -webkit-text-stroke: 1px black;
  paint-order: stroke fill;
`;

export const CurrentRoomTriangleStyled = styled.svg`
  display: block;
  width: 18px;
  height: 16px;
  margin: -6px auto -10px;
`;
