import type { OfficialIntegration } from "../index.js";
import { PluginOptions } from "../index.js";

export const OFFICIAL_INTEGRATION_BASE_URL =
    "https://github.com/withastro/astro/tree/main/packages/integrations";
export const OFFICIAL_INTEGRATIONS = (
    options: PluginOptions
): OfficialIntegration[] => {
    return [
        {
            type: "framework",
            name: "Frameworks",
            items: [
                {
                    name: "@astrojs/react",
                    command: "react",
                    commandText: `${options!.packageManager} astro add react`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/react`,
                    active: false,
                },
                {
                    name: "@astrojs/preact",
                    command: "preact",
                    commandText: `${options!.packageManager} astro add preact`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/preact`,
                    active: false,
                },
                {
                    name: "@astrojs/vue",
                    command: "vue",
                    commandText: `${options!.packageManager} astro add vue`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/vue`,
                    active: false,
                },
                {
                    name: "@astrojs/svelte",
                    command: "svelte",
                    commandText: `${options!.packageManager} astro add svelte`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/svelte`,
                    active: false,
                },
                {
                    name: "@astrojs/solid-js",
                    command: "solid",
                    commandText: `${options!.packageManager} astro add solid`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/solid`,
                    active: false,
                },
                {
                    name: "@astrojs/lit",
                    command: "lit",
                    commandText: `${options!.packageManager} astro add lit`,
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
                    command: "tailwind",
                    commandText: `${
                        options!.packageManager
                    } astro add tailwind`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/tailwind`,
                    active: false,
                },
                {
                    name: "@astrojs/turbolinks",
                    command: "turbolinks",
                    commandText: `${
                        options!.packageManager
                    } astro add turbolinks`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/turbolinks`,
                    active: false,
                },
                {
                    name: "@astrojs/partytown",
                    command: "partytown",
                    commandText: `${
                        options!.packageManager
                    } astro add partytown`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/partytown`,
                    active: false,
                },
                {
                    name: "@astrojs/sitemap",
                    command: "sitemap",
                    commandText: `${options!.packageManager} astro add sitemap`,
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
