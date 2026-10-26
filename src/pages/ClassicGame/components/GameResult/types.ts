import type {GameOutcomeType} from "entities/game/types.ts";

export type GameResultPropsType = {
    outcome: GameOutcomeType;
    isOpen: boolean;
    onClose: () => void;
};
