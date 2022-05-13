import { existsSync, mkdirSync, copyFileSync } from "fs";
import { DIRECTORY_LAYOUTS, DIRECTORY_PAGES, NAME } from "./constants.js";

export const createDirectoryStructure = (dir: string) => {
    if (existsSync(dir)) {
        return;
    }

    mkdirSync(dir, { recursive: true });
};

export const copyTemplate = ({
    from,
    to,
    file,
}: {
    from: string;
    to: string;
    file: string;
}) => {
    if (!existsSync(to)) {
        copyFileSync(`${from}/${file}`, `${to}/${file}`);
    }
};

export const copyLayoutTemplate = (path: string, file: string) => {
    copyTemplate({
        from: `${path}/node_modules/${NAME}/dist/templates/layouts/${NAME}`,
        to: DIRECTORY_LAYOUTS(path),
        file,
    });
};

export const copyPageTemplate = (path: string, file: string) => {
    copyTemplate({
        from: `${path}/node_modules/${NAME}/dist/templates/pages/${NAME}`,
        to: DIRECTORY_PAGES(path),
        file,
    });
};
