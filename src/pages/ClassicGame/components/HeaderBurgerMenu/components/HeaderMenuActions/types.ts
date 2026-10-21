import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";
import type {HeaderBurgerMenuPropsType} from "../../types.ts";

export type HeaderMenuActionsPropsType = ModalStackControls & HeaderBurgerMenuPropsType & {
    onCloseMenu: () => void;
};
