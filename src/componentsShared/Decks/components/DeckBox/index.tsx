import {FC, useMemo} from "react";
import {SOUND_PATHS} from "assets/sounds";
import {useHoverSound} from "hooks/useHoverSound.ts";
import {billetDeckCard} from "entities/cards/decks/billet.ts";
import DeckBoxTooltipContent from "./components/DeckBoxTooltipContent";
import Pasteboards from "./components/Pasteboards";
import {
    DeckBoxStyled,
    RoomCardTooltipContentStyled,
    RoomCardWrapperStyled,
    RoomTooltipStyled,
    DeckBoxDraggableDeckStyled
} from "./styles.ts";
import {DeckBoxPropsType} from "./types.ts";
import {VIEWPORT_TOOLTIP_POPPER_OPTIONS} from "components/Tooltip/constants.ts";

const DeckBox: FC<DeckBoxPropsType> = (
    {
        isLocked,
        isNotFound,
        className,
        placement = "auto",
        trigger,
        condition,
        name: nameProp,
        description: descriptionProp,
        card: cardProp,
        pasteboards,
        appendTo,
        onPush,
        ...restProps
    }
) => {
    const hoverSounds = useHoverSound(SOUND_PATHS.DeckShove);
    const card = useMemo(() => {
        if (isLocked || isNotFound) {
            return {
                ...cardProp,
                face: {
                    ...cardProp.face,
                    image: cardProp.back.image,
                    imageMode: billetDeckCard.face.imageMode,
                    overlay: billetDeckCard.face.overlay,
                    overlayMode: billetDeckCard.face.overlayMode,
                },
                back: {
                    ...cardProp.back,
                    imageMode: billetDeckCard.back.imageMode,
                    overlay: billetDeckCard.back.overlay,
                    overlayMode: billetDeckCard.back.overlayMode,
                }
            }
        }

        return cardProp;
    }, [isLocked, isNotFound, cardProp]);

    const name = isLocked ? "tag.collection.locked.name" : isNotFound ? "tag.collection.notFound.name" : nameProp;
    const description = isLocked ? condition?.description ?? "tag.collection.locked.deck.description" : isNotFound ? "tag.collection.notFound.deck.description" : descriptionProp;
    const color = cardProp?.color ?? 'black';

    const tooltip = useMemo(() => (
        <RoomTooltipStyled
            appendTo={appendTo ?? 'parent'}
            delay={[500, 500]}
            minWidth={"300px"}
            placement={placement}
            popperOptions={VIEWPORT_TOOLTIP_POPPER_OPTIONS}
            trigger={trigger}
            content={(
                <DeckBoxTooltipContent name={name} description={description} color={color}/>
            )}
        >
            <RoomCardTooltipContentStyled/>
        </RoomTooltipStyled>
    ), [appendTo, placement, trigger, name, description, color]);

    return (
        <DeckBoxStyled {...hoverSounds} className={className} onClick={() => onPush?.(<Pasteboards pasteboards={pasteboards} appendTo={appendTo}/>)}>
            <RoomCardWrapperStyled>
                <DeckBoxDraggableDeckStyled
                    isLocked={isLocked}
                    isNotFound={isNotFound}
                    $color={color}
                    {...restProps}
                    card={card}
                    tooltip={tooltip}
                    amount={pasteboards?.length}
                />
            </RoomCardWrapperStyled>
        </DeckBoxStyled>
    );
}

export default DeckBox;
