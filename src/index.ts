import type { AstroIntegration, AstroConfig } from "astro";
import * as api from "./api.js";
import * as constants from "./constants/index.js";
import * as utils from "./utils.js";

export interface ActiveIntegration {
    name: string;
}

export interface Integration {
    name: string;
    url: string;
    command?: string;
}

export interface OfficialIntegration {
    type: string;
    name: string;
    items: Integration[];
}

export interface PluginOptions {
    packageManager: string;
}

export default function createPlugin(
    pluginOptions: PluginOptions = { packageManager: "npx" }
): AstroIntegration {
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
                                officialIntegrations:
                                    constants.integrations.OFFICIAL_INTEGRATIONS(
                                        pluginOptions
                                    ),
                            },
                        },
                    ],
                });
            },
        },
    };
}

export { constants, utils, api };
