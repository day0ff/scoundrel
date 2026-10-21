import {useRef, type PointerEvent} from "react";

const TAP_DURATION_MS = 300;
const DOUBLE_TAP_INTERVAL_MS = 350;
const TAP_MOVEMENT_PX = 8;
const DOUBLE_TAP_DISTANCE_PX = 24;

export const useTouchDoubleTap = (onDoubleTap: () => void) => {
    const touch = useRef<{id: number; x: number; y: number; time: number} | null>(null);
    const lastTap = useRef<{x: number; y: number; time: number} | null>(null);

    const reset = () => {
        touch.current = null;
        lastTap.current = null;
    };

    return {
        onPointerDownCapture: (event: PointerEvent<HTMLElement>) => {
            if (event.pointerType !== "touch") return;
            if (!event.isPrimary) {
                reset();
                return;
            }
            touch.current = {id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp};
        },
        onPointerMoveCapture: (event: PointerEvent<HTMLElement>) => {
            const start = touch.current;
            if (start?.id !== event.pointerId) return;
            if (Math.hypot(event.clientX - start.x, event.clientY - start.y) >= TAP_MOVEMENT_PX) reset();
        },
        onPointerUpCapture: (event: PointerEvent<HTMLElement>) => {
            const start = touch.current;
            if (start?.id !== event.pointerId) return;
            touch.current = null;
            if (event.timeStamp - start.time > TAP_DURATION_MS
                || Math.hypot(event.clientX - start.x, event.clientY - start.y) >= TAP_MOVEMENT_PX) {
                reset();
                return;
            }
            const previous = lastTap.current;
            if (previous && event.timeStamp - previous.time <= DOUBLE_TAP_INTERVAL_MS
                && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) <= DOUBLE_TAP_DISTANCE_PX) {
                reset();
                onDoubleTap();
            } else {
                lastTap.current = {x: event.clientX, y: event.clientY, time: event.timeStamp};
            }
        },
        onPointerCancelCapture: reset,
        // Touch pointers leave the element after every lift. Keep a completed
        // first tap so the next touch can complete the double tap.
        onPointerLeave: () => {
            if (touch.current) reset();
        },
    };
};
