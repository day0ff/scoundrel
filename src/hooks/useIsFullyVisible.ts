import {useEffect, useState, RefObject} from "react";

export const useIsFullyVisible =(
    ref?: RefObject<HTMLElement>,
    options?: IntersectionObserverInit
) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref?.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.intersectionRatio >= 0.6);
            },
            {
                root: element.parentElement,
                threshold: 0.6,
                ...options,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, options]);

    return isVisible;
}
