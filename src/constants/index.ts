import type { AstroConfig } from "astro";
import * as integrations from "./integrations.js";

const PARSE_NAME = "ASTRO_DASHBOARD_UI";
export const NAME = "astro-dashboard-ui";

export const TEMPLATE_DATA_INTEGRATIONS = "integrations.ts";
export const PARSE_ACTIVE_INTEGRATIONS = `"[${PARSE_NAME}:ACTIVE_INTEGRATIONS]" as unknown as ActiveIntegration[]`;
export const PARSE_OFFICIAL_INTEGRATIONS = `"[${PARSE_NAME}:OFFICIAL_INTEGRATIONS]" as unknown as OfficialIntegration[]`;

export const TEMPLATES = (config: AstroConfig) =>
    `${config.root.pathname}node_modules/${NAME}/dist/templates`;
export const TEMPLATES_DATA = (config: AstroConfig) =>
    `${TEMPLATES(config)}/data/${NAME}`;
export const TEMPLATES_ASSETS = (config: AstroConfig) =>
    `${TEMPLATES(config)}/assets/${NAME}`;
export const TEMPLATES_COMPONENTS = (config: AstroConfig) =>
    `${TEMPLATES(config)}/components/${NAME}`;
export const TEMPLATES_LAYOUTS = (config: AstroConfig) =>
    `${TEMPLATES(config)}/layouts/${NAME}`;
export const TEMPLATES_PAGES = (config: AstroConfig) =>
    `${TEMPLATES(config)}/pages/${NAME}`;

export const DIRECTORY_DATA = (config: AstroConfig, path: string) =>
    `${config.srcDir.pathname}${path}`;
export const DIRECTORY_ASSETS = (config: AstroConfig, path: string) =>
    `${config.root.pathname}${path}`;
export const DIRECTORY_COMPONENTS = (config: AstroConfig, path: string) =>
    `${config.srcDir.pathname}${path}`;
export const DIRECTORY_LAYOUTS = (config: AstroConfig, path: string) =>
    `${config.srcDir.pathname}${path}`;
export const DIRECTORY_PAGES = (config: AstroConfig, path: string) =>
    `${config.srcDir.pathname}${path}`;

export { integrations };
