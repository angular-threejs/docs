import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { blogSchema } from "starlight-blog/schema";
import { defineCollection, z } from "astro:content";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
  snippets: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
    schema: z.object({}),
  }),
};
