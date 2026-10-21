import type {PropsWithChildren} from "react";
import type {Location} from "react-router";

export type PageTransitionRoutesPropsType = PropsWithChildren;

export type RouteTransitionStateType = {
    location: Location;
    destination: Location;
    phase: "idle" | "closing" | "covered" | "opening";
    coveredAt: number;
};

export type RouteTransitionActionType =
    | {type: "navigate"; location: Location}
    | {type: "covered"; time: number}
    | {type: "open"; locationKey: string}
    | {type: "opened"};
