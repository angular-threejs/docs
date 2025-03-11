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
			credits: z
				.object({
					text: z.string(),
					link: z.string(),
				})
				.optional(),
			options: z
				.object({
					extends: z
						.array(
							z.object({
								name: z.string(),
								link: z.string(),
							}),
						)
						.optional(),
					properties: z
						.array(
							z.object({
								name: z.string(),
								type: z.string(),
								description: z.string(),
							}),
						)
						.optional(),
				})
				.optional(),
			arguments: z
				.array(
					z.object({
						name: z.string(),
						type: z.string(),
						description: z.string(),
						required: z.boolean().default(false),
					}),
				)
				.optional(),
			returns: z
				.array(
					z.object({
						type: z.string(),
						description: z.string(),
						properties: z
							.union([
								z.array(
									z.object({
										name: z.string(),
										type: z.string(),
										description: z.string(),
									}),
								),
								z.string(),
							])
							.optional(),
					}),
				)
				.optional(),
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
