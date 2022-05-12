import type { AstroIntegration, AstroConfig } from "astro";

export default function createPlugin(): AstroIntegration {
    return {
        name: "astro-dashboard-ui",
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                console.log(config);
            },
        },
    };
}
