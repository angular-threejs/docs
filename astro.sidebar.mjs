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
          ],
        },
      ],
    },
    {
      label: "Core",
      link: "/reference/core/renderer",
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
              label: "injectBeforeRender",
              slug: "reference/core/before-render",
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
      label: "Blog",
      link: "/blog/",
      icon: "rss",
      items: [
        {
          label: "Angular Three v2 is here!",
          slug: "blog/v2",
        },
      ],
    },
    {
      label: "Examples",
      link: "https://angularthre-soba-next.netlify.app",
      icon: "rocket",
    },
  ]);
}
