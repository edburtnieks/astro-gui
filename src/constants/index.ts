import type { AstroConfig } from "astro";
import * as integrations from "./integrations.js";

export const NAME = "astro-dashboard-ui";
export const TEMPLATES = (config: AstroConfig) =>
    `${config.root.pathname}node_modules/${NAME}/dist/templates`;
export const TEMPLATES_COMPONENTS = (config: AstroConfig) =>
    `${TEMPLATES(config)}/components/${NAME}`;
export const TEMPLATES_LAYOUTS = (config: AstroConfig) =>
    `${TEMPLATES(config)}/layouts/${NAME}`;
export const TEMPLATES_PAGES = (config: AstroConfig) =>
    `${TEMPLATES(config)}/pages/${NAME}`;

export const PARSE_NAME = "ASTRO_DASHBOARD_UI";
export const PARSE_ACTIVE_INTEGRATIONS = `"[${PARSE_NAME}:ACTIVE_INTEGRATIONS]" as unknown as ActiveIntegration[]`;
export const PARSE_OFFICIAL_INTEGRATIONS = `"[${PARSE_NAME}:OFFICIAL_INTEGRATIONS]" as unknown as OfficialIntegration[]`;

export const DIRECTORY_PAGES = (config: AstroConfig) =>
    `${config.srcDir.pathname}pages/${NAME}`;
export const DIRECTORY_LAYOUTS = (config: AstroConfig) =>
    `${config.srcDir.pathname}layouts/${NAME}`;
export const DIRECTORY_COMPONENTS = (config: AstroConfig) =>
    `${config.srcDir.pathname}components/${NAME}`;

export const TEMPLATE_LAYOUT_BASE = "BaseLayout.astro";
export const TEMPLATE_PAGE_INTEGRATIONS = "integrations.astro";
export const TEMPLATE_COMPONENT_ADD_BUTTON = "AddButton.tsx";

export const PAGE_INTEGRATIONS = "integrations";

export { integrations };
