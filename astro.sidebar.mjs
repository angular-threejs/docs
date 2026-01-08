import starlightSidebarTopics from 'starlight-sidebar-topics';

export function ngtSidebar() {
	return starlightSidebarTopics(
		[
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
								label: 'beforeRender',
								slug: 'reference/core/before-render',
							},
							{
								label: 'loaderResource',
								slug: 'reference/core/loader',
							},
							{
								label: 'Object Events',
								slug: 'reference/core/object-events',
							},
							{
								label: 'NgtSelection',
								slug: 'reference/core/selection',
							},
							{
								label: 'is',
								slug: 'reference/core/is',
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
							{
								label: 'NgtTestBed',
								slug: 'reference/core/testing/test-bed',
							},
							{
								label: 'fireEvent',
								slug: 'reference/core/testing/fire-event',
							},
							{
								label: 'advance',
								slug: 'reference/core/testing/advance',
							},
							{
								label: 'toGraph',
								slug: 'reference/core/testing/to-graph',
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
							{
								label: 'aux',
								slug: 'reference/plugin/aux',
							},
						],
					},
				],
			},
			{
				label: 'Soba',
				link: '/reference/soba/introduction',
				icon: 'star',
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
						label: 'angular-three-soba/abstractions',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/soba/abstractions/introduction',
							},
							{
								label: 'NgtsBillboard',
								slug: 'reference/soba/abstractions/billboard',
							},
							{
								label: 'NgtsRoundedBox',
								slug: 'reference/soba/abstractions/rounded-box',
							},
							{
								label: 'NgtsGrid',
								slug: 'reference/soba/abstractions/grid',
							},
							{
								label: 'NgtsGradientTexture',
								slug: 'reference/soba/abstractions/gradient-texture',
							},
							{
								label: 'NgtsText',
								slug: 'reference/soba/abstractions/text',
							},
							{
								label: 'NgtsText3D',
								slug: 'reference/soba/abstractions/text-3d',
							},
							{
								label: 'NgtsLine',
								slug: 'reference/soba/abstractions/line',
							},
							{
								label: 'NgtsEdges',
								slug: 'reference/soba/abstractions/edges',
							},
							{
								label: 'NgtsPrismGeometry',
								slug: 'reference/soba/abstractions/prism-geometry',
							},
							{
								label: 'helper',
								slug: 'reference/soba/abstractions/helper',
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
							{
								label: 'NgtsOrthographicCamera',
								slug: 'reference/soba/cameras/orthographic-camera',
							},
							{
								label: 'NgtsCubeCamera',
								slug: 'reference/soba/cameras/cube-camera',
							},
						],
					},
					{
						label: 'angular-three-soba/controls',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/soba/controls/introduction',
							},
							{
								label: 'NgtsCameraControls',
								slug: 'reference/soba/controls/camera-controls',
							},
							{
								label: 'NgtsOrbitControls',
								slug: 'reference/soba/controls/orbit-controls',
							},
							{
								label: 'NgtsPointerLockControls',
								slug: 'reference/soba/controls/pointer-lock-controls',
							},
							{
								label: 'NgtsScrollControls',
								slug: 'reference/soba/controls/scroll-controls',
							},
							{
								label: 'NgtsTrackballControls',
								slug: 'reference/soba/controls/trackball-controls',
							},
						],
					},
					{
						label: 'angular-three-soba/gizmos',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/soba/gizmos/introduction',
							},
							{
								label: 'NgtsGizmoHelper',
								slug: 'reference/soba/gizmos/gizmo-helper',
							},
							{
								label: 'NgtsTransformControls',
								slug: 'reference/soba/gizmos/transform-controls',
							},
							{
								label: 'NgtsPivotControls',
								slug: 'reference/soba/gizmos/pivot-controls',
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
								label: 'gltfResource',
								slug: 'reference/soba/loaders/gltf',
							},
							{
								label: 'textureResource',
								slug: 'reference/soba/loaders/texture-resource',
							},
							{
								label: 'fontResource',
								slug: 'reference/soba/loaders/font-resource',
							},
							{
								label: 'fbxResource',
								slug: 'reference/soba/loaders/fbx-resource',
							},
							{
								label: 'progress',
								slug: 'reference/soba/loaders/progress',
							},
							{
								label: 'NgtsLoader',
								slug: 'reference/soba/loaders/loader',
							},
						],
					},
					{
						label: 'angular-three-soba/materials',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/soba/materials/introduction',
							},
							{
								label: 'NgtsCustomShaderMaterial',
								slug: 'reference/soba/materials/custom-shader-material',
							},
							{
								label: 'NgtsMeshDistortMaterial',
								slug: 'reference/soba/materials/mesh-distort-material',
							},
							{
								label: 'NgtsMeshPortalMaterial',
								slug: 'reference/soba/materials/mesh-portal-material',
							},
							{
								label: 'NgtsMeshReflectorMaterial',
								slug: 'reference/soba/materials/mesh-reflector-material',
							},
							{
								label: 'NgtsMeshRefractionMaterial',
								slug: 'reference/soba/materials/mesh-refraction-material',
							},
							{
								label: 'NgtsMeshTransmissionMaterial',
								slug: 'reference/soba/materials/mesh-transmission-material',
							},
							{
								label: 'NgtsMeshWobbleMaterial',
								slug: 'reference/soba/materials/mesh-wobble-material',
							},
							{
								label: 'NgtsPointMaterial',
								slug: 'reference/soba/materials/point-material',
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
								label: 'animations',
								slug: 'reference/soba/misc/animations',
							},
							{
								label: 'fbo',
								slug: 'reference/soba/misc/fbo',
							},
							{
								label: 'depthBuffer',
								slug: 'reference/soba/misc/depth-buffer',
							},
							{
								label: 'NgtsSampler / surfaceSampler',
								slug: 'reference/soba/misc/sampler',
							},
							{
								label: 'NgtsDecal',
								slug: 'reference/soba/misc/decal',
							},
							{
								label: 'NgtsHTML',
								slug: 'reference/soba/misc/html',
							},
							{
								label: 'intersect / NgtsIntersect',
								slug: 'reference/soba/misc/intersect',
							},
							{
								label: 'NgtsPreload',
								slug: 'reference/soba/misc/preload',
							},
							{
								label: 'NgtsSoftShadows',
								slug: 'reference/soba/misc/soft-shadows',
							},
							{
								label: 'NgtsBakeShadows',
								slug: 'reference/soba/misc/bake-shadows',
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
							{
								label: 'NgtsAdaptiveEvents',
								slug: 'reference/soba/performances/adaptive-events',
							},
							{
								label: 'NgtsBVH',
								slug: 'reference/soba/performances/bvh',
							},
							{
								label: 'NgtsInstances',
								slug: 'reference/soba/performances/instances',
							},
							{
								label: 'NgtsSegments',
								slug: 'reference/soba/performances/segments',
							},
							{
								label: 'NgtsPoints',
								slug: 'reference/soba/performances/points',
							},
						],
					},
					{
						label: 'angular-three-soba/staging',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/soba/staging/introduction',
							},
							{
								label: 'NgtsAccumulativeShadows',
								slug: 'reference/soba/staging/accumulative-shadows',
							},
							{
								label: 'NgtsRandomizedLights',
								slug: 'reference/soba/staging/randomized-lights',
							},
							{
								label: 'NgtsCenter',
								slug: 'reference/soba/staging/center',
							},
							{
								label: 'NgtsCloud',
								slug: 'reference/soba/staging/cloud',
							},
							{
								label: 'NgtsContactShadows',
								slug: 'reference/soba/staging/contact-shadows',
							},
							{
								label: 'NgtsEnvironment',
								slug: 'reference/soba/staging/environment',
							},
							{
								label: 'NgtsLightformer',
								slug: 'reference/soba/staging/lightformer',
							},
							{
								label: 'NgtsFloat',
								slug: 'reference/soba/staging/float',
							},
							{
								label: 'matcapTextureResource',
								slug: 'reference/soba/staging/matcap-texture-resource',
							},
							{
								label: 'NgtsMask',
								slug: 'reference/soba/staging/mask',
							},
							{
								label: 'normalTextureResource',
								slug: 'reference/soba/staging/normal-texture-resource',
							},
							{
								label: 'NgtsRenderTexture',
								slug: 'reference/soba/staging/render-texture',
							},
							{
								label: 'NgtsBounds',
								slug: 'reference/soba/staging/bounds',
							},
							{
								label: 'NgtsShadow',
								slug: 'reference/soba/staging/shadow',
							},
							{
								label: 'NgtsSparkles',
								slug: 'reference/soba/staging/sparkles',
							},
							{
								label: 'NgtsSky',
								slug: 'reference/soba/staging/sky',
							},
							{
								label: 'NgtsStage',
								slug: 'reference/soba/staging/stage',
							},
							{
								label: 'NgtsCaustics',
								slug: 'reference/soba/staging/caustics',
							},
							{
								label: 'NgtsSpotLight',
								slug: 'reference/soba/staging/spot-light',
							},
							{
								label: 'NgtsBackdrop',
								slug: 'reference/soba/staging/backdrop',
							},
						],
					},
				],
			},
			{
				label: 'Postprocessing',
				link: '/reference/postprocessing/introduction',
				icon: 'sun',
				items: [
					{
						label: 'angular-three-postprocessing',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/postprocessing/introduction',
							},
							{
								label: 'NgtpASCII',
								slug: 'reference/postprocessing/ascii',
							},
							{
								label: 'NgtpBloom',
								slug: 'reference/postprocessing/bloom',
							},
							{
								label: 'NgtpBrightnessContrast',
								slug: 'reference/postprocessing/brightness-contrast',
							},
							{
								label: 'NgtpChromaticAberration',
								slug: 'reference/postprocessing/chromatic-aberration',
							},
							{
								label: 'NgtpColorAverage',
								slug: 'reference/postprocessing/color-average',
							},
							{
								label: 'NgtpColorDepth',
								slug: 'reference/postprocessing/color-depth',
							},
							{
								label: 'NgtpDepth',
								slug: 'reference/postprocessing/depth',
							},
							{
								label: 'NgtpDepthOfField',
								slug: 'reference/postprocessing/depth-of-field',
							},
							{
								label: 'NgtpDotScreen',
								slug: 'reference/postprocessing/dot-screen',
							},
							{
								label: 'NgtpFXAA',
								slug: 'reference/postprocessing/fxaa',
							},
							{
								label: 'NgtpGlitch',
								slug: 'reference/postprocessing/glitch',
							},
							{
								label: 'NgtpGodRays',
								slug: 'reference/postprocessing/god-rays',
							},
							{
								label: 'NgtpGrid',
								slug: 'reference/postprocessing/grid',
							},
							{
								label: 'NgtpHueSaturation',
								slug: 'reference/postprocessing/hue-saturation',
							},
							{
								label: 'NgtpLensFlare',
								slug: 'reference/postprocessing/lens-flare',
							},
							{
								label: 'NgtpLUT',
								slug: 'reference/postprocessing/lut',
							},
							{
								label: 'NgtpNoise',
								slug: 'reference/postprocessing/noise',
							},
							{
								label: 'NgtpOutline',
								slug: 'reference/postprocessing/outline',
							},
							{
								label: 'NgtpPixelation',
								slug: 'reference/postprocessing/pixelation',
							},
							{
								label: 'NgtpScanline',
								slug: 'reference/postprocessing/scanline',
							},
							{
								label: 'NgtpSelectiveBloom',
								slug: 'reference/postprocessing/selective-bloom',
							},
							{
								label: 'NgtpSepia',
								slug: 'reference/postprocessing/sepia',
							},
							{
								label: 'NgtpShockWave',
								slug: 'reference/postprocessing/shock-wave',
							},
							{
								label: 'NgtpSMAA',
								slug: 'reference/postprocessing/smaa',
							},
							{
								label: 'NgtpTiltShift',
								slug: 'reference/postprocessing/tilt-shift',
							},
							{
								label: 'NgtpTiltShift2',
								slug: 'reference/postprocessing/tilt-shift-2',
							},
							{
								label: 'NgtpToneMapping',
								slug: 'reference/postprocessing/tone-mapping',
							},
							{
								label: 'NgtpVignette',
								slug: 'reference/postprocessing/vignette',
							},
							{
								label: 'NgtpWater',
								slug: 'reference/postprocessing/water',
							},
						],
					},
					{
						label: 'angular-three-postprocessing/n8ao',
						items: [
							{
								label: 'NgtpN8AO',
								slug: 'reference/postprocessing/n8ao',
							},
						],
					},
				],
			},
			{
				label: 'Rapier',
				link: '/reference/rapier/introduction',
				icon: 'rocket',
				items: [
					{
						label: 'angular-three-rapier',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/rapier/introduction',
							},
							{
								label: 'NgtrRigidBody',
								slug: 'reference/rapier/rigid-body',
							},
							{
								label: 'Colliders',
								slug: 'reference/rapier/colliders',
							},
							{
								label: 'Joints',
								slug: 'reference/rapier/joints',
							},
							{
								label: 'NgtrInstancedRigidBodies',
								slug: 'reference/rapier/instanced-bodies',
							},
							{
								label: 'Hooks',
								slug: 'reference/rapier/hooks',
							},
							{
								label: 'NgtrAttractor',
								slug: 'reference/rapier/attractor',
							},
						],
					},
				],
			},
			{
				label: 'Theatre',
				link: '/reference/theatre/introduction',
				icon: 'pencil',
				items: [
					{
						label: 'angular-three-theatre',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/theatre/introduction',
							},
							{
								label: 'Sheet and Sequence',
								slug: 'reference/theatre/sheet',
							},
							{
								label: 'Sheet Object',
								slug: 'reference/theatre/sheet-object',
							},
							{
								label: 'Studio',
								slug: 'reference/theatre/studio',
							},
						],
					},
				],
			},
			{
				label: 'Tweakpane',
				link: '/reference/tweakpane/introduction',
				icon: 'setting',
				items: [
					{
						label: 'angular-three-tweakpane',
						items: [
							{
								label: 'Introduction',
								slug: 'reference/tweakpane/introduction',
							},
							{
								label: 'Components',
								slug: 'reference/tweakpane/components',
							},
						],
					},
				],
			},
			{
				label: 'Examples',
				link: 'https://demo.angularthree.org',
				icon: 'rocket',
			},
		],
		{
			exclude: ['/blog', '/blog/**/*'],
		},
	);
}
