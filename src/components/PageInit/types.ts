import {ComponentType, ReactNode} from "react";
import {RootState} from "store/types.ts";
import {LoaderComponentPropsType} from "./components/RenderLoader/types.ts";

export type PageInitProps = {
    /** Selector that returns true when target slice finished initialization */
    isLoadedSelector: (state: RootState) => boolean;
    /** Action to dispatch with that source data */
    action: () => any;
    /** loader component */
    LoaderComponent?: ComponentType<LoaderComponentPropsType>
    /** Page content */
    children: ReactNode;
}

export type WithPageInitProps = Omit<PageInitProps, "children">