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
    const {runPackTests} = await server.ssrLoadModule("/src/entities/packs/packs.test.ts");
    for (const name of runPackTests()) process.stdout.write(`PASS ${name}\n`);
    const {runGameMigrationTests} = await server.ssrLoadModule("/src/store/migrations.test.ts");
    for (const name of await runGameMigrationTests()) process.stdout.write(`PASS ${name}\n`);
    const {runGamePackTests} = await server.ssrLoadModule("/src/store/features/game/packs.test.ts");
    for (const name of await runGamePackTests()) process.stdout.write(`PASS ${name}\n`);
    const {runGameTests} = await server.ssrLoadModule("/src/store/features/game/lifecycle.test.ts");
    for (const name of runGameTests()) process.stdout.write(`PASS ${name}\n`);
} finally {
    await server.close();
}
