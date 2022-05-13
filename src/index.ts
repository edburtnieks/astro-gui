import type { AstroIntegration, AstroConfig } from "astro";
import * as constants from "./constants.js";
import * as utils from "./utils.js";

export default function createPlugin(): AstroIntegration {
    return {
        name: constants.NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                // Assign constants
                const path = config.srcDir.pathname;
                const pagesDir = constants.DIRECTORY_PAGES(path);
                const layoutsDir = constants.DIRECTORY_LAYOUTS(path);

                // Create necessary directories
                utils.createDirectoryStructure(pagesDir);
                utils.createDirectoryStructure(layoutsDir);

                // Copy layouts
                utils.copyLayoutTemplate(path, constants.TEMPLATE_LAYOUT_BASE);

                // Copy pages
                utils.copyPageTemplate(
                    path,
                    constants.TEMPLATE_PAGE_INTEGRATIONS
                );
            },
        },
    };
}

export { constants, utils };
