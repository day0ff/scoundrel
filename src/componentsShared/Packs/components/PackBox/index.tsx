import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { SOUND_PATHS } from "assets/sounds";
import { useHoverSound } from "hooks/useHoverSound.ts";
import { initPack } from "entities/packs/constants.ts";
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
} from "./styles.ts";

const PackBox: FC<PackBoxPropsType> = ({
  identifier,
  id,
  name,
  description,
  card,
  decks,
  styles,
  isLocked,
  isNotFound,
  isSelected,
  appendTo,
  onPush,
}) => {
  const { t } = useTranslation();
  const hoverSounds = useHoverSound(SOUND_PATHS.DeckShove);
  const color = card.color ?? "black";
  const handleOpen = () => {
    if (isLocked || isNotFound) return;
    const pack = initPack(identifier, decks);
    onPush?.(
      <Decks
        decks={pack.decks}
        name={name}
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
