import assert from "node:assert/strict";
import { skeletonPack } from "entities/packs/skeleton.ts";
import { necromancerPack } from "entities/packs/necromancer.ts";
import collectionsReducer, { recordCollectionProgress, setCollections } from "./index.ts";
import { isConditionSatisfied } from "./helpers.ts";
import type { CollectionProgressType } from "./types.ts";

export const runConditionTests = () => {
    for (const pack of [skeletonPack, necromancerPack]) {
        const threshold = pack === skeletonPack ? 100 : 200;
        const progress: CollectionProgressType = {
            enemiesDefeated: { skeleton: threshold },
            gamesCompleted: {}, gamesWon: {}, processedEvents: {},
        };
        for (const condition of [pack.condition.unlock, pack.condition.discover]) {
            assert.equal(isConditionSatisfied(condition, progress, [{ ...skeletonPack, isLocked: false }]), false);
            progress.gamesWon = { "classic:day0ff:pack-classic": 1 };
            progress.enemiesDefeated.skeleton = threshold - 1;
            assert.equal(isConditionSatisfied(condition, progress, [{ ...skeletonPack, isLocked: false }]), false);
            progress.enemiesDefeated.skeleton = threshold;
            assert.equal(isConditionSatisfied(condition, progress, [{ ...skeletonPack, isLocked: false }]), true);
            progress.gamesWon = {};
        }
    }
    const progress: CollectionProgressType = {
        enemiesDefeated: { skeleton: 50, dark: 50 },
        gamesCompleted: {}, gamesWon: {}, processedEvents: {},
    };
    assert.equal(isConditionSatisfied({ type: "enemiesDefeated", count: 100 }, progress), true);
    assert.equal(isConditionSatisfied({ type: "enemiesDefeated", suit: "skeleton", count: 100 }, progress), false);
    const readyProgress: CollectionProgressType = {
        enemiesDefeated: { skeleton: 200 },
        gamesCompleted: {}, gamesWon: { "classic:day0ff:pack-classic": 1 }, processedEvents: {},
    };
    for (const condition of [necromancerPack.condition.unlock, necromancerPack.condition.discover]) {
        assert.equal(isConditionSatisfied(condition, readyProgress, [skeletonPack]), false);
        assert.equal(isConditionSatisfied(condition, readyProgress), false);
        assert.equal(isConditionSatisfied(condition, readyProgress, [{ ...skeletonPack, isLocked: false }]), true);
    }
    const state = collectionsReducer(undefined, setCollections({
        heroes: [], decks: [], packs: [necromancerPack, skeletonPack], progress: readyProgress,
    }));
    const evaluated = collectionsReducer(state, recordCollectionProgress([]));
    assert.equal(evaluated.packs.every(pack => !pack.isLocked && !pack.isNotFound), true);
    return ["pack unlock and discovery require both enemy defeats and a victory; single conditions remain supported"];
};
