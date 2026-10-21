import { useState, useEffect } from 'react'
import {useAppSelector} from "store/hooks.ts";
import {RootState} from "store/types.ts";

type Selector = (state: RootState) => boolean;

export const useIsFused = (selector: Selector): boolean => {
    const selected = useAppSelector(selector);
    const [fused, setFused] = useState(false);

    useEffect(() => {
        if (selected) {
            setFused(true);
        }
    }, [selected]);

    return fused;
};