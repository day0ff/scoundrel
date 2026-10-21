import { useEffect, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store/hooks.ts";
import Tooltip from "components/Tooltip";
import RoomTooltipContent from "./components/RoomTooltipContent";
import { dungeonRoomsSelector } from "./selectors.ts";
import type { DungeonRoomsPropsType } from "./types.ts";
import {
  DungeonRoomsStyled,
  RoomStyled,
  IconStyled,
  RoomIndexStyled,
  CurrentRoomTriangleStyled,
} from "./styles.ts";

const DungeonRooms: FC<DungeonRoomsPropsType> = ({
  appendTo = () => document.body,
}) => {
  const { t } = useTranslation();
  const rooms = useAppSelector(dungeonRoomsSelector);
  const listRef = useRef<HTMLOListElement>(null);
  const activeRoomRef = useRef<HTMLLIElement>(null);
  const [fades, setFades] = useState({left: false, right: false});
  const currentRoomIndex = rooms.findIndex((room) => room.status === "current");
  const upcomingRoomIndex = rooms.findIndex(
    (room) => room.status === "upcoming",
  );
  const activeRoomIndex =
    currentRoomIndex >= 0
      ? currentRoomIndex
      : upcomingRoomIndex >= 0
        ? upcomingRoomIndex
        : rooms.length - 1;

  useEffect(() => {
    const list = listRef.current;
    const activeRoom = activeRoomRef.current;
    if (!list || !activeRoom) return;
    const updateFades = () => {
      const left = list.scrollLeft > 1;
      const right = list.scrollWidth - list.clientWidth - list.scrollLeft > 1;
      setFades(previous => previous.left === left && previous.right === right
        ? previous
        : {left, right});
    };
    const scrollToActiveRoom = () => {
      const listBounds = list.getBoundingClientRect();
      const roomBounds = activeRoom.getBoundingClientRect();
      const targetLeft = list.scrollLeft + roomBounds.left - listBounds.left -
        list.clientLeft - (list.clientWidth - roomBounds.width) / 2;
      list.scrollTo({
        left: Math.max(0, Math.min(list.scrollWidth - list.clientWidth, targetLeft)),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      updateFades();
    };
    list.addEventListener("scroll", updateFades, {passive: true});
    scrollToActiveRoom();
    const observer = new ResizeObserver(scrollToActiveRoom);
    observer.observe(list);
    observer.observe(activeRoom);
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateFades);
    };
  }, [activeRoomIndex, rooms.length]);

  return (
    <DungeonRoomsStyled
      ref={listRef}
      $fadeLeft={fades.left}
      $fadeRight={fades.right}
      aria-label={t("ui.dungeonRooms.label")}
    >
      {rooms.map((room, index) => {
        const label = `${index + 1}. ${t(room.name)} · ${t(`ui.dungeonRooms.${room.status}`)} · ${t("ui.dungeonRooms.enemies")}: ${room.enemies}, ${t("ui.dungeonRooms.strength")}: ${room.strength}${room.danger ? ` · ${t(`ui.dungeonRooms.${room.danger}`)}` : ""}`;
        const dangerTranslationKey = room.danger
          ? (`ui.dungeonRooms.${room.danger}` as const)
          : undefined;
        return (
          <RoomStyled
            ref={index === activeRoomIndex ? activeRoomRef : undefined}
            key={index}
            $status={room.status}
            aria-current={room.status === "current" ? "step" : undefined}
            aria-label={label}
          >
            <Tooltip
              content={
                <RoomTooltipContent
                  kind={room.kind}
                  name={room.name}
                  description={room.description}
                  danger={room.danger}
                  dangerTranslationKey={dangerTranslationKey}
                />
              }
              trigger="mouseenter focus"
              appendTo={appendTo}
            >
              <div tabIndex={0} aria-label={label}>
                <IconStyled src={room.icon} alt="" $danger={room.danger} />
                {room.status === "current" && (
                  <CurrentRoomTriangleStyled
                    viewBox="0 0 32 30"
                    aria-hidden="true"
                  >
                    <polygon
                      points="16,2 30,28 2,28"
                      fill="darkorange"
                      stroke="black"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </CurrentRoomTriangleStyled>
                )}
                <RoomIndexStyled aria-hidden="true">
                  {index + 1}
                </RoomIndexStyled>
              </div>
            </Tooltip>
          </RoomStyled>
        );
      })}
    </DungeonRoomsStyled>
  );
};
export default DungeonRooms;
