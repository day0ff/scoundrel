import {ReactElement, SyntheticEvent} from "react";
import {CornerSizeType} from "styles";
import {ModalPropsType} from "components/Modal/types.ts";

export type ModalStackControls = {
    onPush?: (newElement: ReactElement<ModalStackControls>) => void;
    onBack?: (event: SyntheticEvent) => void;
};

export type ModalStackItemProps = ReactElement<ModalStackControls>;

export type ModalStackPropsType = Omit<ModalPropsType, "children"> & {
    $color?: string;
    $size?: CornerSizeType
    initialNode: ReactElement<ModalStackControls>;
};