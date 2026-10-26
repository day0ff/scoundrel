import { useState, type FC } from "react";
import Tooltip from "components/Tooltip";
import DeckTooltipContent from "./components/DeckTooltipContent";
import {
  DEFAULT_REPEAT_EVERY,
  LAYER_OFFSET,
  MAX_ROTATION,
} from "./constants.ts";
import {
  DeckStyled,
  DeckStackStyled,
  DeckImageStyled,
  DeckOverlayStyled,
  DeckCountStyled,
  DeckLayerStyled,
} from "./styles.ts";
import type { DeckPropsType } from "./types.ts";

const Deck: FC<DeckPropsType> = ({
  name,
  description,
  image,
  overlayColor = "saddlebrown",
  count,
  label,
  repeatEvery = DEFAULT_REPEAT_EVERY,
  direction = "left",
  onClick,
}) => {
  const [rotationSeed] = useState(() => Math.random());
  const empty = count <= 0;
  const layerCount =
    empty ||
    repeatEvery === false ||
    !Number.isFinite(repeatEvery) ||
    repeatEvery <= 0
      ? 1
      : Math.max(1, Math.ceil(count / repeatEvery));

  return (
    <Tooltip
      trigger="mouseenter focus"
      content={<DeckTooltipContent name={name} description={description} />}
      maxWidth="600px"
    >
      <DeckStyled
        aria-label={`${label}: ${count}`}
        tabIndex={0}
        role={onClick ? "button" : undefined}
        aria-haspopup={onClick ? "dialog" : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        } : undefined}
      >
        <DeckStackStyled data-deck-stack>
          {Array.from({ length: layerCount }, (_, index) => {
            // A seeded value keeps each layer's angle stable across renders.
            const random =
              Math.sin(rotationSeed * 10000 + index * 127.1) * 43758.5453;
            const rotation =
              empty || layerCount === 1
                ? 0
                : ((random - Math.floor(random)) * 2 - 1) * MAX_ROTATION;
            const directionMultiplier = direction === "right" ? 1 : -1;

            return (
              <DeckLayerStyled
                key={index}
                style={{
                  transform: `translate(${index * LAYER_OFFSET * directionMultiplier}px, ${(-index * LAYER_OFFSET * 2) / 3}px) rotate(${rotation * directionMultiplier}deg)`,
                }}
              >
                <DeckImageStyled src={image} $empty={empty} alt="" draggable={false}/>
                {empty && (
                  <DeckOverlayStyled
                    $color={overlayColor}
                    style={{ maskImage: `url(${JSON.stringify(image)})` }}
                    aria-hidden="true"
                  />
                )}
                {index === layerCount - 1 && <DeckCountStyled>{count}</DeckCountStyled>}
              </DeckLayerStyled>
            );
          })}
        </DeckStackStyled>
      </DeckStyled>
    </Tooltip>
  );
};

export default Deck;
