import type { AstroIntegration, AstroConfig } from "astro";
import type { PackageManager } from "./utils.js";
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
    commandText?: string;
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

export default function createPlugin(
    pluginOptions?: PluginOptions
): AstroIntegration {
    let parsedPluginOptions: PluginOptions = pluginOptions;

    parsedPluginOptions = {
        packageManager: pluginOptions?.packageManager ?? "npx",
    };

    // utils.getPackageManager().then((packageManager: PackageManager) => {
    //     parsedPluginOptions = {
    //         ...pluginOptions,
    //         packageManager: pluginOptions?.packageManager ?? packageManager,
    //     };
    // });

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
                    pluginOptions: parsedPluginOptions,
                    pages: [constants.PAGE_INTEGRATIONS],
                });
            },
        },
    };
}

export { constants, utils, api };
