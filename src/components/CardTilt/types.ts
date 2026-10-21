import {SpringValue, Interpolation} from "@react-spring/web";
import {ReactNode} from "react";

export type CardTiltProps = {
    children?: ReactNode;
    maxTilt?: number; // optional: maximum tilt angle in degrees
    wobbleIntensity?: number; // Max tilt in degrees for idle rocking
    wobbleSpeed?: number;     // Speed multiplier for idle rocking, radians per ms
}

export type CardTiltChildProps = {
    backgroundPosition: Interpolation<number, string>;
    opacity: SpringValue<number>;
}