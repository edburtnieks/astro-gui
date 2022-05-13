import type { AstroIntegration, AstroConfig } from "astro";
import * as api from "./api.js";
import * as constants from "./constants.js";
import * as utils from "./utils.js";

export type ActiveIntegration = {
    name: string;
};

export default function createPlugin(): AstroIntegration {
    return {
        name: constants.NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                api.prepareLayoutTemplates({
                    config,
                    files: [constants.TEMPLATE_LAYOUT_BASE],
                });
                api.preparePageTemplates({
                    config,
                    pages: [
                        {
                            name: constants.PAGE_INTEGRATIONS,
                            options: {
                                activeIntegrations: config.integrations,
                            },
                        },
                    ],
                });
            },
        },
    };
}

export { constants, utils, api };
