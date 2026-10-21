import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";

export type HeaderMenuActionsPropsType = ModalStackControls & {
    onCloseMenu: () => void;
};
