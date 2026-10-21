import type {FC} from "react";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import type {LanguageOptionPropsType} from "./types.ts";

const LanguageOption: FC<LanguageOptionPropsType> = ({code, name, selected, buttonRef, onSelect}) => {
    const sounds = useButtonSounds<HTMLButtonElement>();

    return (
        <button
            ref={buttonRef}
            type="button"
            role="option"
            aria-selected={selected}
            lang={code}
            tabIndex={-1}
            onMouseEnter={sounds.onMouseEnter}
            onMouseLeave={sounds.onMouseLeave}
            onFocus={sounds.onFocus}
            onClick={(event) => {
                sounds.onClick(event);
                onSelect();
            }}
        >
            {name}
        </button>
    );
};

export default LanguageOption;
