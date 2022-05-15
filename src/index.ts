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

export type ParsedLocation =
    | {
          data: string;
          assets: string;
          components: string;
          layouts: string;
          pages: string;
      }
    | undefined;

export type PluginOptions =
    | {
          packageManager?: PackageManager;
      }
    | undefined;

export interface ParsedPluginOptions {
    packageManager: PackageManagerX;
    location: ParsedLocation;
}

export default function createPlugin(
    pluginOptions?: PluginOptions
): AstroIntegration {
    let parsedPluginOptions: ParsedPluginOptions;

    utils.getPackageManager().then((packageManager: PackageManagerX) => {
        parsedPluginOptions = {
            packageManager,
            location: undefined,
        };
    });

    return {
        name: constants.NAME,
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                parsedPluginOptions = {
                    ...parsedPluginOptions,
                    location: {
                        data: constants.DIRECTORY_DATA(
                            config,
                            `data/${constants.NAME}`
                        ),
                        assets: constants.DIRECTORY_ASSETS(
                            config,
                            `public/assets/${constants.NAME}`
                        ),
                        components: constants.DIRECTORY_COMPONENTS(
                            config,
                            `components/${constants.NAME}`
                        ),
                        layouts: constants.DIRECTORY_LAYOUTS(
                            config,
                            `layouts/${constants.NAME}`
                        ),
                        pages: constants.DIRECTORY_PAGES(
                            config,
                            `pages/${constants.NAME}`
                        ),
                    },
                };

                api.prepareDataTemplates(config, parsedPluginOptions);
                api.prepareAssetTemplates(config, parsedPluginOptions);
                api.prepareComponentTemplates(config, parsedPluginOptions);
                api.prepareLayoutTemplates(config, parsedPluginOptions);
                api.preparePageTemplates(config, parsedPluginOptions);
            },
        },
    };
}

export { constants, utils, api };
