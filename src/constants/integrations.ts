import type { OfficialIntegration, ParsedPluginOptions } from "../index.js";

export const OFFICIAL_INTEGRATION_BASE_URL =
    "https://github.com/withastro/astro/tree/main/packages/integrations";
export const OFFICIAL_INTEGRATIONS = (
    options: ParsedPluginOptions
): OfficialIntegration[] => {
    return [
        {
            type: "framework",
            name: "Frameworks",
            items: [
                {
                    name: "@astrojs/react",
                    command: `${options.packageManager} astro add react --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/react`,
                    active: false,
                },
                {
                    name: "@astrojs/preact",
                    command: `${options.packageManager} astro add preact --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/preact`,
                    active: false,
                },
                {
                    name: "@astrojs/vue",
                    command: `${options.packageManager} astro add vue --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/vue`,
                    active: false,
                },
                {
                    name: "@astrojs/svelte",
                    command: `${options.packageManager} astro add svelte --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/svelte`,
                    active: false,
                },
                {
                    name: "@astrojs/solid-js",
                    command: `${options.packageManager} astro add solid --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/solid`,
                    active: false,
                },
                {
                    name: "@astrojs/lit",
                    command: `${options.packageManager} astro add lit --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/lit`,
                    active: false,
                },
            ],
        },
        {
            type: "additional",
            name: "Additional",
            items: [
                {
                    name: "@astrojs/tailwind",
                    command: `${options.packageManager} astro add tailwind --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/tailwind`,
                    active: false,
                },
                {
                    name: "@astrojs/turbolinks",
                    command: `${options.packageManager} astro add turbolinks --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/turbolinks`,
                    active: false,
                },
                {
                    name: "@astrojs/partytown",
                    command: `${options.packageManager} astro add partytown --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/partytown`,
                    active: false,
                },
                {
                    name: "@astrojs/sitemap",
                    command: `${options.packageManager} astro add sitemap --yes`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/sitemap`,
                    active: false,
                },
            ],
        },
        {
            type: "adapter",
            name: "Adapters",
            items: [
                {
                    name: "@astrojs/netlify",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/netlify`,
                    active: false,
                },
                {
                    name: "@astrojs/deno",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/deno`,
                    active: false,
                },
                {
                    name: "@astrojs/node",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/node`,
                    active: false,
                },
                {
                    name: "@astrojs/vercel",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/vercel`,
                    active: false,
                },
            ],
        },
    ];
};
