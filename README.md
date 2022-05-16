# Astro GUI

Manage your [Astro](https://astro.build) project using graphical interface. Inspired by Vue CLI GUI.

## Setup

1. Install `astro-gui`

    ```sh
    # Using npm
    npm i astro-gui

    # Using yarn
    yarn add astro-gui

    # Using pnpm
    pnpm add astro-gui
    ```

2. Add the integration to `integrations` property in your `astro.config.mjs` file

    ```js
    // astro.config.mjs
    import astroGUI from 'astro-gui';

    export default {
        // ...
        integrations: [astroGUI()],
    };
    ```

3. Add the following to your `astro.config.mjs` file

    ```js
    // astro.config.mjs
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

    ```sh
    # Using npm
    npm i @astrojs/node

    # Using yarn
    yarn add @astrojs/node

    # Using pnpm
    pnpx add @astrojs/node
    ```
    
    5.2. Add the adapter to `adapter` property in your `astro.config.mjs` file

    ```js
    // astro.config.mjs
    import nodejs from '@astrojs/node';

    export default {
        // ...
        adapter: nodejs(),
    };
    ```

6. Currently you have to start the server using `--experimental-integrations` flag

    ```json5
    // package.json
    {
        // ...
        "scripts": {
            // ...
            "dev": "astro dev --experimental-integrations",
            "start": "astro dev --experimental-integrations",
        },
    }
    ```

### Configuration

#### packageManager

Your package manager for the project is automatically detect, but in case you need to change it

Supported values - `'npm'` | `'yarn'` | `'pnpm'`

```js
// astro.config.mjs
import astroGUI from 'astro-gui';

export default {
    integrations: [astroGUI({
        packageManager: 'yarn',
    })],
};
```

## Getting started

The dashboard UI is built using Astro itself. That means all the files making up the whole GUI are generated and copied directly in your project for you to freely modify.

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

## What comes after the hackathon

There are a lot of possibilities for which direction this project could go, what features could be supported. Sky really is the limit here. Some example that come to mind:

* `Pages` section for managing pages of the project
* `API routes` section for managing API routes of the SSR project
* Design System section with components
* Automatic code generator for boilerplate stuff (components, layouts, pages, API routes etc.)
* Project configuration, creation, updating, managing from within the GUI
* Lighthouse report integration (similar to what Netlify introduced)
* One-click deployments
* **The GUI dashboard should be extensible and modifiable without too much opinions**
