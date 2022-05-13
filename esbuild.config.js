#!/usr/bin/env node

import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";

build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.js",
    platform: "node",
    target: "node16",
    minify: true,
    plugins: [
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./src/templates/**/*"],
                to: ["./dist/templates"],
            },
            keepStructure: true,
        }),
    ],
});
