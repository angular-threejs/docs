# Angular Three Documentation - Continuation Guide

This document summarizes the documentation overhaul progress and provides context for continuing the work.

## Project Structure

```
/Users/nartc/code/github/angular-threejs/docs          # Documentation site (Astro + Starlight)
/Users/nartc/code/github/angular-threejs/angular-three # Source code repository
```

## What Was Completed

### Phase 1: User Journey Audit & Trim ✅

- Reviewed 18 learning documentation pages
- Made light trims for users who already know Angular + THREE.js

### Phase 2: Soba Completion ✅

- Filled 8 empty stub introduction pages
- Created ~56 new documentation pages for missing soba APIs
- Added new `gizmos` category

### Phase 3: New Packages ✅

- **Rapier** (7 pages): introduction, rigid-body, colliders, joints, instanced-bodies, hooks, attractor
- **Theatre** (4 pages): introduction, sheet, sheet-object, studio
- **Tweakpane** (2 pages): introduction, components
- **Postprocessing** (9 pages): introduction, bloom, vignette, depth-of-field, chromatic-aberration, glitch, noise, outline, smaa

### Phase 4: Live Demos ✅

Created 47 demos across categories:

| Category     | Demos Created                                                                                                                                                                     | Location                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Controls     | orbit-controls, trackball-controls, pointer-lock-controls, scroll-controls                                                                                                        | `src/components/soba/controls/`     |
| Gizmos       | gizmo-helper, transform-controls, pivot-controls                                                                                                                                  | `src/components/soba/gizmos/`       |
| Materials    | mesh-distort-material, mesh-wobble-material, mesh-reflector-material, point-material, mesh-portal-material, mesh-refraction-material, custom-shader-material                      | `src/components/soba/materials/`    |
| Staging      | environment, sky, float, sparkles, contact-shadows, center, stage, bounds, cloud, lightformer, shadow, backdrop, accumulative-shadows, spot-light, caustics, render-texture, mask | `src/components/soba/staging/`      |
| Abstractions | rounded-box, line, edges, prism-geometry, helper                                                                                                                                  | `src/components/soba/abstractions/` |
| Performances | instances, segments, points, adaptive-events, bvh                                                                                                                                 | `src/components/soba/performances/` |
| Misc         | animations, html, decal, sampler, fbo, depth-buffer                                                                                                                               | `src/components/soba/misc/`         |

## Remaining Work (Low Priority)

### Demos Not Created

These items were not created as they are loader utilities or require additional complex setups:

- **matcap-texture-resource** / **normal-texture-resource** - Loader utilities, not visual components
- **randomized-lights** - Already covered as part of accumulative-shadows demo
- **intersect** - Utility function, not a visual component
- **preload** - Utility function for asset preloading

## Demo Creation Pattern

### File Structure

Each demo requires 2-3 files:

```
src/components/soba/{category}/{component-name}/
├── {component-name}.ts    # Canvas wrapper component
└── scene-graph.ts         # Scene content component

src/content/references/soba/{category}/{component-name}.md  # API reference (YAML frontmatter)
```

### Canvas Wrapper Template

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-{component-name}',
	template: `
		<ngt-canvas [camera]="{ position: [3, 3, 3], fov: 50 }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: '{component-name}-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class ComponentName {
	static clientProviders = [provideNgtRenderer()];
}
```

### Scene Graph Template

```typescript
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsComponentName } from 'angular-three-soba/{category}';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-component-name [options]="{ /* options */ }">
			<!-- content -->
		</ngts-component-name>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsComponentName],
})
export class SceneGraph {}
```

### MDX Update Pattern

Update the MDX file to include the demo:

```mdx
---
title: NgtsComponentName
description: angular-three-soba/{category} NgtsComponentName API
---

import ReferenceWrapper from '@ui/reference/reference-wrapper.astro';
import ComponentName, {
	content,
	sceneGraphContent,
} from '@soba/{category}/{component-name}/{component-name}?includeContent';

<ReferenceWrapper
	path="soba/{category}/{component-name}"
	demoContent={content}
	demoSceneGraphContent={sceneGraphContent}
>
	<ComponentName client:only />
</ReferenceWrapper>
```

## Key Files

### Configuration

- `astro.config.mjs` - Astro configuration (includes noop image service)
- `astro.sidebar.mjs` - Sidebar navigation structure
- `tsconfig.json` - TypeScript paths (`@soba/*`, `@ui/*`, etc.)

### Reference Data

- `src/content/references/soba/` - API reference markdown files (YAML frontmatter + content)
- `src/content.config.ts` - Content collection schemas

### Existing Demos (for reference)

- `src/components/soba/controls/camera-controls/` - Complex demo with Tweakpane
- `src/components/soba/abstractions/billboard/` - Simple demo pattern
- `src/components/soba/materials/mesh-transmission-material/` - Material demo pattern

## Source Code Reference

When creating demos, reference the source repo for:

- **JSDoc comments**: All public APIs have comprehensive JSDoc
- **README files**: `libs/*/README.md` contain detailed API docs
- **Stories**: `libs/soba/src/{category}/*.stories.ts` have working examples
- **Examples**: `apps/examples/src/app/` has real-world usage

### Key Source Directories

| Path                      | Description               |
| ------------------------- | ------------------------- |
| `libs/soba/controls/`     | Camera controls           |
| `libs/soba/gizmos/`       | Transform gizmos          |
| `libs/soba/materials/`    | Special materials         |
| `libs/soba/staging/`      | Scene staging helpers     |
| `libs/soba/performances/` | Performance optimizations |
| `libs/soba/misc/`         | Miscellaneous utilities   |
| `libs/soba/abstractions/` | Geometry abstractions     |
| `libs/soba/loaders/`      | Asset loaders             |

## Build Commands

```bash
cd /Users/nartc/code/github/angular-threejs/docs

# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build (verify changes)
pnpm build

# Preview production build
pnpm preview
```

## Notes

1. **SobaWrapper options**:
    - `[grid]="false"` - Hide grid
    - `[lights]="false"` - Disable default lights
    - `[controls]="null"` - Disable default OrbitControls
    - `background="#color"` - Set background color

2. **Import patterns**:
    - Use `NgtArgs` for `*args` directive
    - Use `CUSTOM_ELEMENTS_SCHEMA` for THREE.js elements
    - Import from `angular-three-soba/{category}`

3. **Common issues**:
    - If build fails on Sharp, the noop image service is already configured
    - Scene-graph import errors are timing issues (files created in sequence)
    - Check export names in source if component not found
    - **Reference not found errors**: Ensure corresponding `.md` file exists in `src/content/references/soba/{category}/`

4. **API naming**:
    - Deprecated: `injectGLTF`, `injectTexture`, etc.
    - New: `gltfResource`, `textureResource`, etc.
