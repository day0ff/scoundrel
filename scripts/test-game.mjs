import {createServer} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Load TypeScript and source-root imports without opening an HTTP or WebSocket server.
const server = await createServer({
    configFile: false,
    plugins: [tsconfigPaths()],
    server: {middlewareMode: true, ws: false},
    appType: "custom",
});
try {
    const {runPackTests: runSkeletonPackTests} = await server.ssrLoadModule("/src/entities/packs/packs.test.ts");
    for (const name of runSkeletonPackTests()) process.stdout.write(`PASS ${name}\n`);
    const {runCardActionTests} = await server.ssrLoadModule("/src/store/features/game/card-actions.test.ts");
    for (const name of runCardActionTests()) process.stdout.write(`PASS ${name}\n`);
    const {runNecromancerTests} = await server.ssrLoadModule("/src/store/features/game/necromancer.test.ts");
    for (const name of runNecromancerTests()) process.stdout.write(`PASS ${name}\n`);
    const {runFoolTests, runConsumeAnimationTests, runThingWeaponTests, runSummonTests} = await server.ssrLoadModule("/src/store/features/game/fools.test.ts");
    for (const name of runSummonTests()) process.stdout.write(`PASS ${name}\n`);
    for (const name of runThingWeaponTests()) process.stdout.write(`PASS ${name}\n`);
    for (const name of runConsumeAnimationTests()) process.stdout.write(`PASS ${name}\n`);
    for (const name of runFoolTests()) process.stdout.write(`PASS ${name}\n`);
    const {runCollectionToastTests} = await server.ssrLoadModule("/src/store/features/collection-toasts/collection-toasts.test.ts");
    for (const name of runCollectionToastTests()) process.stdout.write(`PASS ${name}\n`);
    const {runCollectionTests, runCollectionPersistenceTests} = await server.ssrLoadModule("/src/store/features/collections/collections.test.ts");
    for (const name of runCollectionTests()) process.stdout.write(`PASS ${name}\n`);
    for (const name of await runCollectionPersistenceTests()) process.stdout.write(`PASS ${name}\n`);
    const {runPackTests} = await server.ssrLoadModule("/src/entities/packs/packs.test.ts");
    for (const name of runPackTests()) process.stdout.write(`PASS ${name}\n`);
    const {runGamePackTests} = await server.ssrLoadModule("/src/store/features/game/packs.test.ts");
    for (const name of await runGamePackTests()) process.stdout.write(`PASS ${name}\n`);
    const {runGameTests} = await server.ssrLoadModule("/src/store/features/game/lifecycle.test.ts");
    for (const name of runGameTests()) process.stdout.write(`PASS ${name}\n`);
} finally {
    await server.close();
}
