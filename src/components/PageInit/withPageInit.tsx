import React from "react";
import PageInit from "./index.tsx";
import {WithPageInitProps} from "./types.ts";

/**
 * HOC that wraps a page component with <PageInit>
 */
export const withPageInit = (
    WrappedComponent: React.ComponentType,
    {isLoadedSelector, action}: WithPageInitProps
) => {
    const ComponentWithInit: React.FC = () => {
        return (
            <PageInit
                isLoadedSelector={isLoadedSelector}
                action={action}
            >
                <WrappedComponent/>
            </PageInit>
        )
    }

    ComponentWithInit.displayName = `WithPageInit(${WrappedComponent.displayName || WrappedComponent.name})`

    return ComponentWithInit
}
