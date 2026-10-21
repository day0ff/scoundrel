import {FC, useEffect} from "react";
import {useAppDispatch} from "store/hooks.ts";
import {useIsFused} from "hooks";
import {PageInitProps} from "./types.ts";
import RenderLoader from "./components/RenderLoader";

/**
 * Generic initializer wrapper for pages.
 * - Reads data via `selector`
 * - Dispatches `action` once when data available
 * - Shows loader until `isLoadedSelector` === true
 */
const PageInit: FC<PageInitProps> = (
    {
        isLoadedSelector,
        action,
        LoaderComponent,
        children,
    }
) => {
    const isFused = useIsFused(isLoadedSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isFused) {
            dispatch(action())
        }
    }, [dispatch, isFused, action]);


    return <RenderLoader isVisible={!isFused} LoaderComponent={LoaderComponent}>{children}</RenderLoader>
}

export default PageInit;