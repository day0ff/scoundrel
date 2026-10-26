import {createServer} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const server = await createServer({
    configFile: false,
    plugins: [tsconfigPaths()],
    server: {middlewareMode: true, ws: false},
    appType: "custom",
});
try {
    const {runRecordsTests} = await server.ssrLoadModule("/src/store/features/records/records.test.ts");
    for (const name of runRecordsTests()) process.stdout.write(`PASS ${name}\n`);
} finally {
    await server.close();
}
