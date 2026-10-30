import { FC, memo, useEffect, useMemo, useRef } from "react";
import type { Instance } from "tippy.js";
import Tooltip from "components/Tooltip";
import PasteboardCardTooltipContent from "./components/PasteboardCardTooltipContent";
import {
  PasteboardCardStyled,
  PasteboardCardWrapperStyled,
  PasteboardDraggableCardStyled,
} from "./styles.ts";
import { PasteboardCardPropsType } from "./types.ts";
import PasteboardCardMark from "./components/PasteboardCardMark";
import { getBCard } from "./helpers.ts";
import {VIEWPORT_TOOLTIP_POPPER_OPTIONS} from "components/Tooltip/constants.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import CardStrength from "components/CardStrength";

const PasteboardCard: FC<PasteboardCardPropsType> = ({
  isLocked,
  isNotFound,
  className,
  condition,
  name: nameProp,
  description: descriptionProp,
  card: cardProp,
  appendTo,
  tooltipDisabled = false,
  strength,
  labels,
  ...restProps
}) => {
  const tooltipRef = useRef<Instance | null>(null);

  useEffect(() => {
    if (tooltipDisabled) {
      tooltipRef.current?.clearDelayTimeouts();
      tooltipRef.current?.hide();
    }
  }, [tooltipDisabled]);

  const card = useMemo(() => {
    if (isLocked || isNotFound) return getBCard(cardProp);

    return cardProp;
  }, [isLocked, isNotFound, cardProp]);

  const name = isLocked
    ? "tag.collection.locked.name"
    : isNotFound
      ? "tag.collection.notFound.name"
      : nameProp;
  const description = isLocked
    ? (condition?.description ?? "tag.collection.locked.description")
    : isNotFound
      ? "tag.collection.notFound.description"
      : descriptionProp;
  const { suit, rank, color } = cardProp;

  const mark = useMemo(
    () => <PasteboardCardMark suit={suit} rank={rank} color={color} />,
    [suit, rank, color],
  );

  return (
    <PasteboardCardStyled className={className}>
      <Tooltip
        disabled={tooltipDisabled}
        onCreate={instance => { tooltipRef.current = instance; }}
        minWidth={"500px"}
        maxWidth={"768px"}
        placement={"auto"}
        popperOptions={VIEWPORT_TOOLTIP_POPPER_OPTIONS}
        appendTo={appendTo}
        content={
          <PasteboardCardTooltipContent
            name={name}
            description={description}
            color={card.color}
            strength={getCardStrength({rank, strength})}
          />
        }
      >
        <PasteboardCardWrapperStyled>
          <PasteboardDraggableCardStyled
            $color={card.color}
            isLocked={isLocked}
            isNotFound={isNotFound}
            {...restProps}
            card={card}
            mark={mark}
            labels={<>
              {!isLocked && !isNotFound && <CardStrength rank={rank} strength={strength} appendTo={appendTo} disabled={tooltipDisabled}/>}
              {labels}
            </>}
          />
        </PasteboardCardWrapperStyled>
      </Tooltip>
    </PasteboardCardStyled>
  );
};

export default memo(PasteboardCard);
