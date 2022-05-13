import type { AstroConfig, AstroIntegration } from "astro";
import type { OfficialIntegration } from "./index.js";
import {
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    PAGE_INTEGRATIONS,
    PARSE_ACTIVE_INTEGRATIONS,
    PARSE_OFFICIAL_INTEGRATIONS,
    TEMPLATE_PAGE_INTEGRATIONS,
} from "./constants/index.js";
import {
    copyLayoutTemplate,
    createDirectoryStructure,
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
    pages,
}: {
    config: AstroConfig;
    pages: any[];
}) => {
    createDirectoryStructure(DIRECTORY_PAGES(config));
    pages.forEach((page) => {
        if (page.name === PAGE_INTEGRATIONS) {
            parseIntegrationsPageTemplate({
                config,
                activeIntegrations: page.options.activeIntegrations,
                officialIntegrations: page.options.officialIntegrations,
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
        const parsedActiveIntegrations = activeIntegrations.map(
            (integration) => ({
                name: integration.name,
            })
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
