import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type PacksPropsType = ModalStackControls & Pick<TippyProps, "appendTo">;
