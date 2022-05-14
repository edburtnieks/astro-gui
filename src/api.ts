import type { AstroConfig, AstroIntegration } from "astro";
import type { OfficialIntegration, ParsedPluginOptions } from "./index.js";
import {
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    PAGE_INTEGRATIONS,
    PARSE_ACTIVE_INTEGRATIONS,
    PARSE_OFFICIAL_INTEGRATIONS,
    TEMPLATE_PAGE_INTEGRATIONS,
} from "./constants/index.js";
import { OFFICIAL_INTEGRATIONS } from "./constants/integrations.js";
import {
    copyLayoutTemplate,
    createDirectoryStructure,
    parseActiveIntegrations,
    parsePageContent,
} from "./utils.js";

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
    pluginOptions,
    pages,
}: {
    config: AstroConfig;
    pluginOptions: ParsedPluginOptions;
    pages: string[];
}) => {
    createDirectoryStructure(DIRECTORY_PAGES(config));
    pages.forEach((page) => {
        if (page === PAGE_INTEGRATIONS) {
            parseIntegrationsPageTemplate({
                config,
                activeIntegrations: config.integrations,
                officialIntegrations: OFFICIAL_INTEGRATIONS(pluginOptions),
            });
        }
    });
};

const parseIntegrationsPageTemplate = ({
    config,
    activeIntegrations = [],
    officialIntegrations = [],
}: {
    config: AstroConfig;
    activeIntegrations: AstroIntegration[];
    officialIntegrations: OfficialIntegration[];
}) => {
    parsePageContent(config, TEMPLATE_PAGE_INTEGRATIONS, (content: string) => {
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
