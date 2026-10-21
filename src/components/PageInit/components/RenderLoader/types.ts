import {ComponentType, PropsWithChildren} from "react";

export type LoaderComponentPropsType = {
    isVisible: boolean;
}

export type RenderLoaderPropsType = PropsWithChildren<{
    isVisible?: boolean;
    LoaderComponent?: ComponentType<LoaderComponentPropsType>
}>