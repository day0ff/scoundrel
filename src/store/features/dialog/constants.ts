import {DialogStateType} from "./types.ts";

export const initialDialogState = ({
    isOpen: false,
    content: null,
    onAccept: null,
    onReject: null,
}) satisfies DialogStateType as DialogStateType;
