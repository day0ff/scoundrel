import {useCallback, useState} from "react";
import {closestCorners, DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {DraggableCardType, DraggableCardsPropsType} from "./types.ts";

const getPosition = <T extends Record<string, unknown>>(items: Array<DraggableCardType<T>>, id: string) => items.findIndex((item) => item.id === id);

const DraggableCards = <T extends Record<string, unknown>>({canLoseFocus = true, appendTo, items, CardItem, onSelect}: DraggableCardsPropsType<T>) => {
    const [itemsState, setItemsState] = useState(items);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = useCallback((event: any) => {
        const {active, over} = event;

        if (active.id === over?.id) {
            setItemsState(prev =>
                prev.map(item => {
                    if (item.id === active.id) {
                        setTimeout(() => {
                            onSelect?.(!item.isSelected ? item : canLoseFocus ? undefined : item);
                        })
                    }
                    return ({
                        ...item,
                        isSelected: item.id === active.id ? canLoseFocus ? !item.isSelected : true : false,
                    })
                })
            );

            return;
        }

        setItemsState(prev => {
            const oldIndex = getPosition(prev, active.id);
            const newIndex = getPosition(prev, over.id);

            return arrayMove(prev, oldIndex, newIndex)
        });
    }, [canLoseFocus]);

    return (
        <DndContext collisionDetection={closestCorners} sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={itemsState} strategy={horizontalListSortingStrategy}>
                {itemsState.map((card) => (
                    <CardItem key={card.id} appendTo={appendTo} {...card} />
                ))}
            </SortableContext>
        </DndContext>
    );
}

export default DraggableCards;