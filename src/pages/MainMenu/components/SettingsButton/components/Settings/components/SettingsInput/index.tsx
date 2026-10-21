import type {FC} from "react";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import type {SettingsInputPropsType} from "./types.ts";

const SettingsInput: FC<SettingsInputPropsType> = ({onChange, onMouseEnter, onMouseLeave, onFocus, ...props}) => {
    const sounds = useButtonSounds<HTMLInputElement>();

    return (
        <input
            {...props}
            onMouseEnter={(event) => {
                onMouseEnter?.(event);
                sounds.onMouseEnter(event);
            }}
            onMouseLeave={(event) => {
                onMouseLeave?.(event);
                sounds.onMouseLeave();
            }}
            onFocus={(event) => {
                onFocus?.(event);
                sounds.onFocus(event);
            }}
            onChange={(event) => {
                sounds.onChange(event);
                onChange?.(event);
            }}
        />
    );
};

export default SettingsInput;
