import {ValueOf} from "helpers";
import {TippyProps} from "components/Tooltip/types.ts";
import {ROOT_TAG_COMPONENTS_MAP} from "./constants.tsx";

export type RootTagComponentType = keyof typeof ROOT_TAG_COMPONENTS_MAP;
export type RootTagComponentsType = ValueOf<typeof ROOT_TAG_COMPONENTS_MAP> | undefined;

export type RootTagPropsType = Pick<TippyProps, "appendTo"> & {
    children?: string
};