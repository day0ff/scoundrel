import type {FC} from "react";
import {SOUND_PATHS} from "assets/sounds";
import {useHoverSound} from "hooks/useHoverSound.ts";
import SharedPasteboardCard from "components/PasteboardCard";
import type {PasteboardCardPropsType} from "./types.ts";

const PasteboardCard: FC<PasteboardCardPropsType> = props => {
    const hoverSounds = useHoverSound(SOUND_PATHS.CardShove);

    return (
        <div {...hoverSounds}>
            <SharedPasteboardCard {...props}/>
        </div>
    );
};

export default PasteboardCard;
