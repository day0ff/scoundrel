import {useState, type FC} from "react";
import {useSpring} from "@react-spring/web";
import {useTranslation} from "react-i18next";
import Card from "components/Card";
import CardTilt from "components/CardTilt";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import {ZoneCardStyled} from "./styles.ts";
import type {ZoneCardPropsType} from "./types.ts";

const ZoneCard: FC<ZoneCardPropsType> = ({card, suit, rank, name, isSelected, onSelect}) => {
    const {t} = useTranslation();
    const [flipped, setFlipped] = useState(false);
    const {rotateY} = useSpring({
        rotateY: flipped ? 180 : 0,
        config: {tension: 200, friction: 25},
    });

    return (
        <ZoneCardStyled
            $isSelectable={true}
            $isSelected={isSelected}
            role="button"
            aria-label={t(name)}
            aria-pressed={isSelected}
            onFocus={onSelect}
            onClick={onSelect}
            onMouseDown={event => {
                if (event.button !== 1) return;
                event.preventDefault();
                event.currentTarget.focus();
            }}
            onAuxClick={event => {
                if (event.button !== 1) return;
                event.preventDefault();
                setFlipped(previous => !previous);
            }}
            onKeyDown={event => {
                if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey
                    || event.altKey || event.nativeEvent.isComposing) return;
                if (event.key.toLowerCase() === "f") {
                    event.preventDefault();
                    if (!event.repeat) setFlipped(previous => !previous);
                } else if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect();
                }
            }}
        >
            <CardTilt wobbleIntensity={3} wobbleSpeed={0.001}>
                <Card {...card} $size={6} rotateY={rotateY}
                      mark={<PasteboardCardMark suit={suit} rank={rank} color={card.color}/>}/>
            </CardTilt>
        </ZoneCardStyled>
    );
};

export default ZoneCard;
