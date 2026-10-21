import {ReactNode} from "react";

export type DialogStateType = {
    isOpen: boolean;
    content?: ReactNode;
    onAccept?: (() => void) | null;
    onReject?: (() => void) | null;
};
