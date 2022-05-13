import type { AstroConfig, AstroIntegration } from "astro";
import {
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    PAGE_INTEGRATIONS,
    PARSE_ACTIVE_INTEGRATIONS,
    TEMPLATE_PAGE_INTEGRATIONS,
} from "./constants.js";
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
            });
        }
    });
};

const parseIntegrationsPageTemplate = ({
    config,
    activeIntegrations = [],
}: {
    config: AstroConfig;
    activeIntegrations: AstroIntegration[];
}) => {
    parsePageContent(config, TEMPLATE_PAGE_INTEGRATIONS, (content: string) => {
        const parsedActiveIntegrations = activeIntegrations.map(
            (integration) => ({
                name: integration.name,
            })
        );

        return content.replace(
            PARSE_ACTIVE_INTEGRATIONS,
            JSON.stringify(parsedActiveIntegrations)
        );
    });
};
