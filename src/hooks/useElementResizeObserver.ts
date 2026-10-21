import {useState, useEffect, useRef, RefObject} from 'react';
import {BoundingRectType, getSerializedBoundingRect} from "../helpers";

export const useElementResizeObserver = <T extends HTMLElement>(): [RefObject<T | null>, BoundingRectType] => {
    // Create a ref to attach to the element you want to observe
    const elementRef = useRef<T>(null);

    // State to store the element's bounding client rect
    const [rect, setRect] = useState(() => {
        const bounding = getSerializedBoundingRect(elementRef.current);

        return bounding as BoundingRectType;
    });

    useEffect(() => {
        if (!elementRef.current) return;

        // Function to update the state with the latest bounding rect
        const updateRect = () => {
            if (!elementRef.current) return;

            const bounding = getSerializedBoundingRect(elementRef.current);

            setRect(bounding);
        };

        // Set the initial rect value
        updateRect();

        // Create a ResizeObserver to watch the element for size changes
        const resizeObserver = new ResizeObserver(() => {
            updateRect();
        });
        resizeObserver.observe(elementRef.current);

        // Also listen for window resize events
        window.addEventListener('resize', updateRect);

        // Cleanup: disconnect the observer and remove event listener on unmount
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateRect);
        };
    }, []);

    return [elementRef, rect];
}
