import assert from "node:assert/strict";
import type {Location} from "react-router";
import {createRouteTransitionState, routeTransitionReducer} from "./helpers.ts";

const location = (pathname: string, key = pathname): Location => ({
    pathname, key, search: "", hash: "", state: null,
});

export const runPageTransitionTests = () => {
    const passed: string[] = [];
    const check = (name: string, run: () => void) => {
        run();
        passed.push(name);
    };

    check("destination is rendered only after the curtains cover the outgoing page", () => {
        const home = location("/");
        const menu = location("/main-menu");
        const closing = routeTransitionReducer(createRouteTransitionState(home), {type: "navigate", location: menu});
        assert.equal(closing.location, home);
        assert.equal(closing.phase, "closing");
        const covered = routeTransitionReducer(closing, {type: "covered", time: 450});
        assert.equal(covered.location, menu);
        assert.equal(covered.coveredAt, 450);
        assert.equal(covered.phase, "covered");
        const opening = routeTransitionReducer(covered, {type: "open", locationKey: menu.key});
        assert.equal(opening.phase, "opening");
        assert.equal(routeTransitionReducer(opening, {type: "opened"}).phase, "idle");
    });

    check("every page destination, including unknown pages, starts a transition", () => {
        const paths = ["/", "/main-menu", "/dungeon-preview", "/classic-game", "/unknown-page"];
        for (const from of paths) for (const to of paths) {
            if (from === to) continue;
            const state = routeTransitionReducer(createRouteTransitionState(location(from)), {
                type: "navigate", location: location(to),
            });
            assert.equal(state.phase, "closing", `${from} -> ${to}`);
            assert.equal(state.location.pathname, from);
        }
    });

    check("rapid navigation and Back/Forward use the latest destination while closing", () => {
        const initial = createRouteTransitionState(location("/main-menu"));
        let state = routeTransitionReducer(initial, {type: "navigate", location: location("/dungeon-preview")});
        state = routeTransitionReducer(state, {type: "navigate", location: location("/classic-game")});
        state = routeTransitionReducer(state, {type: "navigate", location: location("/main-menu", "back")});
        assert.equal(state.location, initial.location);
        state = routeTransitionReducer(state, {type: "covered", time: 450});
        assert.equal(state.location.key, "back");
        assert.equal(state.phase, "covered");
    });

    check("redirects render behind closed curtains and invalidate stale opening callbacks", () => {
        let state = routeTransitionReducer(createRouteTransitionState(location("/")), {
            type: "navigate", location: location("/classic-game"),
        });
        state = routeTransitionReducer(state, {type: "covered", time: 450});
        state = routeTransitionReducer(state, {type: "navigate", location: location("/main-menu")});
        assert.equal(state.phase, "covered");
        assert.equal(state.location.pathname, "/main-menu");
        assert.equal(state.coveredAt, 450);
        assert.equal(routeTransitionReducer(state, {type: "open", locationKey: "/classic-game"}), state);
    });

    check("navigation during opening closes again without exposing the next destination", () => {
        let state = routeTransitionReducer(createRouteTransitionState(location("/")), {
            type: "navigate", location: location("/main-menu"),
        });
        state = routeTransitionReducer(state, {type: "covered", time: 450});
        state = routeTransitionReducer(state, {type: "open", locationKey: "/main-menu"});
        state = routeTransitionReducer(state, {type: "navigate", location: location("/dungeon-preview")});
        assert.equal(state.phase, "closing");
        assert.equal(state.location.pathname, "/main-menu");
        assert.equal(routeTransitionReducer(state, {type: "opened"}), state);
        assert.equal(routeTransitionReducer(state, {type: "covered", time: 1000}).location.pathname, "/dungeon-preview");
    });

    check("same-page search, hash, and state changes update without restarting curtains", () => {
        const initial = createRouteTransitionState(location("/main-menu"));
        const updated = {...initial.location, key: "new-key", search: "?view=cards", hash: "#menu", state: {from: "home"}};
        const state = routeTransitionReducer(initial, {type: "navigate", location: updated});
        assert.equal(state.phase, "idle");
        assert.equal(state.location, updated);
    });

    return passed;
};
