import type { AstroConfig } from "astro";
import { existsSync, mkdirSync, copyFileSync } from "fs";
import {
    DIRECTORY_LAYOUTS,
    DIRECTORY_PAGES,
    NAME,
    TEMPLATES,
} from "./constants.js";

export const createDirectoryStructure = (dir: string) => {
    if (existsSync(dir)) {
        return;
    }

    mkdirSync(dir, { recursive: true });
};

export const copyTemplate = ({ from, to }: { from: string; to: string }) => {
    if (!existsSync(to)) {
        copyFileSync(from, to);
    }
};

export const copyLayoutTemplate = ({
    config,
    file,
}: {
    config: AstroConfig;
    file: string;
}) => {
    copyTemplate({
        from: `${TEMPLATES(config)}/layouts/${NAME}/${file}`,
        to: `${DIRECTORY_LAYOUTS(config)}/${file}`,
    });
};

export const copyPageTemplate = ({
    config,
    file,
}: {
    config: AstroConfig;
    file: string;
}) => {
    copyTemplate({
        from: `${TEMPLATES(config)}/pages/${NAME}/${file}`,
        to: `${DIRECTORY_PAGES(config)}/${file}`,
    });
};
