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
import {
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    NAME,
    TEMPLATES_LAYOUTS,
    TEMPLATES_PAGES,
} from "./constants/index.js";

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

const copyTemplate = ({ from, to }: { from: string; to: string }) => {
    if (existsSync(to)) {
        return;
    }

    copyFileSync(from, to);
};

export const createDirectoryStructure = (dir: string) => {
    if (existsSync(dir)) {
        return;
    }

    mkdirSync(dir, { recursive: true });
};

export const copyLayoutTemplate = ({
    config,
    file,
}: {
    config: AstroConfig;
    file: string;
}) => {
    copyTemplate({
        from: `${TEMPLATES_LAYOUTS(config)}/${file}`,
        to: `${DIRECTORY_LAYOUTS(config)}/${file}`,
    });
};

export const parsePageContent = async (
    config: AstroConfig,
    file: string,
    cb: Function
) => {
    const content = readFileSync(
        `${TEMPLATES_PAGES(config)}/${file}`
    ).toString();
    const parsedContent = await cb(content);
    writeFileSync(`${DIRECTORY_PAGES(config)}/${file}`, parsedContent);
};

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
    });

    return activeIntegrationsByType;
};
