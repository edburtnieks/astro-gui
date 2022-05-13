import type { AstroIntegration, AstroConfig } from "astro";
import * as constants from "./constants.js";
import * as utils from "./utils.js";

export default function createPlugin(): AstroIntegration {
    return {
        name: constants.NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                // Create necessary directories
                utils.createDirectoryStructure(
                    constants.DIRECTORY_PAGES(config)
                );
                utils.createDirectoryStructure(
                    constants.DIRECTORY_LAYOUTS(config)
                );

                // Copy layouts
                utils.copyLayoutTemplate({
                    config,
                    file: constants.TEMPLATE_LAYOUT_BASE,
                });

                // Copy pages
                utils.copyPageTemplate({
                    config,
                    file: constants.TEMPLATE_PAGE_INTEGRATIONS,
                });
            },
        },
    };
}

export { constants, utils };
