import { PluginOptions } from "../index.js";

export const OFFICIAL_INTEGRATION_BASE_URL =
    "https://github.com/withastro/astro/tree/main/packages/integrations";
export const OFFICIAL_INTEGRATIONS = (options: PluginOptions) => {
    return [
        {
            type: "framework",
            name: "Frameworks",
            items: [
                {
                    name: "@astrojs/react",
                    command: `${options!.packageManager} astro add react`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/react`,
                },
                {
                    name: "@astrojs/preact",
                    command: `${options!.packageManager} astro add preact`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/preact`,
                },
                {
                    name: "@astrojs/vue",
                    command: `${options!.packageManager} astro add vue`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/vue`,
                },
                {
                    name: "@astrojs/svelte",
                    command: `${options!.packageManager} astro add svelte`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/svelte`,
                },
                {
                    name: "@astrojs/solid-js",
                    command: `${options!.packageManager} astro add solid`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/solid`,
                },
                {
                    name: "@astrojs/lit",
                    command: `${options!.packageManager} astro add lit`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/lit`,
                },
            ],
        },
        {
            type: "additional",
            name: "Additional",
            items: [
                {
                    name: "@astrojs/tailwind",
                    command: `${options!.packageManager} astro add tailwind`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/tailwind`,
                },
                {
                    name: "@astrojs/turbolinks",
                    command: `${options!.packageManager} astro add turbolinks`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/turbolinks`,
                },
                {
                    name: "@astrojs/partytown",
                    command: `${options!.packageManager} astro add partytown`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/partytown`,
                },
                {
                    name: "@astrojs/sitemap",
                    command: `${options!.packageManager} astro add sitemap`,
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/sitemap`,
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
                },
                {
                    name: "@astrojs/deno",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/deno`,
                },
                {
                    name: "@astrojs/node",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/node`,
                },
                {
                    name: "@astrojs/vercel",
                    url: `${OFFICIAL_INTEGRATION_BASE_URL}/vercel`,
                },
            ],
        },
    ];
};
