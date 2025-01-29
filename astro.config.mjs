import analogjsangular from "@analogjs/astro-angular";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import starlightBlog from "starlight-blog";
import { ngtSidebar } from "./astro.sidebar.mjs";
import glob from "fast-glob";

function devServerFileWatcher(paths) {
  return {
    name: "dev-server-file-watcher",
    hooks: {
      async "astro:config:setup"({ addWatchFile, config }) {
        for (const path of paths) {
          const files = await glob(path);
          files.forEach((file) => addWatchFile(new URL(file, config.root)));
        }
      },
    },
  };
}

function includeContentPlugin() {
  const map = new Map();

  return [
    {
      name: "pre-include-content",
      enforce: "pre",
      transform(_, id) {
        if (!id.includes("?includeContent") || id.includes("astro-entry"))
          return;

        const [filePath] = id.split("?");
        const fileContent = readFileSync(filePath, "utf-8");

        if (map.has(filePath)) return;
        map.set(filePath, fileContent.replace(/\t/g, "  "));
      },
    },
    {
      name: "post-include-content",
      enforce: "post",
      transform(code, id) {
        if (!id.includes("?includeContent") || id.includes("astro-entry"))
          return;
        const [filePath] = id.split("?");
        const fileContent = map.get(filePath);

        return {
          code: `
            ${code}
            export const content = ${JSON.stringify(fileContent)};
          `,
        };
      },
    },
  ];
}

// https://astro.build/config
export default defineConfig({
  vite: {
    esbuild: {
      jsxDev: true,
    },
    plugins: [includeContentPlugin()],
    ssr: {
      noExternal: [
        "angular-three-soba/**",
        "angular-three-cannon",
        "angular-three-cannon/**",
        "angular-three-rapier",
        "angular-three-rapier/**",
        "angular-three-postprocessing",
        "angular-three-postprocessing/**",
        "@pmndrs/vanilla",
        "@pmndrs/cannon-worker-api",
        "three-custom-shader-material",
      ],
    },
  },
  integrations: [
    devServerFileWatcher(["./astro.sidebar.mjs"]),
    analogjsangular({
      vite: {
        transformFilter: (_, id) => {
          // we only transform files in components/scenes
          return id.includes("components/scenes");
        },
      },
    }),
    starlight({
      title: "Angular Three",
      plugins: [
        ngtSidebar(),
        // TODO: reenable blog
        // starlightBlog({
        //   authors: {
        //     chau: {
        //       name: "Chau Tran",
        //       url: "https://nartc.me",
        //       picture: "https://avatars.githubusercontent.com/u/25516557?v=4",
        //     },
        //   },
        // }),
      ],
      favicon: "./src/assets/angular-three-dark.svg",
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      logo: {
        light: "./src/assets/angular-three.svg",
        dark: "./src/assets/angular-three-dark.svg",
      },
      social: {
        github: "https://github.com/angular-threejs/angular-three",
      },
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
