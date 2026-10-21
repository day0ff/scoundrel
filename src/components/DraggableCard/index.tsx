import {FC, memo, useCallback, useMemo, useState, type MouseEvent, type KeyboardEvent} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useSpring} from "@react-spring/web";
import CardTilt from "components/CardTilt";
import Card from "components/Card";
import {DraggableCardWrapper, transitionStyle} from "./styles.ts";
import {DraggableCardPropsType} from "./types.ts";

const DraggableCard: FC<DraggableCardPropsType> = (
    {
        isNotFound,
        isLocked,
        isSelected,
        isSelectable = true,
        isFlipped = false,
        isFlippable = true,
        color,
        size,
        className,
        id,
        card,
        maxTilt,
        wobbleIntensity,
        wobbleSpeed,
        labels,
        button,
        tooltip,
        mark
    }
) => {
    const [flipped, setFlipped] = useState(isLocked || isFlipped);
    const {data, attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
    const cursor = data.sortable.index === -1 ? "pointer" : "grab";

    const {rotateY} = useSpring({
        rotateY: flipped ? 180 : 0,
        config: {tension: 200, friction: 25},
    });

    // Sortable position updates should not rebuild the animated card artwork.
    const content = useMemo(() => (
        <CardTilt maxTilt={maxTilt} wobbleIntensity={wobbleIntensity} wobbleSpeed={wobbleSpeed}>
            <Card color={color} $size={size} labels={labels} button={button} tooltip={tooltip} mark={mark} {...card}
                  rotateY={rotateY}/>
        </CardTilt>
    ), [maxTilt, wobbleIntensity, wobbleSpeed, color, size, labels, button, tooltip, mark, card, rotateY]);

    const flipCard = useCallback(() => {
        if (isNotFound || isLocked || !isFlippable) return;

        setFlipped((prev) => !prev);
    }, [isNotFound, isLocked, isFlippable]);

    const handleAuxClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (event.button !== 1) return;
        event.preventDefault();
        flipCard();
    }, [flipCard]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && event.key.toLowerCase() === "f"
            && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            if (!event.repeat) flipCard();
            return;
        }
        listeners?.onKeyDown?.(event);
    };

    return (
        <DraggableCardWrapper
            $isSelectable={isSelectable}
            $isSelected={isSelected}
            ref={setNodeRef}
            className={className}
            // @ts-ignore
            style={{cursor, transition: transition ? `${transition}, ${transitionStyle}` : transitionStyle, transform: CSS.Transform.toString(transform)}}
            {...attributes}
            {...listeners}
            data-selected={isSelected}
            data-dragging={isDragging}
            data-card-id={id}
            onMouseDown={event => {
                if (event.button === 1) event.preventDefault();
            }}
            onAuxClick={handleAuxClick}
            onKeyDown={handleKeyDown}
        >
            {content}
        </DraggableCardWrapper>
    );
}

export default memo(DraggableCard);