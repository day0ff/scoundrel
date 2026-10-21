import {useEffect, useRef} from "react";

export const useRefForValueHook = <T,>(booleanHook: (...args: Array<any>) => T) => {
    const ref = useRef<T>(undefined);
    const isBoolean = booleanHook();

    useEffect(() => {
        ref.current = isBoolean;
    }, [isBoolean]);

    return ref;
}