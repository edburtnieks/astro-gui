import type { AstroConfig, AstroIntegration } from "astro";
import type { ActiveIntegration, OfficialIntegration } from "./index.js";
import preferredPM from "preferred-pm";
import {
    existsSync,
    mkdirSync,
    copyFileSync,
    readFileSync,
    writeFileSync,
} from "fs";
import { readdir } from "fs/promises";
import {
    DIRECTORY_ASSETS,
    DIRECTORY_COMPONENTS,
    DIRECTORY_DATA,
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    NAME,
    TEMPLATES_ASSETS,
    TEMPLATES_COMPONENTS,
    TEMPLATES_DATA,
    TEMPLATES_LAYOUTS,
    TEMPLATES_PAGES,
} from "./constants/index.js";

export const parseActiveIntegrations = (
    activeIntegrations: AstroIntegration[],
    officialIntegrations: OfficialIntegration[]
): ActiveIntegration[] => {
    const activeIntegrationsByType: ActiveIntegration[] = [
        { type: "framework", name: "Frameworks", items: [] },
        { type: "additional", name: "Additional", items: [] },
        { type: "adapter", name: "Adapters", items: [] },
    ];
    const parsedActiveIntegrations = activeIntegrations.filter(
        (integration) => integration.name !== NAME
    );

    officialIntegrations.forEach((officialIntegration) => {
        officialIntegration.items.forEach((officialIntegrationItem) => {
            parsedActiveIntegrations.forEach((activeIntegration) => {
                if (officialIntegrationItem.name === activeIntegration.name) {
                    activeIntegrationsByType
                        .find(
                            (element) =>
                                element.type === officialIntegration.type
                        )!
                        .items.push({
                            name: officialIntegrationItem.name,
                            url: officialIntegrationItem.url,
                        });

                    officialIntegrations
                        .find(
                            (element) =>
                                element.type === officialIntegration.type
                        )!
                        .items.find(
                            (a) => a.name === officialIntegrationItem.name
                        )!.active = true;
                }
            });
        });

        // Active integrations first
        officialIntegration.items.sort(
            (a, b) => Number(b.active) - Number(a.active)
        );
    });

    return activeIntegrationsByType;
};

export type PackageManager = "npm" | "pnpm" | "yarn";
export type PackageManagerX = "npx" | "pnpx" | "yarn";
export interface PackageManagerMap {
    npm: "npx";
    pnpm: "pnpx";
    yarn: "yarn";
}

export const getPackageManager = async (): Promise<PackageManagerX> => {
    const packageManager: PackageManagerMap = {
        npm: "npx",
        pnpm: "pnpx",
        yarn: "yarn",
    };

    return packageManager[
        await preferredPM(process.cwd()).then((pm) => pm?.name ?? "npm")
    ];
};

const copyTemplate = ({
    from,
    to,
    options = { replace: false },
}: {
    from: string;
    to: string;
    options?: { replace: boolean };
}) => {
    if (!options.replace && existsSync(to)) {
        return;
    }

    copyFileSync(from, to);
};

const copyAllFilesInDirectory = async ({
    from,
    to,
    options,
}: {
    from: string;
    to: string;
    options?: { replace: boolean };
}) => {
    const files = await getAllFilesFromDirectory(from);
    files.forEach((file) => {
        copyTemplate({
            from: `${from}/${file}`,
            to: `${to}/${file}`,
            options,
        });
    });
};

export const createDirectoryStructure = (dir: string) => {
    if (existsSync(dir)) {
        return;
    }

    mkdirSync(dir, { recursive: true });
};

export const getAllFilesFromDirectory = async (from: string) => {
    return await readdir(from);
};

export const parseDataContent = async (
    config: AstroConfig,
    file: string,
    cb: Function
) => {
    const content = readFileSync(
        `${TEMPLATES_DATA(config)}/${file}`
    ).toString();
    const parsedContent = await cb(content);
    writeFileSync(`${DIRECTORY_DATA(config)}/${file}`, parsedContent);
};

export const copyAllAssetTemplates = (config: AstroConfig) => {
    copyAllFilesInDirectory({
        from: TEMPLATES_ASSETS(config),
        to: DIRECTORY_ASSETS(config),
        options: {
            replace: true,
        },
    });
};

export const copyAllComponentTemplates = (config: AstroConfig) => {
    copyAllFilesInDirectory({
        from: TEMPLATES_COMPONENTS(config),
        to: DIRECTORY_COMPONENTS(config),
    });
};

export const copyAllLayoutTemplates = (config: AstroConfig) => {
    copyAllFilesInDirectory({
        from: TEMPLATES_LAYOUTS(config),
        to: DIRECTORY_LAYOUTS(config),
    });
};

export const copyAllPageTemplates = (config: AstroConfig) => {
    copyAllFilesInDirectory({
        from: TEMPLATES_PAGES(config),
        to: DIRECTORY_PAGES(config),
    });
};
