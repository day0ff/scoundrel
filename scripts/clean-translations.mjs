import {readdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDirectory = path.join(root, "src");
const localizationDirectory = path.join(sourceDirectory, "localization");
const translationsDirectory = path.join(localizationDirectory, "translations");
const args = process.argv.slice(2);
if (args.some(argument => argument !== "--dry-run")) {
    throw new Error("Usage: node scripts/clean-translations.mjs [--dry-run]");
}
const dryRun = args.includes("--dry-run");

async function readSourceFiles(directory) {
    const files = [];
    for (const entry of await readdir(directory, {withFileTypes: true})) {
        const filename = path.join(directory, entry.name);
        if (filename === localizationDirectory) continue;
        if (entry.isDirectory()) files.push(...await readSourceFiles(filename));
        else if (entry.isFile()) files.push({filename, text: await readFile(filename, "utf8")});
    }
    return files;
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Older code still contains template keys. Preserve every possible matching key.
function templatePatterns({filename, text}) {
    if (!/\.[cm]?[jt]sx?$/.test(filename)) return [];
    const patterns = [];
    const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
    function visit(node) {
        if (ts.isTemplateExpression(node)) {
            const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
            if (parts.some(part => part.includes("."))) {
                patterns.push(new RegExp(`^${parts.map(escapeRegex).join(".*")}$`, "s"));
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(source);
    return patterns;
}

const languageFiles = (await readdir(translationsDirectory)).filter(name => name.endsWith(".json")).sort();
// Parse all dictionaries before writing any files.
const dictionaries = await Promise.all(languageFiles.map(async name => {
    const text = await readFile(path.join(translationsDirectory, name), "utf8");
    const values = JSON.parse(text);
    if (!values || Array.isArray(values) || typeof values !== "object" ||
        Object.values(values).some(value => typeof value !== "string")) {
        throw new Error(`${name}: expected a flat dictionary of translation strings`);
    }
    return {name, text, values};
}));
const english = dictionaries.find(dictionary => dictionary.name === "en.json");
if (!english) throw new Error("Missing en.json translation dictionary");
const englishKeys = Object.keys(english.values);
const sourceFiles = await readSourceFiles(sourceDirectory);
const patterns = sourceFiles.flatMap(templatePatterns);
const used = new Set(englishKeys.filter(key =>
    sourceFiles.some(file => file.text.includes(key)) || patterns.some(pattern => pattern.test(key)),
));

// Follow nested i18next references in every language, including cycles and chains.
const pending = [...used];
for (let index = 0; index < pending.length; index++) {
    const key = pending[index];
    for (const {values} of dictionaries) {
        for (const match of (values[key] ?? "").matchAll(/\$t\(\s*([^,)]+)(?:,|\))/g)) {
            const dependency = match[1].trim();
            if (Object.hasOwn(english.values, dependency) && !used.has(dependency)) {
                used.add(dependency);
                pending.push(dependency);
            }
        }
    }
}

for (const {name, text, values} of dictionaries) {
    const removed = Object.keys(values).filter(key => !used.has(key));
    console.log(`${name}: ${dryRun ? "would remove" : "removing"} ${removed.length} keys`);
    if (dryRun) {
        for (const key of removed) console.log(`  ${key}`);
    } else if (removed.length) {
        const retained = Object.fromEntries(Object.entries(values).filter(([key]) => used.has(key)));
        const indentation = text.match(/\n([\t ]+)"/)?.[1] ?? "  ";
        const newline = text.includes("\r\n") ? "\r\n" : "\n";
        const output = JSON.stringify(retained, null, indentation).replaceAll("\n", newline);
        await writeFile(path.join(translationsDirectory, name), output + (text.endsWith("\n") ? newline : ""));
    }
}
