import type { AstroConfig, AstroIntegration } from "astro";
import type { OfficialIntegration, ParsedPluginOptions } from "./index.js";
import {
    PARSE_ACTIVE_INTEGRATIONS,
    PARSE_OFFICIAL_INTEGRATIONS,
    TEMPLATES_DATA,
    TEMPLATE_DATA_INTEGRATIONS,
} from "./constants/index.js";
import { OFFICIAL_INTEGRATIONS } from "./constants/integrations.js";
import {
    copyAllAssetTemplates,
    copyAllComponentTemplates,
    copyAllLayoutTemplates,
    copyAllPageTemplates,
    createDirectoryStructure,
    getAllFilesFromDirectory,
    parseActiveIntegrations,
    parseDataContent,
} from "./utils.js";

export const prepareDataTemplates = async (
    config: AstroConfig,
    pluginOptions: ParsedPluginOptions
) => {
    createDirectoryStructure(pluginOptions.location!.data);
    const files = await getAllFilesFromDirectory(TEMPLATES_DATA(config));
    files.forEach((file) => {
        if (file === TEMPLATE_DATA_INTEGRATIONS) {
            parseIntegrationsDataTemplate({
                config,
                pluginOptions,
                activeIntegrations: config.integrations,
                officialIntegrations: OFFICIAL_INTEGRATIONS(pluginOptions),
            });
        }
    });
};

const parseIntegrationsDataTemplate = ({
    config,
    pluginOptions,
    activeIntegrations = [],
    officialIntegrations = [],
}: {
    config: AstroConfig;
    pluginOptions: ParsedPluginOptions;
    activeIntegrations: AstroIntegration[];
    officialIntegrations: OfficialIntegration[];
}) => {
    parseDataContent(
        config,
        pluginOptions,
        TEMPLATE_DATA_INTEGRATIONS,
        (content: string) => {
            let parsedContent: string;
            const parsedActiveIntegrations = parseActiveIntegrations(
                activeIntegrations,
                officialIntegrations
            );

            parsedContent = content.replace(
                PARSE_ACTIVE_INTEGRATIONS,
                JSON.stringify(parsedActiveIntegrations)
            );
            parsedContent = parsedContent.replace(
                PARSE_OFFICIAL_INTEGRATIONS,
                JSON.stringify(officialIntegrations)
            );

            return parsedContent;
        }
    );
};

export const prepareAssetTemplates = (
    config: AstroConfig,
    pluginOptions: ParsedPluginOptions
) => {
    const path = pluginOptions.location!.assets;
    createDirectoryStructure(path);
    copyAllAssetTemplates(config, path);
};

export const prepareComponentTemplates = (
    config: AstroConfig,
    pluginOptions: ParsedPluginOptions
) => {
    const path = pluginOptions.location!.components;
    createDirectoryStructure(path);
    copyAllComponentTemplates(config, path);
};

export const prepareLayoutTemplates = (
    config: AstroConfig,
    pluginOptions: ParsedPluginOptions
) => {
    const path = pluginOptions.location!.layouts;
    createDirectoryStructure(path);
    copyAllLayoutTemplates(config, path);
};

export const preparePageTemplates = (
    config: AstroConfig,
    pluginOptions: ParsedPluginOptions
) => {
    const path = pluginOptions.location!.pages;
    createDirectoryStructure(path);
    copyAllPageTemplates(config, path);
};
