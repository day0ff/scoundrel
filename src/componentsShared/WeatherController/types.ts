import {PropsWithChildren, Ref} from "react";
import {StatType} from "entities/types.ts";
import {WEATHER_MAP} from "./constants.ts";

export type WeatherType = keyof typeof WEATHER_MAP;

export type WeatherControllerPropsType = PropsWithChildren<StatType & {
    ref: Ref<HTMLDivElement>;
    src: string;
    weather?: WeatherType;
}>;