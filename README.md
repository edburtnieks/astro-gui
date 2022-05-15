# Astro GUI

Manage your [Astro](https://astro.build) project using graphical interface. Inspired by Vue CLI GUI.

## Setup

1. Install `astro-gui`

    **shell**

    ```sh
    # Using npm
    npm i astro-gui

    # Using yarn
    yarn add astro-gui

    # Using pnpm
    pnpm add astro-gui
    ```

2. Add the integration to `integrations` property in your `astro.config.mjs` file

    **astro.config.mjs**

    ```js
    import astroGUI from 'astro-gui';

    export default {
        // ...
        integrations: [astroGUI()],
    };
    ```

3. Add the following to your `astro.config.mjs` file

    **astro.config.mjs**

    ```js
    export default {
        // ...
        vite: {
            ssr: {
                external: ['preferred-pm', 'execa'],
            },
        },
    };
    ```

4. Parts of the dashboard UI is built using [SolidJS](https://www.solidjs.com/)

    Install `solid` ([Detailed instructions](https://github.com/withastro/astro/tree/main/packages/integrations/solid))

    **shell**

    ```sh
    # Using npm
    npx astro add solid

    # Using yarn
    yarn astro add solid

    # Using pnpm
    pnpx astro add solid
    ```

5. Parts of the dashboard UI also requires SSR

    5.1. Install `node` adapter ([Detailed instructions](https://github.com/withastro/astro/tree/main/packages/integrations/node))

    **shell**

    ```sh
    # Using npm
    npm i @astrojs/node

    # Using yarn
    yarn add @astrojs/node

    # Using pnpm
    pnpx add @astrojs/node
    ```
    
    5.2. Add the adapter to `adapter` property in your `astro.config.mjs` file

    **astro.config.mjs**

    ```js
    import nodejs from '@astrojs/node';

    export default {
        // ...
        adapter: nodejs(),
    };
    ```

6. Currently you have to start the server using `--experimental-integrations` flag

    **package.json**

    ```json
    {
        // ...
        "scripts": {
            // ...
            "dev": "astro dev --experimental-integrations",
            "start": "astro dev --experimental-integrations",
        },
    }
    ```

## Getting started

The dashboard UI is built using Astro itself, which means all the files are generated and put directly in your project for you to freely modify everything. Although currently there are some limitations (TODO add limitations section).

### Pages

* Integrations - `/astro-gui/integrations`

    ![integrations](https://user-images.githubusercontent.com/85392357/168479443-b6d91bc5-46e4-4776-8db5-a14702f78045.png)


### Generated files

```
.
├── public
│   └── assets
│       └── astro-gui
│           ├── clipboard.svg
│           ├── deno.svg
│           ├── lit.svg
│           ├── netlify.svg
│           ├── node.svg
│           ├── partytown.svg
│           ├── preact.svg
│           ├── react.svg
│           ├── sitemap.svg
│           ├── solid.svg
│           ├── svelte.svg
│           ├── tailwind.svg
│           ├── terminal.svg
│           ├── turbolinks.svg
│           ├── vercel.svg
│           └── vue.svg
└── src
    ├── components
    │   └── astro-gui
    │       ├── AddButton.tsx
    │       ├── CopyButton.tsx
    │       └── ToastItem.tsx
    ├── data
    │   └── astro-gui
    │       └── integrations.ts
    ├── layouts
    │   └── astro-gui
    │       └── BaseLayout.astro
    └── pages
        └── astro-gui
            └── integrations.astro
```
