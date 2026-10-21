import { useState, type FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import Deck from "components/Deck";
import TitleFrame from "../TitleFrame";
import ModalStack from "componentsShared/ModalStack";
import ZoneCards from "./components/ZoneCards";
import { BASE_URL } from "constants.ts";
import { DeckZoneStyled } from "./styles.ts";
import type { DeckZonePropsType } from "./types.ts";

const DeckZone: FC<DeckZonePropsType> = ({
  zone,
  label,
  name,
  description,
  children,
  repeatEvery,
  direction,
  image = `${BASE_URL}/images/cards/backs/graveyard.png`,
  overlayColor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: zone.type,
    disabled: zone.type !== "crypt",
  });
  return (
    <DeckZoneStyled
      ref={setNodeRef}
      $over={zone.type === "crypt" && isOver}
      aria-label={label}
      data-zone={zone.type}
    >
      <TitleFrame>
        <h2>{label}</h2>
      </TitleFrame>
      <Deck
        name={name}
        description={description}
        image={image}
        overlayColor={overlayColor}
        count={zone.cards.length}
        label={label}
        repeatEvery={repeatEvery}
        direction={direction}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <ModalStack
          isOpen={isModalOpen}
          initialNode={<ZoneCards zoneType={zone.type} label={label} />}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {children}
    </DeckZoneStyled>
  );
};

export default DeckZone;
