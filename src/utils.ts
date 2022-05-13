import type { AstroConfig } from "astro";
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
    TEMPLATES_LAYOUTS,
    TEMPLATES_PAGES,
} from "./constants.js";

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
    if (existsSync(`${DIRECTORY_PAGES(config)}/${file}`)) {
        return;
    }

    const content = readFileSync(
        `${TEMPLATES_PAGES(config)}/${file}`
    ).toString();
    const parsedContent = await cb(content);
    writeFileSync(`${DIRECTORY_PAGES(config)}/${file}`, parsedContent);
};
