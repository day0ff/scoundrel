import {memo, useRef, type FC} from "react";
import {useTranslation} from "react-i18next";
import PasteboardCard from "components/PasteboardCard";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {selectCard, playCard, moveCard} from "store/features/classic-game";
import {isPlayerActionClassicGameSelector, selectedCardIdClassicGameSelector} from "store/features/classic-game/selectors.ts";
import {canPlayPotion} from "store/features/classic-game/helpers.ts";
import {canAttackCard} from "store/features/classic-game/attack.ts";
import AttackTargetIcon from "../../../AttackTargetIcon";
import WeaponDurability from "../../../WeaponDurability";
import WeaponLastKill from "../../../WeaponLastKill";
import type {GameCardPropsType} from "./types.ts";
import {GameCardStyled, StrikeStyled} from "./styles.ts";
import {pendingAttacksSelector} from "./selectors.ts";
import {activeEffectAnimationClassicGameSelector} from "store/features/classic-game/selectors.ts";
import {ANIMATIONS_MAP} from "entities/animations/constants.ts";
import {useTouchDoubleTap} from "hooks/useTouchDoubleTap.ts";

const GameCard: FC<GameCardPropsType> = ({card, zone, dragging, isDropTarget, isReplacementTarget, showTarget, appendTo, onAttack}) => {
    const dispatch = useAppDispatch();
    const selectedCardId = useAppSelector(selectedCardIdClassicGameSelector);
    const isPlayerAction = useAppSelector(isPlayerActionClassicGameSelector);
    const {t} = useTranslation();
    const lastKilledRank = card.killedEnemies?.at(-1)?.rank;
    const pendingAttacks = useAppSelector(pendingAttacksSelector);
    const activeEffect = useAppSelector(activeEffectAnimationClassicGameSelector);
    const defeated = zone === "room" && pendingAttacks.some(event => event.enemyId === card.id);
    const hit = defeated && activeEffect?.animation === "day0ff:animation-attack" && activeEffect.enemyId === card.id;
    const broken = zone === "weapons" && pendingAttacks.some(event => event.attackerId === card.id && event.weaponBroken);
    const handleQuickAction = () => {
        if (!isPlayerAction || dragging) return;
        if (canPlayPotion(card, zone)) dispatch(playCard({cardId: card.id, from: zone}));
        else if (zone === "room" && card.role === "weapon") {
            dispatch(moveCard({cardId: card.id, from: zone, to: "crypt"}));
        }
        else if (canAttackCard(card, zone)) onAttack(card.id);
    };
    const doubleTapHandlers = useTouchDoubleTap(handleQuickAction);
    const pointerType = useRef<string | null>(null);

    return (
        <GameCardStyled
            {...doubleTapHandlers}
            onPointerDownCapture={event => {
                pointerType.current = event.pointerType;
                doubleTapHandlers.onPointerDownCapture(event);
            }}
            inert={defeated || broken}
            data-hit={hit}
            $role={card.role}
            data-card-zone={zone}
            data-drag-active={dragging}
            data-drop-target={isDropTarget}
            data-replacement-target={isReplacementTarget}
            data-targeted={showTarget}
            data-attack-preview-id={zone === "weapons" && (card.role === "weapon" || card.role === "fist") ? card.id : undefined}
            aria-label={t(card.name)}
            onClick={() => { if (!dragging) dispatch(selectCard(card.id)); }}
            onDoubleClick={() => {
                // Touch double taps already invoke the action on pointer up.
                if (pointerType.current === "touch") return;
                handleQuickAction();
            }}
            onFocus={() => { if (!dragging) dispatch(selectCard(card.id)); }}
            onContextMenuCapture={event => {
                event.preventDefault();
                event.stopPropagation();
                if (pointerType.current === "touch") return;
                handleQuickAction();
            }}
        >
            <PasteboardCard
                {...card}
                appendTo={appendTo}
                tooltipDisabled={dragging}
                isSelected={selectedCardId === card.id}
                isLocked={false}
                isNotFound={false}
                isFlippable={!dragging}
                wobbleIntensity={dragging ? 0 : 1}
                labels={card.role === "enemy" ? (
                    <AttackTargetIcon visible={showTarget} appendTo={appendTo}/>
                ) : zone === "weapons" && card.role === "weapon" ? (
                    <>
                        {lastKilledRank !== undefined && <WeaponLastKill rank={lastKilledRank} appendTo={appendTo} disabled={dragging}/>}
                        {card.durability !== undefined && <WeaponDurability durability={card.durability} appendTo={appendTo} disabled={dragging}/>}
                    </>
                ) : undefined}
            />
            {hit && <StrikeStyled key={activeEffect.id} $duration={ANIMATIONS_MAP[activeEffect.animation].durationMs} aria-hidden="true" />}
        </GameCardStyled>
    );
};

export default memo(GameCard);
