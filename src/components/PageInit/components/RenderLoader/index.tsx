import {FC, useEffect, useState} from "react";
import DefaultLoader from "./components/DefaultLoader";
import {RenderLoaderPropsType} from "./types.ts";

const RenderLoader: FC<RenderLoaderPropsType> = ({isVisible = false, LoaderComponent = DefaultLoader, children}) => {
    const [isVisibleState, setIsVisibleState] = useState(true);

    useEffect(() => {
        // Wait until browser paints, then hide loader
        const raf = requestAnimationFrame(() => setIsVisibleState(false));

        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <>
            {children}
            <LoaderComponent isVisible={isVisible || isVisibleState}/>
        </>
    );
};

export default RenderLoader;
