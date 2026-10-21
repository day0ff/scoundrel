import { useState, useCallback } from "react";

export const useAssignedNode = <T extends HTMLElement>() => {
    const [node, setNode] = useState<T | null>(null);

    const ref = useCallback((el: T | null) => {
        setNode(el);
    }, []);

    return [ref, node] as const;
}
