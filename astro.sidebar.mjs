import starlightSidebarTopics from 'starlight-sidebar-topics';

export function ngtSidebar() {
	return starlightSidebarTopics([
		{
			label: 'Learn',
			icon: 'open-book',
			link: '/learn/getting-started/introduction',
			items: [
				{
					label: 'Getting started',
					items: [
						{
							label: 'Introduction',
							slug: 'learn/getting-started/introduction',
						},
						{
							label: 'Installation',
							slug: 'learn/getting-started/installation',
						},
						{
							label: 'Your First Scene',
							slug: 'learn/getting-started/first-scene',
						},
					],
				},
				{
					label: 'Basics',
					items: [
						{
							label: 'App Structure',
							slug: 'learn/basics/app-structure',
						},
						{
							label: 'Loading Assets',
							slug: 'learn/basics/loading-assets',
						},
						{
							label: 'Handling Events',
							slug: 'learn/basics/handling-events',
						},
						{
							label: 'Disposing Objects',
							slug: 'learn/basics/disposing-objects',
						},
					],
				},
				{
					label: 'Advanced',
					items: [
						{
							label: 'Using Directives',
							slug: 'learn/advanced/using-directives',
						},
						{
							label: 'Portals',
							slug: 'learn/advanced/portals',
						},
						{
							label: 'Routed Scene',
							slug: 'learn/advanced/routed-scene',
						},
						{
							label: 'Performance',
							items: [
								{
									label: 'Overview',
									slug: 'learn/advanced/performance/overview',
								},
								{
									label: 'On-demand Rendering',
									slug: 'learn/advanced/performance/on-demand-rendering',
								},
								{
									label: 'Reusing Resources',
									slug: 'learn/advanced/performance/reusing-resources',
								},
								{
									label: 'Instancing',
									slug: 'learn/advanced/performance/instancing',
								},
								{
									label: 'Level of Details',
									slug: 'learn/advanced/performance/lod',
								},
								{
									label: 'Movement Regression',
									slug: 'learn/advanced/performance/movement-regression',
								},
							],
						},
						{
							label: 'Custom Abstractions',
							slug: 'learn/advanced/abstractions',
						},
						{
							label: 'WebGPU',
							slug: 'learn/advanced/webgpu',
							badge: { text: 'Experimental', variant: 'caution' },
						},
					],
				},
			],
		},
		{
			label: 'Core',
			link: '/reference/core/introduction',
			icon: 'seti:svg',
			items: [
				{
					label: 'angular-three',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/core/introduction',
						},
						{
							label: 'Renderer',
							slug: 'reference/core/renderer',
						},
						{
							label: 'Store',
							slug: 'reference/core/store',
						},
						{
							label: 'NgtArgs',
							slug: 'reference/core/args',
						},
						{
							label: 'NgtParent',
							slug: 'reference/core/parent',
						},
						{
							label: 'NgtPortal',
							slug: 'reference/core/portal',
						},
						{
							label: 'NgtRoutedScene',
							slug: 'reference/core/routed-scene',
						},
						{
							label: 'ngt-primitive',
							slug: 'reference/core/primitive',
						},
						{
							label: 'ngt-value',
							slug: 'reference/core/raw-value',
						},
						{
							label: 'injectBeforeRender',
							slug: 'reference/core/before-render',
						},
						{
							label: 'injectLoader',
							slug: 'reference/core/loader',
						},
						{
							label: 'Object Events',
							slug: 'reference/core/object-events',
						},
						{
							label: 'omit',
							slug: 'reference/core/omit',
						},
						{
							label: 'pick',
							slug: 'reference/core/pick',
						},
					],
				},
				{
					label: 'angular-three/dom',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/core/dom/introduction',
						},
						{
							label: 'provideNgtRenderer',
							slug: 'reference/core/dom/provide-renderer',
						},
						{
							label: 'NgtCanvas',
							slug: 'reference/core/dom/canvas',
						},
					],
				},
				{
					label: 'angular-three/testing',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/core/testing/introduction',
						},
					],
				},
			],
		},
		{
			label: 'Plugin',
			link: '/reference/plugin/introduction',
			icon: 'puzzle',
			items: [
				{
					label: 'angular-three-plugin',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/plugin/introduction',
						},
						{
							label: 'GLTF',
							slug: 'reference/plugin/gltf',
						},
					],
				},
			],
		},
		{
			label: 'Soba',
			link: '/reference/soba/introduction',
			icon: 'puzzle',
			items: [
				{
					label: 'angular-three-soba',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/soba/introduction',
						},
					],
				},
				{
					label: 'angular-three-soba/cameras',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/soba/cameras/introduction',
						},
						{
							label: 'NgtsPerspectiveCamera',
							slug: 'reference/soba/cameras/perspective-camera',
						},
					],
				},
				{
					label: 'angular-three-soba/loaders',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/soba/loaders/introduction',
						},
						{
							label: 'injectGLTF',
							slug: 'reference/soba/loaders/gltf',
						},
					],
				},
				{
					label: 'angular-three-soba/misc',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/soba/misc/introduction',
						},
						{
							label: 'injectAnimations',
							slug: 'reference/soba/misc/animations',
						},
					],
				},
				{
					label: 'angular-three-soba/performances',
					items: [
						{
							label: 'Introduction',
							slug: 'reference/soba/performances/introduction',
						},
						{
							label: 'NgtsDetailed',
							slug: 'reference/soba/performances/detailed',
						},
						{
							label: 'NgtsAdaptiveDpr',
							slug: 'reference/soba/performances/adaptive-dpr',
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
			label: 'Examples',
			link: 'https://angularthree-soba-next.netlify.app',
			icon: 'rocket',
		},
	]);
}
