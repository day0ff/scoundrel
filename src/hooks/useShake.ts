import {useEffect, useRef} from "react";

export type UseShakeOptions = {
    threshold?: number;
    timeout?: number;
    onShake: () => void;
};

export const useShake = ({threshold = 15, timeout = 100, onShake}: UseShakeOptions) => {
    const lastShakeTimeRef = useRef(0);

    useEffect(() => {
        const handleMotion = (event: DeviceMotionEvent) => {

            if (!event.accelerationIncludingGravity) return;

            const {x = 0, y = 0, z = 0} = event.accelerationIncludingGravity;
            const xNumber = Number(x);
            const yNumber = Number(y);
            const zNumber = Number(z);

            const acceleration = Math.sqrt(xNumber * xNumber + yNumber * yNumber + zNumber * zNumber);

            const now = Date.now();

            if (acceleration > threshold && now - lastShakeTimeRef.current > timeout) {
                lastShakeTimeRef.current = now;
                onShake();
            }
        };

        window.addEventListener("devicemotion", handleMotion, true);

        return () => {
            window.removeEventListener("devicemotion", handleMotion, true);
        };
    }, [threshold, timeout, onShake]);
}
