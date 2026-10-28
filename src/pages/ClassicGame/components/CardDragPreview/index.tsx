import {useMemo, type FC} from "react";
import {useDndContext} from "@dnd-kit/core";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import type {CardDragPreviewPropsType} from "./types.ts";
import {CardDragPreviewStyled} from "./styles.ts";
import {useAppSelector} from "store/hooks.ts";
import {gameSelector} from "store/features/game/selectors.ts";
import {canDropCardOnTarget, getCardMove} from "../../helpers.ts";
import {canMoveCard} from "store/features/game/helpers.ts";
import AttackTargetIcon from "../AttackTargetIcon";
import WeaponDurability from "../WeaponDurability";
import WeaponLastKill from "../WeaponLastKill";
import CardStrength from "components/CardStrength";

// A visual copy only: registering another sortable with this ID would disrupt the drag.
const CardDragPreview: FC<CardDragPreviewPropsType> = ({card, appendTo}) => {
    const {over, collisions} = useDndContext();
    const game = useAppSelector(gameSelector);
    const showWeaponStats = card.role === "weapon" &&
        !!game?.zones.weapons.cards.some(item => item.id === card.id);
    const lastKilledRank = card.killedEnemies?.at(-1)?.rank;
    const lastKilledStrength = card.killedEnemies?.at(-1)?.strength;
    const overId = collisions === null ? over?.id : collisions[0]?.id;
    const potionMove = card.role === "potion" && game && overId !== undefined
        ? getCardMove(game, card.id, String(overId))
        : undefined;
    const showPotionGlow = !!(game && potionMove && potionMove.from === "potions"
        && potionMove.to === "room" && canMoveCard(game, potionMove));
    const showTarget = useMemo(() => card.role === "enemy" && !!game && overId !== undefined &&
        game.zones.weapons.cards.some(item => item.id === String(overId)) &&
        canDropCardOnTarget(game, card.id, String(overId)), [card, game, overId]);

    // Pointer movement updates DnD context; rebuild artwork only when its appearance changes.
    return useMemo(() => (
        <CardDragPreviewStyled $role={card.role} $showPotionGlow={showPotionGlow} aria-hidden="true">
            <Card
                {...card.card}
                $size={6}
                mark={<PasteboardCardMark suit={card.suit} rank={card.rank} color={card.card.color}/>}
                labels={<>
                    <CardStrength rank={card.rank} strength={card.strength} disabled/>
                    {card.role === "enemy" ? (
                    <AttackTargetIcon visible={showTarget} appendTo={appendTo} hoverable={false}/>
                ) : showWeaponStats ? (
                    <>
                        {lastKilledRank !== undefined && <WeaponLastKill rank={lastKilledRank} strength={lastKilledStrength} appendTo={appendTo} disabled/>}
                        {card.durability !== undefined && <WeaponDurability durability={card.durability} appendTo={appendTo} disabled/>}
                    </>
                ) : undefined}
                </>}
            />
        </CardDragPreviewStyled>
    ), [card, showTarget, showPotionGlow, showWeaponStats, lastKilledRank, lastKilledStrength, appendTo]);
};

export default CardDragPreview;
