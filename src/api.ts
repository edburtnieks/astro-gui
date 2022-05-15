import type { AstroConfig, AstroIntegration } from "astro";
import type { OfficialIntegration, ParsedPluginOptions } from "./index.js";
import {
    DIRECTORY_ASSETS,
    DIRECTORY_COMPONENTS,
    DIRECTORY_DATA,
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
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
    createDirectoryStructure(DIRECTORY_DATA(config));
    const files = await getAllFilesFromDirectory(TEMPLATES_DATA(config));
    files.forEach((file) => {
        if (file === TEMPLATE_DATA_INTEGRATIONS) {
            parseIntegrationsDataTemplate({
                config,
                activeIntegrations: config.integrations,
                officialIntegrations: OFFICIAL_INTEGRATIONS(pluginOptions),
            });
        }
    });
};

const parseIntegrationsDataTemplate = ({
    config,
    activeIntegrations = [],
    officialIntegrations = [],
}: {
    config: AstroConfig;
    activeIntegrations: AstroIntegration[];
    officialIntegrations: OfficialIntegration[];
}) => {
    parseDataContent(config, TEMPLATE_DATA_INTEGRATIONS, (content: string) => {
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
    });
};

export const prepareAssetTemplates = (config: AstroConfig) => {
    createDirectoryStructure(DIRECTORY_ASSETS(config));
    copyAllAssetTemplates(config);
};

export const prepareComponentTemplates = (config: AstroConfig) => {
    createDirectoryStructure(DIRECTORY_COMPONENTS(config));
    copyAllComponentTemplates(config);
};

export const prepareLayoutTemplates = (config: AstroConfig) => {
    createDirectoryStructure(DIRECTORY_LAYOUTS(config));
    copyAllLayoutTemplates(config);
};

export const preparePageTemplates = (config: AstroConfig) => {
    createDirectoryStructure(DIRECTORY_PAGES(config));
    copyAllPageTemplates(config);
};
