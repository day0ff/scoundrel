import {FC, memo, useCallback, useState, type MouseEvent, type KeyboardEvent, useMemo} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useSpring} from "@react-spring/web";
import CardTilt from "components/CardTilt";
import Card from "components/Card";
import {DraggableCardWrapper, transitionStyle} from "./styles.ts";
import {DraggableDeckPropsType} from "./types.ts";
import LightweightCard from "./components/LightweightCard";

const DraggableDeck: FC<DraggableDeckPropsType> = (
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
        amount = 3,
    }
) => {
    const [flipped, setFlipped] = useState(isLocked || isFlipped);
    const {data, attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
    const cursor = data.sortable.index === -1 ? "pointer" : "grab";

    const {rotateY} = useSpring({
        rotateY: flipped ? 180 : 0,
        config: {tension: 200, friction: 25},
    });

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

    const cards = useMemo(()=>
            Array.from({length: amount},
                (_, index) => amount > 1 && (amount - index - 1) % 5 === 0 ? (
                    <LightweightCard key={index} index={(amount - index - 1) / 5 + 1} color={color} $size={size}
                                     {...card} rotateY={rotateY}/>
                ) : null
            )
        , [amount]);

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
            onMouseDown={event => {
                if (event.button === 1) event.preventDefault();
            }}
            onAuxClick={handleAuxClick}
            onKeyDown={handleKeyDown}
        >
            <CardTilt maxTilt={maxTilt} wobbleIntensity={wobbleIntensity} wobbleSpeed={wobbleSpeed}>
                {cards}
                <Card color={color} $size={size} labels={labels} button={button} tooltip={tooltip} {...card}
                      rotateY={rotateY}/>
            </CardTilt>
        </DraggableCardWrapper>
    );
}

export default memo(DraggableDeck);