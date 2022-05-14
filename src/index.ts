import type { AstroIntegration, AstroConfig } from "astro";
import type { PackageManager, PackageManagerX } from "./utils.js";
import * as api from "./api.js";
import * as constants from "./constants/index.js";
import * as utils from "./utils.js";

export interface ActiveIntegration {
    type: string;
    name: string;
    items: Integration[];
}

export interface Integration {
    name: string;
    url: string;
    command?: string;
    active?: boolean;
}

export interface OfficialIntegration {
    type: string;
    name: string;
    items: Integration[];
}

export type PluginOptions =
    | {
          packageManager?: PackageManager;
      }
    | undefined;

export interface ParsedPluginOptions {
    packageManager: PackageManagerX;
}

export default function createPlugin(
    pluginOptions?: PluginOptions
): AstroIntegration {
    let parsedPluginOptions: ParsedPluginOptions;

    utils.getPackageManager().then((packageManager: PackageManagerX) => {
        parsedPluginOptions = {
            packageManager,
        };
    });

    return {
        name: constants.NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                api.prepareDataTemplates({
                    config,
                    pluginOptions: parsedPluginOptions,
                    files: [constants.DATA_INTEGRATIONS],
                });
                api.prepareComponentTemplates({
                    config,
                    files: [constants.TEMPLATE_COMPONENT_ADD_BUTTON],
                });
                api.prepareLayoutTemplates({
                    config,
                    files: [constants.TEMPLATE_LAYOUT_BASE],
                });
                api.preparePageTemplates({
                    config,
                    files: [constants.TEMPLATE_PAGE_INTEGRATIONS],
                });
            },
        },
    };
}

export { constants, utils, api };
