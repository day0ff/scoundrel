import { useCallback, useRef } from 'react';

/**
 * A hook that returns a throttled version of the provided callback.
 * The throttled function only allows execution at most once every `delay` milliseconds.
 *
 * @param callback - The function to be throttled.
 * @param delay - The delay in milliseconds between allowed calls.
 * @returns A throttled version of the callback.
 */
export const useThrottle = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
    const lastCall = useRef(0);

    const throttledFn = useCallback((...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall.current >= delay) {
            lastCall.current = now;
            callback(...args);
        }
    }, [callback, delay]);

    return throttledFn as T;
}
