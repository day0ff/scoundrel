import type {Ref} from "react";

export type LanguageOptionPropsType = {
    code: string;
    name: string;
    selected: boolean;
    buttonRef: Ref<HTMLButtonElement>;
    onSelect: () => void;
};
