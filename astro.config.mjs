import analogjsangular from '@analogjs/astro-angular';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import glob from 'fast-glob';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import starlightBlog from 'starlight-blog';
import { ngtSidebar } from './astro.sidebar.mjs';

function devServerFileWatcher(paths) {
	return {
		name: 'dev-server-file-watcher',
		hooks: {
			async 'astro:config:setup'({ addWatchFile, config }) {
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
			name: 'pre-include-content',
			enforce: 'pre',
			transform(_, id) {
				if (!id.includes('?includeContent') || id.includes('astro-entry')) return;

				const [filePath] = id.split('?');
				const fileContent = readFileSync(filePath, 'utf-8');

				if (map.has(filePath)) return;
				map.set(filePath, fileContent.replace(/\t/g, '    '));

				// check if file imports `./scene-graph`
				const sceneGraphImportMatch = fileContent.match(/import.*from\s+['"]\.\/scene-graph['"]/);
				if (sceneGraphImportMatch) {
					// Get the directory of the current file
					const dirPath = dirname(filePath);
					const sceneGraphPath = `${dirPath}/scene-graph.ts`;

					try {
						const sceneGraphContent = readFileSync(sceneGraphPath, 'utf-8');
						map.set(`${filePath}:scene-graph`, sceneGraphContent.replace(/\t/g, '    '));
					} catch (error) {
						// Scene graph file doesn't exist or can't be read, just continue
						console.warn(`Could not read scene-graph file for ${filePath}:
 ${error.message}`);
					}
				}
			},
		},
		{
			name: 'post-include-content',
			enforce: 'post',
			async transform(code, id) {
				if (!id.includes('?includeContent') || id.includes('astro-entry')) return;
				const [filePath] = id.split('?');
				const fileContent = map.get(filePath);
				const sceneGraphContent = map.get(`${filePath}:scene-graph`);

				return {
					code: `
					${code}
					export const content = ${JSON.stringify(fileContent)};
					export const sceneGraphContent = ${sceneGraphContent ? JSON.stringify(sceneGraphContent) : 'undefined'};
				`,
				};
			},
		},
	];
}

// https://astro.build/config
export default defineConfig({
	image: {
		service: {
			entrypoint: 'astro/assets/services/noop',
		},
	},
	vite: {
		esbuild: {
			jsxDev: true,
		},
		plugins: [includeContentPlugin()],
		ssr: {
			noExternal: [
				'angular-three-soba/**',
				'angular-three-cannon',
				'angular-three-cannon/**',
				'angular-three-rapier',
				'angular-three-rapier/**',
				'angular-three-postprocessing',
				'angular-three-postprocessing/**',
				'angular-three-tweakpane',
				'@pmndrs/vanilla',
				'@pmndrs/cannon-worker-api',
				'three-custom-shader-material',
				'postprocessing',
				'stats-gl',
			],
		},
		assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png', '**/*.CUBE'],
	},
	integrations: [
		devServerFileWatcher(['./astro.sidebar.mjs']),
		analogjsangular({
			vite: {
				transformFilter: (_, id) => {
					// we only transform files in components/scenes
					return (
						id.includes('components/scenes') ||
						id.includes('components/soba') ||
						id.includes('components/postprocessing')
					);
				},
			},
		}),
		starlight({
			title: 'Angular Three',
			routeMiddleware: ['./src/route-data.ts'],
			plugins: [
				ngtSidebar(),
				starlightBlog({
					authors: {
						chau: {
							name: 'Chau Tran',
							url: 'https://nartc.me',
							picture: 'https://avatars.githubusercontent.com/u/25516557?v=4',
						},
					},
				}),
			],
			favicon: '/angular-three-dark.svg',
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 4,
			},
			logo: {
				light: './src/assets/angular-three.svg',
				dark: './src/assets/angular-three-dark.svg',
			},
			// social: {
			// 	github: 'https://github.com/angular-threejs/angular-three',
			// },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/angular-threejs/angular-three' }],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
