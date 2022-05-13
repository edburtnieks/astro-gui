import type { AstroIntegration, AstroConfig } from "astro";
import { readFileSync, writeFileSync, existsSync } from "fs";
import {
    DIRECTORY_PAGES,
    DIRECTORY_LAYOUTS,
    NAME,
    TEMPLATE_PAGE_INTEGRATIONS,
    TEMPLATE_LAYOUT_BASE,
} from "./constants";
import {
    copyLayoutTemplate,
    copyPageTemplate,
    createDirectoryStructure,
} from "./utils";

export default function createPlugin(): AstroIntegration {
    return {
        name: NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                // Assign constants
                const path = config.srcDir.pathname;
                const pagesDir = DIRECTORY_PAGES(path);
                const layoutsDir = DIRECTORY_LAYOUTS(path);

                // Create necessary directories
                createDirectoryStructure(pagesDir);
                createDirectoryStructure(layoutsDir);

                // Copy layouts
                copyLayoutTemplate(path, TEMPLATE_LAYOUT_BASE);

                // Copy pages
                copyPageTemplate(path, TEMPLATE_PAGE_INTEGRATIONS);
            },
        },
    };
}
