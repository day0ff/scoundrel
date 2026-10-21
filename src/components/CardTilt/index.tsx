import React, {useRef, useState, useEffect} from "react";
import {useSpring} from "@react-spring/web";
import {CardTiltWrapper} from "./styles.ts";
import {CardTiltChildProps, CardTiltProps} from "./types.ts";

const CardTilt: React.FC<CardTiltProps> = (
    {
        children,
        maxTilt = 5,
        wobbleIntensity = 1,
        wobbleSpeed = 0.001
    }
) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const phaseOffset = useRef(Math.random() * Math.PI * 2).current;

    // Main spring for rotation, scale, and gloss position/opacity
    const [{rotationX, rotationY, scale, glossX, glossY, glossOpacity}, api] =
        useSpring(() => ({
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            glossX: 50,
            glossY: 50,
            glossOpacity: 0.4,
            config: {mass: 5, tension: 350, friction: 40}
        }));

    // Hover uses the pointer spring; disabled idle wobble needs no animation loop.
    useEffect(() => {
        if (hovered) return;
        if (wobbleIntensity === 0 || wobbleSpeed === 0) {
            api.start({rotationX: 0, rotationY: 0, scale: 1, glossX: 50, glossY: 50, glossOpacity: 0.4});
            return;
        }

        let frameId: number;
        let startTime: number | null = null;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;

            if (!hovered) {
                const angle = elapsed * wobbleSpeed + phaseOffset;
                const rx = Math.sin(angle) * wobbleIntensity;
                const ry = Math.cos(angle) * wobbleIntensity;

                api.start({
                    rotationX: rx,
                    rotationY: ry,
                    scale: 1,
                    glossX: 50 - ry * 5,
                    glossY: 50 + rx * 5,
                    glossOpacity: 0.4,
                    immediate: true
                });
            }

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [hovered, wobbleIntensity, wobbleSpeed, api, phaseOffset]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!hovered || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        // Calculate tilt intensity (0 to 1)
        const intensity = Math.sqrt(rotateX ** 2 + rotateY ** 2) / maxTilt;

        api.start({
            rotationX: -rotateX,
            rotationY: rotateY,
            scale: 1.05,
            glossX: 50 - rotateY * 3,
            glossY: 50 + rotateX * 3,
            glossOpacity: 0.4 + intensity * 0.3
        });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        api.start({scale: 1});
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    return (
        <CardTiltWrapper
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                transform: rotationX.to(
                    (rx) =>
                        `perspective(1000px) rotateX(${rx}deg) rotateY(${rotationY.get()}deg) scale(${scale.get()})`
                )
            }}
        >
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                    backgroundPosition: glossX.to((gx: number) => `${gx}% ${glossY.get()}%`),
                    opacity: glossOpacity,
                } as Partial<CardTiltChildProps>)
                : children}
        </CardTiltWrapper>
    );
};

export default CardTilt;