import type {PackDataType} from "entities/packs/types.ts";
import type {DraggableCardType} from "components/DraggableCards/types.ts";
import type {ModalStackControls} from "componentsShared/ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type PackBoxPropsType = DraggableCardType<PackDataType<string>> & ModalStackControls & Pick<TippyProps, "appendTo">;
