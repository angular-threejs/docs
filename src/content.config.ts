import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context),
		}),
	}),
	snippets: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/snippets' }),
		schema: z.object({}),
	}),
	references: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/references' }),
		schema: z.object({
			options: z.object({
				extends: z.string().optional(),
				extendsLink: z.string().optional(),
				properties: z
					.array(
						z.object({
							name: z.string(),
							type: z.string(),
							description: z.string(),
						}),
					)
					.optional(),
			}),
			// required inputs and inputs that are not part of the options
			inputs: z
				.array(
					z.object({
						name: z.string(),
						type: z.string(),
						description: z.string(),
						required: z.boolean().default(false),
					}),
				)
				.optional(),
			outputs: z
				.array(
					z.object({
						name: z.string(),
						type: z.string(),
						description: z.string(),
					}),
				)
				.optional(),
		}),
	}),
};
