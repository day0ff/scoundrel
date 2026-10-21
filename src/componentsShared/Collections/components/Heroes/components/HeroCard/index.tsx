import {FC, useMemo} from "react";
import {SOUND_PATHS} from "assets/sounds";
import {useHoverSound} from "hooks/useHoverSound.ts";
import {getBilletCard} from "entities/cards/helpers.ts";
import Tooltip from "components/Tooltip";
import HeroCardTooltipContent from "./components/HeroCardTooltipContent";
import {
    HeroCardStyled,
    HeroCardWrapperStyled,
    HeroDraggableCardStyled,
} from "./styles.ts";
import {HeroCardCardPropsType} from "./types.ts";

const HeroCard: FC<HeroCardCardPropsType> = (
    {
        isLocked,
        isNotFound,
        className,
        condition,
        name: nameProp,
        description: descriptionProp,
        card: cardProp,
        appendTo,
        ...restProps
    }
) => {
    const hoverSounds = useHoverSound(SOUND_PATHS.CardShove);
    const card = useMemo(() => {
        if (isLocked || isNotFound) return getBilletCard(cardProp);

        return cardProp;
    }, [isLocked, isNotFound, cardProp]);

    const name = isLocked ? "tag.collection.locked.name" : isNotFound ? "tag.collection.notFound.name" : nameProp;
    const description = isLocked ? condition?.description ?? "tag.collection.locked.description" : isNotFound ? "tag.collection.notFound.description" : descriptionProp;

    return (
        <HeroCardStyled {...hoverSounds} className={className}>
            <Tooltip maxWidth={"330px"} placement={"right"} appendTo={appendTo}
                     content={(<HeroCardTooltipContent name={name} description={description} color={card.color}/>)}>
                <HeroCardWrapperStyled>
                    <HeroDraggableCardStyled isLocked={isLocked} isNotFound={isNotFound} {...restProps} card={card}/>
                </HeroCardWrapperStyled>
            </Tooltip>
        </HeroCardStyled>
    );
}

export default HeroCard;
