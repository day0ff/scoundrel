import {useMemo, type FC} from "react";
import {useDndContext} from "@dnd-kit/core";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import type {CardDragPreviewPropsType} from "./types.ts";
import {CardDragPreviewStyled} from "./styles.ts";
import {useAppSelector} from "store/hooks.ts";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";
import {canDropCardOnTarget, getCardMove} from "../../helpers.ts";
import {canMoveCard} from "store/features/classic-game/helpers.ts";
import AttackTargetIcon from "../AttackTargetIcon";
import WeaponDurability from "../WeaponDurability";
import WeaponLastKill from "../WeaponLastKill";

// A visual copy only: registering another sortable with this ID would disrupt the drag.
const CardDragPreview: FC<CardDragPreviewPropsType> = ({card, appendTo}) => {
    const {over, collisions} = useDndContext();
    const game = useAppSelector(classicGameSelector);
    const showWeaponStats = card.role === "weapon" &&
        !!game?.zones.weapons.cards.some(item => item.id === card.id);
    const lastKilledRank = card.killedEnemies?.at(-1)?.rank;
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
                labels={card.role === "enemy" ? (
                    <AttackTargetIcon visible={showTarget} appendTo={appendTo} hoverable={false}/>
                ) : showWeaponStats ? (
                    <>
                        {lastKilledRank !== undefined && <WeaponLastKill rank={lastKilledRank} appendTo={appendTo} disabled/>}
                        {card.durability !== undefined && <WeaponDurability durability={card.durability} appendTo={appendTo} disabled/>}
                    </>
                ) : undefined}
            />
        </CardDragPreviewStyled>
    ), [card, showTarget, showPotionGlow, showWeaponStats, lastKilledRank, appendTo]);
};

export default CardDragPreview;
