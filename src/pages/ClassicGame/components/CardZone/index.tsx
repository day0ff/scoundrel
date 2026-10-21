import { Fragment, useLayoutEffect, useMemo, type FC } from "react";
import {useAssignedNode} from "hooks";
import { useDroppable, useDndContext } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {CARD_STAGGER_MS} from "./constants.ts";
import GameCard from "./components/GameCard";
import EmptyCardSlot from "./components/EmptyCardSlot";
import type { CardZonePropsType } from "./types.ts";
import { useAppSelector } from "store/hooks.ts";
import { classicGameSelector } from "store/features/classic-game/selectors.ts";
import { canDropCardOnTarget, getCardMove } from "../../helpers.ts";
import { canMoveCard } from "store/features/classic-game/helpers.ts";
import { CARD_INTERACTION_COLORS } from "../../constants.ts";
import { resolveAttack } from "store/features/classic-game/attack.ts";
import {
  CardZoneStyled,
  CardZoneFrameStyled,
  CardZoneTitleStyled,
  CardsStyled,
  CardSlotStyled,
  EmptyCardStyled,
} from "./styles.ts";
import TitleFrame from "../TitleFrame";
import {weaponsWithAttackFeedbackSelector} from "./selectors.ts";

const CardZone: FC<CardZonePropsType> = ({
  zone: sourceZone,
  label,
  emptyLabel,
  framed = true,
  cardAnimation,
  previewEnemyId,
  appendTo,
  onAttack,
}) => {
  const { active, over, collisions } = useDndContext();
  const game = useAppSelector(classicGameSelector);
  const feedbackWeapons = useAppSelector(weaponsWithAttackFeedbackSelector);
  const zone = sourceZone.type === "weapons" ? feedbackWeapons ?? sourceZone : sourceZone;
  const [cardsRef, cardsNode] = useAssignedNode<HTMLDivElement>();

  useLayoutEffect(() => {
    if (!cardsNode) return;
    const slots = Array.from(cardsNode.children).filter((slot): slot is HTMLElement => slot instanceof HTMLElement);
    const updateOverlap = () => {
      if (!cardsNode.getClientRects().length) return;
      const gap = parseFloat(getComputedStyle(cardsNode).columnGap) || 0;
      const totalWidth = slots.reduce((width, slot) => width + slot.offsetWidth, 0);
      const overlap = slots.length > 1
        ? Math.max(0, (totalWidth + gap * (slots.length - 1) - cardsNode.clientWidth) / (slots.length - 1))
        : 0;
      cardsNode.style.setProperty("--card-overlap", `${overlap}px`);
    };
    updateOverlap();
    const observer = new ResizeObserver(updateOverlap);
    observer.observe(cardsNode);
    slots.forEach(slot => observer.observe(slot));
    return () => observer.disconnect();
  }, [cardsNode, zone.capacity, zone.cards]);
  // Before the first collision measurement, the dragged card is still in its source zone.
  const activeId = active?.id;
  const overId =
    collisions === null ? (over?.id ?? activeId) : collisions[0]?.id;
  const isCardOver =
    activeId !== undefined &&
    (overId === zone.type || zone.cards.some((card) => card.id === overId));
  const dragging = activeId !== undefined;
  const draggedCard =
    game &&
    Object.values(game.zones)
      .flatMap((source) => source.cards)
      .find((card) => card.id === activeId);
  const { setNodeRef } = useDroppable({
    id: zone.type,
    disabled:
      (zone.type === "weapons" && draggedCard?.role === "enemy") ||
      (zone.type === "room" &&
        (draggedCard?.role === "weapon" || draggedCard?.role === "fist") &&
        !!game?.zones.weapons.cards.some((card) => card.id === activeId)),
  });
  const emptyMove =
    game && draggedCard
      ? getCardMove(game, draggedCard.id, zone.type)
      : undefined;
  const canDropInEmptySlot = !!(
    game &&
    emptyMove &&
    canMoveCard(game, emptyMove)
  );
  const draggingFromEquipment =
    !!game &&
    [game.zones.weapons, game.zones.potions].some((source) =>
      source.cards.some((card) => card.id === activeId),
    );
  const validTargetId = useMemo(
    () =>
      game &&
      activeId !== undefined &&
      overId !== undefined &&
      zone.cards.some((card) => card.id === String(overId)) &&
      canDropCardOnTarget(game, String(activeId), String(overId))
        ? String(overId)
        : undefined,
    [game, activeId, overId, zone.cards],
  );
  const attackTargetId = useMemo(
    () =>
      dragging
        ? game &&
          validTargetId &&
          resolveAttack(game, String(activeId), validTargetId)?.enemy.id
        : previewEnemyId,
    [dragging, game, validTargetId, activeId, previewEnemyId],
  );
  const ZoneFrame = framed ? CardZoneFrameStyled : Fragment;
  return useMemo(
    () => (
      <CardZoneStyled ref={setNodeRef} aria-label={label} data-zone={zone.type}>
        <ZoneFrame
          {...(framed
            ? {
                variant: "outer" as const,
                tileVariant: "stone" as const,
                cornerRadius: 32,
                indent: 0,
                isOver: isCardOver,
              }
            : {})}
        >
          <CardZoneTitleStyled>
            <TitleFrame keepFrame={zone.type === "room"}>
              <h2>{label}</h2>
            </TitleFrame>
          </CardZoneTitleStyled>
          <SortableContext
            items={zone.cards.map((card) => card.id)}
            strategy={rectSortingStrategy}
          >
            <CardsStyled ref={cardsRef}>
              {Array.from({ length: zone.capacity }, (_, index) => {
                const card = zone.cards[index];
                const showPlaceholder = !card || activeId === card.id;
                return (
                  <CardSlotStyled key={card?.id ?? `empty-${index}`} data-card-animation={card ? cardAnimation : undefined} style={{animationDelay: `${index * CARD_STAGGER_MS}ms`}}>
                    {showPlaceholder &&
                    !card &&
                    (zone.type === "weapons" || zone.type === "potions") ? (
                      <EmptyCardSlot
                        zoneType={zone.type}
                        index={index}
                        label={emptyLabel}
                        canDrop={canDropInEmptySlot}
                        color={
                          CARD_INTERACTION_COLORS[
                            zone.type === "weapons" ? "weapon" : "potion"
                          ]
                        }
                      />
                    ) : (
                      showPlaceholder && (
                        <EmptyCardStyled role="img" aria-label={emptyLabel}>
                          {" "}
                        </EmptyCardStyled>
                      )
                    )}
                    {card && (
                      <GameCard
                        appendTo={appendTo}
                        onAttack={onAttack}
                        card={card}
                        zone={zone.type}
                        dragging={dragging}
                        isDropTarget={
                          card.id === validTargetId &&
                          (zone.type !== "room" || draggingFromEquipment)
                        }
                        isReplacementTarget={
                          card.id === validTargetId &&
                          draggedCard?.role === card.role &&
                          ((zone.type === "weapons" &&
                            card.role === "weapon") ||
                            (zone.type === "potions" && card.role === "potion"))
                        }
                        showTarget={
                          card.role === "enemy" && card.id === attackTargetId
                        }
                      />
                    )}
                  </CardSlotStyled>
                );
              })}
            </CardsStyled>
          </SortableContext>
        </ZoneFrame>
      </CardZoneStyled>
    ),
    [
      ZoneFrame,
      cardsRef,
      framed,
      cardAnimation,
      zone,
      label,
      emptyLabel,
      activeId,
      dragging,
      draggedCard,
      canDropInEmptySlot,
      draggingFromEquipment,
      isCardOver,
      validTargetId,
      attackTargetId,
      appendTo,
      setNodeRef,
      onAttack,
    ],
  );
};

export default CardZone;
