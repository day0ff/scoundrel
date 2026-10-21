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
    const {runClassicGameTests} = await server.ssrLoadModule("/src/store/features/classic-game/lifecycle.test.ts");
    for (const name of runClassicGameTests()) process.stdout.write(`PASS ${name}\n`);
} finally {
    await server.close();
}
