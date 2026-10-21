import {ModalStackControls} from "../ModalStack/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type DecksPropsType = ModalStackControls & Pick<TippyProps, "appendTo">;
