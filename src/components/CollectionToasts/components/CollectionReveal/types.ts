import type {CollectionToastType} from "store/features/collection-toasts/types.ts";

export type CollectionRevealPropsType = {
    toast: CollectionToastType;
    isVisible: boolean;
    onClose: () => void;
};
