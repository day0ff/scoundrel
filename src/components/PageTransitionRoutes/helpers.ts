import type {Location} from "react-router";
import type {RouteTransitionActionType, RouteTransitionStateType} from "./types.ts";

export const createRouteTransitionState = (location: Location): RouteTransitionStateType => ({
    location,
    destination: location,
    phase: "idle",
    coveredAt: 0,
});

export const routeTransitionReducer = (
    state: RouteTransitionStateType,
    action: RouteTransitionActionType,
): RouteTransitionStateType => {
    switch (action.type) {
        case "navigate": {
            const destination = action.location;
            if (state.phase === "covered") return {...state, location: destination, destination};
            if (state.phase === "closing") return {...state, destination};
            if (destination.pathname === state.location.pathname) {
                return {...state, location: destination, destination};
            }
            return {...state, destination, phase: "closing"};
        }
        case "covered":
            return state.phase === "closing"
                ? {...state, location: state.destination, phase: "covered", coveredAt: action.time}
                : state;
        case "open":
            return state.phase === "covered" && state.location.key === action.locationKey
                ? {...state, phase: "opening"}
                : state;
        case "opened":
            return state.phase === "opening" ? {...state, phase: "idle"} : state;
    }
};
