import type { AstroConfig, AstroIntegration } from "astro";
import type { OfficialIntegration, ParsedPluginOptions } from "./index.js";
import {
    DATA_INTEGRATIONS,
    DIRECTORY_ASSETS,
    DIRECTORY_COMPONENTS,
    DIRECTORY_DATA,
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    PARSE_ACTIVE_INTEGRATIONS,
    PARSE_OFFICIAL_INTEGRATIONS,
    TEMPLATE_DATA_INTEGRATIONS,
} from "./constants/index.js";
import { OFFICIAL_INTEGRATIONS } from "./constants/integrations.js";
import {
    copyAllAssetTemplates,
    copyComponentTemplate,
    copyLayoutTemplate,
    copyPageTemplate,
    createDirectoryStructure,
    parseActiveIntegrations,
    parseDataContent,
} from "./utils.js";

export const copyAssets = async ({ config }: { config: AstroConfig }) => {
    createDirectoryStructure(DIRECTORY_ASSETS(config));
    copyAllAssetTemplates({ config });
};

export const prepareDataTemplates = ({
    config,
    pluginOptions,
    files,
}: {
    config: AstroConfig;
    pluginOptions: ParsedPluginOptions;
    files: string[];
}) => {
    createDirectoryStructure(DIRECTORY_DATA(config));
    files.forEach((file) => {
        if (file === DATA_INTEGRATIONS) {
            parseIntegrationsDataTemplate({
                config,
                activeIntegrations: config.integrations,
                officialIntegrations: OFFICIAL_INTEGRATIONS(pluginOptions),
            });
        }
    });
};

export const prepareComponentTemplates = ({
    config,
    files,
}: {
    config: AstroConfig;
    files: string[];
}) => {
    createDirectoryStructure(DIRECTORY_COMPONENTS(config));
    files.forEach((file) => copyComponentTemplate({ config, file }));
};

export const prepareLayoutTemplates = ({
    config,
    files,
}: {
    config: AstroConfig;
    files: string[];
}) => {
    createDirectoryStructure(DIRECTORY_LAYOUTS(config));
    files.forEach((file) => copyLayoutTemplate({ config, file }));
};

export const preparePageTemplates = ({
    config,
    files,
}: {
    config: AstroConfig;
    files: string[];
}) => {
    createDirectoryStructure(DIRECTORY_PAGES(config));
    files.forEach((file) => copyPageTemplate({ config, file }));
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
