import {activePackSelector} from "store/features/game/selectors.ts";
import { useCallback, useLayoutEffect, useRef, useState, type FC, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import { gameSelector } from "store/features/game/selectors.ts";
import {
  moveCard,
  playCard,
  attackCard,
  selectCard,
  surrenderGame,
  clearGame,
} from "store/features/game";
import {useGameTimer} from "hooks/useGameTimer.ts";
import Toast from "components/Toast";
import type { ToastHandleType } from "components/Toast/types.ts";
import {
  canPlayPotion,
  getCardMoveRejection,
} from "store/features/game/helpers.ts";
import { getAttackRejection, resolveAttack } from "store/features/game/attack.ts";
import DungeonRooms from "components/DungeonRooms";
import CardZone from "./components/CardZone";
import RoomZone from "./components/RoomZone";
import {currentRoomNumberSelector} from "./components/RoomZone/selectors.ts";
import DeckZone from "./components/DeckZone";
import CardDragPreview from "./components/CardDragPreview";
import HeroHealthBar from "./components/HeroHealthBar";
import HeroPortrait from "./components/HeroPortrait";
import TurnControls from "./components/TurnControls";
import HeaderBurgerMenu from "./components/HeaderBurgerMenu";
import GameResult from "./components/GameResult";
import EffectAnimations from "./components/EffectAnimations";
import { cardCollisionDetection, getCardMove } from "./helpers.ts";
import {
  ClassicGameStyled,
  GameHeaderStyled,
  HeaderRoomTitleStyled,
  HeaderMenuButtonStyled,
  HeroFrameStyled,
  HealthFrameStyled,
  HeroZonesStyled,
  GameTableStyled,
} from "./styles.ts";


const getPreviewAttackerId = (target: EventTarget | null) =>
  target instanceof Element
    ? target.closest("[data-attack-preview-id]")?.getAttribute("data-attack-preview-id") ?? null
    : null;

const ClassicGame: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const tabletLandscape = useMediaQuery({query: `${theme.media.tablet} and (orientation: landscape)`});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const game = useAppSelector(gameSelector);
  const pack = useAppSelector(activePackSelector);
  useGameTimer();
  const currentRoomNumber = useAppSelector(currentRoomNumberSelector);
  const gameRef = useRef<HTMLElement>(null);
  const appendTooltipTo = useCallback(() => gameRef.current ?? document.body, []);
  const [roomTransition, setRoomTransition] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [hoveredAttackerId, setHoveredAttackerId] = useState<string | null>(null);
  const [focusedAttackerId, setFocusedAttackerId] = useState<string | null>(null);
  const toastRef = useRef<ToastHandleType>(null);
  const [resultDismissed, setResultDismissed] = useState(false);
  const pendingExitRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => () => {
    // Clear the finished game after the route curtains cover the outgoing page.
    const completeExit = pendingExitRef.current;
    pendingExitRef.current = null;
    completeExit?.();
  }, []);

  const handleHome = () => {
    if (game?.outcome) pendingExitRef.current = () => dispatch(clearGame());
    navigate("/main-menu");
  };
  const handleSurrender = () => {
    setResultDismissed(false);
    if (!game?.outcome) dispatch(surrenderGame());
  };
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  if (!game) return <Navigate to="/main-menu" replace />;
  const activeCard = Object.values(game.zones)
    .flatMap((zone) => zone.cards)
    .find((card) => card.id === activeCardId);
  const dragging = activeCardId !== null;
  const previewAttackerId = hoveredAttackerId ?? focusedAttackerId;
  const previewEnemyId = !dragging && previewAttackerId
    ? resolveAttack(game, previewAttackerId)?.enemy.id
    : undefined;
  const waitingForPlayer =
    !game.outcome && game.currentPhase === game.phaseLifecycle.waitingPhase;
  const handleAttack = (cardId: string, enemyId?: string) => {
    const reason = getAttackRejection(game, cardId, enemyId);
    if (reason) {
      toastRef.current?.enqueue(t(`ui.${reason}.rejection`));
      return;
    }
    if (resolveAttack(game, cardId, enemyId)) dispatch(attackCard({cardId, enemyId}));
  };
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCardId(null);
    if (!over) return;
    const move = getCardMove(game, String(active.id), String(over.id));
    if (!move) return;
    const reason = getCardMoveRejection(game, move);
    if (reason) {
      toastRef.current?.enqueue(t(`ui.${reason}.rejection`));
      return;
    }
    dispatch(moveCard(move));
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      roomTransition ||
      !waitingForPlayer ||
      dragging ||
      event.repeat ||
      event.defaultPrevented ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.nativeEvent.isComposing
    )
      return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"])',
      )
    )
      return;
    if (event.key === "Escape") {
      dispatch(selectCard(null));
      return;
    }
    const key = event.key.toLowerCase();
    if (key === "a" || key === "s") {
      const attacker =
        key === "a"
          ? game.zones.weapons.cards.find(
              (card) =>
                card.identifier === "day0ff:pasteboard-fist.0" &&
                card.role === "fist",
            )
          : game.zones.weapons.cards.find(
              (card) =>
                card.id === game.selectedCardId && card.role === "weapon",
            );
      if (!attacker) return;
      event.preventDefault();
      handleAttack(attacker.id);
      return;
    }
    if (key === "r") {
      const card = game.zones.room.cards.find(
        (item) => item.id === game.selectedCardId,
      );
      if (!card || (card.role !== "weapon" && card.role !== "potion")) return;
      event.preventDefault();
      dispatch(moveCard({ cardId: card.id, from: "room", to: "crypt" }));
      return;
    }
    if (key !== "h" || !game.selectedCardId) return;
    const zone = Object.values(game.zones).find((item) =>
      item.cards.some((card) => card.id === game.selectedCardId),
    );
    const card = zone?.cards.find((item) => item.id === game.selectedCardId);
    if (!zone || !card || !canPlayPotion(card, zone.type)) return;
    event.preventDefault();
    dispatch(playCard({ cardId: card.id, from: zone.type }));
  };
  if (game.started === false && !game.outcome)
    return <Navigate to="/dungeon-preview" replace />;
  return (
    <ClassicGameStyled ref={gameRef} $url={pack.room} onKeyDown={handleKeyDown}>
      <EffectAnimations />
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={cardCollisionDetection}
        onDragStart={({ active }) => {
          setActiveCardId(String(active.id));
        }}
        onDragCancel={() => setActiveCardId(null)}
        onDragEnd={handleDragEnd}
      >
      <GameHeaderStyled>
        <HeaderBurgerMenu onHome={handleHome} onSurrender={handleSurrender} />
        <HeaderMenuButtonStyled onClick={handleHome} value="link.page.home" showBullet={false} />
        <HeaderMenuButtonStyled
          value="ui.game.surrender"
          showBullet={false}
          disabled={dragging}
          onClick={handleSurrender}
        />
        <HeaderRoomTitleStyled>{t("ui.zone.room")} {currentRoomNumber}</HeaderRoomTitleStyled>
      </GameHeaderStyled>
        <GameTableStyled
          inert={roomTransition}
          onMouseOver={event => { if (!dragging) setHoveredAttackerId(getPreviewAttackerId(event.target)); }}
          onMouseOut={event => { if (!dragging) setHoveredAttackerId(getPreviewAttackerId(event.relatedTarget)); }}
          onFocusCapture={event => setFocusedAttackerId(getPreviewAttackerId(event.target))}
          onBlurCapture={event => setFocusedAttackerId(getPreviewAttackerId(event.relatedTarget))}
        >
          <div data-dungeon-rooms>
            <DungeonRooms appendTo={appendTooltipTo} />
          </div>
          <DeckZone
            zone={game.zones.dungeon}
            label={t("ui.deck.dungeon.label")}
            name={t("ui.deck.dungeon.name")}
            description={t("ui.deck.dungeon.description")}
            image={pack.dungeon}
          />
          <RoomZone
            onTransitionChange={setRoomTransition}
            zone={game.zones.room}
            appendTo={appendTooltipTo}
            onAttack={handleAttack}
            previewEnemyId={previewEnemyId}
          />
          <div data-health-frame>
            {tabletLandscape ? <HeroHealthBar /> : (
              <HealthFrameStyled variant="inner" tileVariant="tile" cornerRadius={8}>
                <HeroHealthBar />
              </HealthFrameStyled>
            )}
          </div>
          <DeckZone
            zone={game.zones.discard}
            label={t("ui.deck.discard.label")}
            name={t("ui.deck.discard.name")}
            description={t("ui.deck.discard.description")}
            direction="right"
            image={pack.discard}
          />
          <div data-turn-controls>
            <TurnControls disabled={dragging} />
          </div>
          <DeckZone
            zone={game.zones.crypt}
            label={t("ui.deck.crypt.label")}
            name={t("ui.deck.crypt.name")}
            description={t("ui.deck.crypt.description")}
            direction="right"
            image={pack.crypt}
          />
          <div data-hero-frame>
            <HeroFrameStyled variant="inner" tileVariant="stone" cornerRadius={32}>
              <HeroZonesStyled>
                <CardZone
                  appendTo={appendTooltipTo}
                framed={false}
                  zone={game.zones.weapons}
                  onAttack={handleAttack}
                  label={t("ui.zone.weapons")}
                  emptyLabel={t("ui.zone.empty")}
                />
                <CardZone
                  appendTo={appendTooltipTo}
                framed={false}
                  zone={game.zones.potions}
                  onAttack={handleAttack}
                  label={t("ui.zone.potions")}
                  emptyLabel={t("ui.zone.empty")}
                />
              </HeroZonesStyled>
            </HeroFrameStyled>
          </div>
          <HeroPortrait />
        </GameTableStyled>
        {createPortal(
          <DragOverlay
            dropAnimation={null}
            zIndex={1000}
            style={{ pointerEvents: "none" }}
          >
            {activeCard && <CardDragPreview card={activeCard} appendTo={appendTooltipTo} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
      <Toast ref={toastRef} />
      {game.outcome && <GameResult outcome={game.outcome} isOpen={!resultDismissed} onClose={() => setResultDismissed(true)} />}
    </ClassicGameStyled>
  );
};

export default ClassicGame;
