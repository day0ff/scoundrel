import {createServer} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const server = await createServer({
    configFile: false,
    plugins: [tsconfigPaths()],
    optimizeDeps: {noDiscovery: true, include: []},
    server: {middlewareMode: true, ws: false},
    appType: "custom",
});
try {
    const {runPageTransitionTests} = await server.ssrLoadModule("/src/components/React/PageTransitionRoutes/helpers.test.ts");
    for (const name of runPageTransitionTests()) process.stdout.write(`PASS ${name}\n`);
    const {runMediaVolumeFadeTests} = await server.ssrLoadModule("/src/utils/fadeMediaVolume.test.ts");
    for (const name of runMediaVolumeFadeTests()) process.stdout.write(`PASS ${name}\n`);
} finally {
    await server.close();
}
