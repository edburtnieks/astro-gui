import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import type { AstroIntegration, AstroConfig } from "astro";
import { PAGES_DIRECTORY, LAYOUTS_DIRECTORY, NAME } from "./constants";

export default function createPlugin(): AstroIntegration {
    return {
        name: NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                const pagesDir = PAGES_DIRECTORY(config.srcDir.pathname);
                const layoutsDir = LAYOUTS_DIRECTORY(config.srcDir.pathname);

                // Create necessary directories
                if (!existsSync(pagesDir)) {
                    mkdirSync(pagesDir, { recursive: true });
                }

                if (!existsSync(layoutsDir)) {
                    mkdirSync(layoutsDir, { recursive: true });
                }

                // Layouts
                if (!existsSync(`${layoutsDir}/BaseLayout.astro`)) {
                    let parsedBaseLayout: string;
                    parsedBaseLayout = readFileSync(
                        `${config.root.pathname}/node_modules/${NAME}/dist/templates/layouts/${NAME}/BaseLayout.astro`
                    ).toString();
                    writeFileSync(
                        `${layoutsDir}/BaseLayout.astro`,
                        parsedBaseLayout
                    );
                }

                // Pages
                if (!existsSync(`${pagesDir}/integrations.astro`)) {
                    let parsedIntegrationsPageContent: string;
                    parsedIntegrationsPageContent = readFileSync(
                        `${config.root.pathname}/node_modules/${NAME}/dist/templates/pages/${NAME}/integrations.astro`
                    ).toString();
                    writeFileSync(
                        `${pagesDir}/integrations.astro`,
                        parsedIntegrationsPageContent
                    );
                }
            },
        },
    };
}
