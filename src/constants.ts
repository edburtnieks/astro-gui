import type { AstroConfig } from "astro";

export const NAME = "astro-dashboard-ui";
export const TEMPLATES = (config: AstroConfig) =>
    `${config.root.pathname}node_modules/${NAME}/dist/templates`;

export const DIRECTORY_PAGES = (config: AstroConfig) =>
    `${config.srcDir.pathname}pages/${NAME}`;
export const DIRECTORY_LAYOUTS = (config: AstroConfig) =>
    `${config.srcDir.pathname}layouts/${NAME}`;

export const TEMPLATE_LAYOUT_BASE = "BaseLayout.astro";
export const TEMPLATE_PAGE_INTEGRATIONS = "integrations.astro";
