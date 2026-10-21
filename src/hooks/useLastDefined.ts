import { useRef } from "react";

export const useLastDefined = <T>(value: T | undefined): T | undefined => {
    const ref = useRef<T | undefined>(value);

    if (value !== undefined) {
        ref.current = value;
    }

    return ref.current;
}
