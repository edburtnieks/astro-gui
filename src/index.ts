import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import type { AstroIntegration, AstroConfig } from "astro";

export default function createPlugin(): AstroIntegration {
    return {
        name: "astro-dashboard-ui",
        hooks: {
            "astro:config:setup": ({ config }: { config: AstroConfig }) => {
                // Create necessary directories
                const pagesDirectory = `${config.srcDir.pathname}/pages/astro-dashboard-ui`;
                const layoutsDirectory = `${config.srcDir.pathname}/layouts/astro-dashboard-ui`;

                if (!existsSync(pagesDirectory)) {
                    mkdirSync(pagesDirectory, { recursive: true });
                }

                if (!existsSync(layoutsDirectory)) {
                    mkdirSync(layoutsDirectory, { recursive: true });
                }

                // Layouts
                if (!existsSync(`${layoutsDirectory}/BaseLayout.astro`)) {
                    let parsedBaseLayout: string;
                    parsedBaseLayout = readFileSync(
                        `${config.root.pathname}/node_modules/astro-dashboard-ui/dist/templates/layouts/astro-dashboard-ui/BaseLayout.astro`
                    ).toString();
                    writeFileSync(
                        `${layoutsDirectory}/BaseLayout.astro`,
                        parsedBaseLayout
                    );
                }

                // Pages
                if (!existsSync(`${pagesDirectory}/integrations.astro`)) {
                    let parsedIntegrationsPageContent: string;
                    parsedIntegrationsPageContent = readFileSync(
                        `${config.root.pathname}/node_modules/astro-dashboard-ui/dist/templates/pages/astro-dashboard-ui/integrations.astro`
                    ).toString();
                    writeFileSync(
                        `${pagesDirectory}/integrations.astro`,
                        parsedIntegrationsPageContent
                    );
                }
            },
        },
    };
}
