import starlightSidebarTopics from "starlight-sidebar-topics";

export function ngtSidebar() {
  return starlightSidebarTopics([
    {
      label: "Learn",
      icon: "open-book",
      link: "/learn/getting-started/introduction",
      items: [
        {
          label: "Getting started",
          items: [
            {
              label: "Introduction",
              slug: "learn/getting-started/introduction",
            },
            {
              label: "Installation",
              slug: "learn/getting-started/installation",
            },
            {
              label: "Your First Scene",
              slug: "learn/getting-started/first-scene",
            },
          ],
        },
        {
          label: "Basics",
          items: [
            {
              label: "App Structure",
              slug: "learn/basics/app-structure",
            },
            {
              label: "Loading Assets",
              slug: "learn/basics/loading-assets",
            },
          ],
        },
        {
          label: "Advanced",
          items: [
            {
              label: "Custom Abstractions",
              slug: "learn/advanced/abstractions",
            },
          ],
        },
      ],
    },
    {
      label: "Core",
      link: "/reference/core/introduction",
      icon: "seti:svg",
      items: [
        {
          label: "angular-three",
          items: [
            {
              label: "Introduction",
              slug: "reference/core/introduction",
            },
            {
              label: "Renderer",
              slug: "reference/core/renderer",
            },
            {
              label: "Store",
              slug: "reference/core/store",
            },
            {
              label: "NgtArgs",
              slug: "reference/core/args",
            },
            {
              label: "ngt-primitive",
              slug: "reference/core/primitive",
            },
            {
              label: "injectBeforeRender",
              slug: "reference/core/before-render",
            },
            {
              label: "injectLoader",
              slug: "reference/core/loader",
            },
          ],
        },
        {
          label: "angular-three/dom",
          items: [
            {
              label: "Introduction",
              slug: "reference/core/dom/introduction",
            },
            {
              label: "NgtCanvas",
              slug: "reference/core/dom/canvas",
            },
          ],
        },
        {
          label: "angular-three/testing",
          items: [
            {
              label: "Introduction",
              slug: "reference/core/testing/introduction",
            },
          ],
        },
      ],
    },
    {
      label: "Plugin",
      link: "/reference/plugin/introduction",
      icon: "puzzle",
      items: [
        {
          label: "angular-three-plugin",
          items: [
            {
              label: "Introduction",
              slug: "reference/plugin/introduction",
            },
            {
              label: "GLTF",
              slug: "reference/plugin/gltf",
            },
          ],
        },
      ],
    },
    {
      label: "Soba",
      link: "/reference/soba/introduction",
      icon: "puzzle",
      items: [
        {
          label: "angular-three-soba",
          items: [
            {
              label: "Introduction",
              slug: "reference/soba/introduction",
            },
          ],
        },
        {
          label: "angular-three-soba/loaders",
          items: [
            {
              label: "Introduction",
              slug: "reference/soba/loaders/introduction",
            },
            {
              label: "injectGLTF",
              slug: "reference/soba/loaders/gltf",
            },
          ],
        },
        {
          label: "angular-three-soba/misc",
          items: [
            {
              label: "Introduction",
              slug: "reference/soba/misc/introduction",
            },
            {
              label: "injectAnimations",
              slug: "reference/soba/misc/animations",
            },
          ],
        },
      ],
    },
    // TODO: reenable blog
    // {
    //   label: "Blog",
    //   link: "/blog/",
    //   icon: "rss",
    //   items: [
    //     {
    //       label: "Angular Three v2 is here!",
    //       slug: "blog/v2",
    //     },
    //   ],
    // },
    {
      label: "Examples",
      link: "https://angularthre-soba-next.netlify.app",
      icon: "rocket",
    },
  ]);
}
