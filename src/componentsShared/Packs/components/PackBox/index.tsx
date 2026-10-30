import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { SOUND_PATHS } from "assets/sounds";
import { useHoverSound } from "hooks/useHoverSound.ts";
import { initPack } from "entities/packs/constants.ts";
import { getCollectionCard } from "entities/cards/helpers.ts";
import Decks from "componentsShared/Decks";
import CardTooltipContent from "components/CardTooltipContent";
import TooltipContent from "components/TooltipContent";
import { VIEWPORT_TOOLTIP_POPPER_OPTIONS } from "components/Tooltip/constants.ts";
import type { PackBoxPropsType } from "./types.ts";
import {
  PackBoxStyled,
  PackCardTooltipContentStyled,
  PackCardWrapperStyled,
  PackTooltipStyled,
  PackBoxDraggableDeckStyled,
  PackImageStyled,
} from "./styles.ts";

const PackBox: FC<PackBoxPropsType> = ({
  identifier,
  id,
  name: nameProp,
  description: descriptionProp,
  card: cardProp,
  overlayImage,
  decks,
  styles,
  isLocked,
  isNotFound,
  isSelected,
  condition,
  appendTo,
  onPush,
}) => {
  const { t } = useTranslation();
  const hoverSounds = useHoverSound(SOUND_PATHS.DeckShove);
  const card = useMemo(() => getCollectionCard(cardProp, {isLocked, isNotFound}), [isLocked, isNotFound, cardProp]);
  const name = isLocked ? "tag.collection.locked.name" : isNotFound ? "tag.collection.notFound.name" : nameProp;
  const description = isLocked ? condition?.description ?? "tag.collection.locked.pack.description" : isNotFound ? "tag.collection.notFound.pack.description" : descriptionProp;
  const color = cardProp.color ?? "black";
  const handleOpen = () => {
    if (isLocked || isNotFound) return;
    const pack = initPack(identifier, decks);
    onPush?.(
      <Decks
        decks={pack.decks}
        name={nameProp}
        color={color}
        appendTo={appendTo}
      />,
    );
  };
  const amount = Math.trunc(
    decks.reduce((acc, deck) => acc + (deck.cards?.length ?? 0), 0) * 3 / 5,
  );

  return (
    <PackBoxStyled
      {...hoverSounds}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (!event.repeat) handleOpen();
      }}
    >
      <PackCardWrapperStyled>
        <PackBoxDraggableDeckStyled
          id={id}
          identifier={identifier}
          card={card}
          isLocked={isLocked}
          isNotFound={isNotFound}
          isSelected={isSelected}
          $color={color}
          $textStroke={styles?.text?.stroke ?? "black"}
          amount={amount}
          labels={overlayImage && !isLocked && !isNotFound ? (
            <PackImageStyled src={overlayImage} alt="" aria-hidden="true" $color={color} />
          ) : undefined}
          tooltip={
            <PackTooltipStyled
              appendTo={appendTo ?? "parent"}
              delay={[500, 500]}
              minWidth="300px"
              placement="auto"
              popperOptions={VIEWPORT_TOOLTIP_POPPER_OPTIONS}
              content={
                <CardTooltipContent name={name}>
                  <TooltipContent translationKey={description} />
                </CardTooltipContent>
              }
            >
              <PackCardTooltipContentStyled aria-label={t(name)} />
            </PackTooltipStyled>
          }
        />
      </PackCardWrapperStyled>
    </PackBoxStyled>
  );
};

export default PackBox;
