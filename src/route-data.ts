import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { MarkdownHeading } from 'astro';
import { getEntry } from 'astro:content';

export interface TocItem extends MarkdownHeading {
	children: TocItem[];
}

/** Inject a ToC entry as deep in the tree as its `depth` property requires. */
function injectChild(items: TocItem[], item: TocItem): void {
	const lastItem = items.at(-1);
	if (!lastItem || lastItem.depth >= item.depth) {
		items.push(item);
	} else {
		return injectChild(lastItem.children, item);
	}
}

export const onRequest = defineRouteMiddleware(async (context) => {
	const { entry } = context.locals.starlightRoute;
	const pathMatch = entry.body?.match(/path="([^"]+)"/);
	const path = pathMatch ? pathMatch[1] : null;
	if (!path) return;

	const contentEntry = await getEntry('references', path);
	if (!contentEntry || !contentEntry.rendered?.metadata?.['headings']) return;

	const headings = contentEntry.rendered.metadata['headings'] as MarkdownHeading[];

	if (contentEntry.data.arguments && headings.every((heading) => heading.text !== 'Arguments')) {
		headings.push({
			depth: 2,
			text: 'Arguments',
			slug: 'arguments',
		});
	}

	if (contentEntry.data.returns && headings.every((heading) => heading.text !== 'Returns')) {
		headings.push({
			depth: 2,
			text: 'Returns',
			slug: 'returns',
		});
	}

	if (contentEntry.data.inputs && headings.every((heading) => heading.text !== 'Inputs')) {
		headings.push({
			depth: 2,
			text: 'Inputs',
			slug: 'inputs',
		});
	}

	if (contentEntry.data.outputs && headings.every((heading) => heading.text !== 'Outputs')) {
		headings.push({
			depth: 2,
			text: 'Outputs',
			slug: 'outputs',
		});
	}

	if (contentEntry.data.options && headings.every((heading) => heading.text !== 'Options')) {
		headings.push({
			depth: 2,
			text: 'Options',
			slug: 'options',
		});
	}

	if (context.locals.starlightRoute.toc) {
		for (const heading of contentEntry.rendered.metadata['headings'] as MarkdownHeading[]) {
			injectChild(context.locals.starlightRoute.toc.items, { ...heading, children: [] });
		}
	}
});
