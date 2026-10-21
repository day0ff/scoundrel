import {PropsWithChildren, Ref} from "react";

export type ModalPropsType = PropsWithChildren<{
    isOpen: boolean;
    isClosable?: boolean;
    showCloseButton?: boolean;
    animationDuration?: number;
    ref?: Ref<HTMLDialogElement>;
    onClose?: (event: Event) => void;
}>
