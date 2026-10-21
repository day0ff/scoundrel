import type {Ref} from "react";

export type ToastHandleType = {
    enqueue: (message: string) => void;
};

export type ToastPropsType = {
    ref?: Ref<ToastHandleType>;
};

export type ToastMessageType = {
    id: number;
    message: string;
};
