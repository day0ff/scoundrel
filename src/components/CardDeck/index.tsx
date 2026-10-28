import type {FC} from "react";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import CardStrength from "components/CardStrength";
import {CardDeckStyled, DeckStackStyled} from "./styles.ts";
import type {CardDeckPropsType} from "./types.ts";

const CardDeck: FC<CardDeckPropsType> = ({card, count, faceDown = false, label}) => (
    <CardDeckStyled aria-label={`${label}: ${count}`}>
        <DeckStackStyled $empty={!card}>
            {card && <Card
                {...card.card}
                face={faceDown ? card.card.back : card.card.face}
                $size={6}
                mark={faceDown ? <span/> : <PasteboardCardMark suit={card.suit} rank={card.rank} color={card.card.color}/>}
                labels={faceDown ? undefined : <CardStrength rank={card.rank} strength={card.strength}/>}
            />}
        </DeckStackStyled>
        <span>{count}</span>
    </CardDeckStyled>
);

export default CardDeck;
