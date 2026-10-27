import {classicPhaseLifecycle} from "./phases.ts";
import {classicPack} from "entities/packs/classic.ts";

export const classicMode = {
    identifier: "classic",
    phaseLifecycle: classicPhaseLifecycle,
    recordGameType: "classic",
    defaultPackIdentifier: classicPack.identifier,
} as const;
