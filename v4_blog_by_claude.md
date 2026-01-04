---
title: Angular Three v4 is here!
excerpt: Angular Three v4 is here!
date: 2026-01-05
authors:
    - chau
tags:
    - angular
    - three
    - release
featured: true
---

After months of development and over 125 pre-release versions, we're thrilled to announce the release of Angular Three v4! This release represents a complete rewrite of the custom renderer, unlocking capabilities that were previously impossible or required complex workarounds.

## Foreword

Angular Three v4 is a major release with significant architectural changes. The renderer has been completely rewritten to provide app-level integration, which fundamentally changes how Angular Three interacts with your application's template rendering.

While the surface-level APIs remain familiar - you still use `<ngt-mesh>`, `<ngt-box-geometry>`, and other declarative elements - the underlying mechanics have changed substantially. Consequently, we recommend treating v4 as a fresh start rather than an incremental upgrade.

Angular Three v4 requires a minimum of **Angular 20** and **Three.js 174+**.

## What's new in Angular Three v4

- App-Level Renderer Integration
- Full Template Control
- Simplified Routed Scenes
- Pierced Props for Nested Properties
- [Angular Resource API](https://angular.dev/guide/signals/resource) Integration
- New Element Lifecycle Events
- Theatre.js Animation Integration (NEW)
- Tweakpane Debug UI Integration (NEW)
- New Soba Components

While this list might seem modest at first glance, the core improvements in Angular Three v4 unlock a wealth of potential that has been incorporated into other packages like `angular-three-soba`, `angular-three-rapier`, `angular-three-cannon`, and `angular-three-postprocessing`.

### App-Level Renderer Integration

The most significant change in Angular Three v4 is how the renderer is provided. Previously, the renderer was implicitly created when you used `ngt-canvas` with a `[sceneGraph]` input. This worked, but it limited what we could do with portals, routed scenes, and multiple views.

#### Before (v3)

```angular-ts
// app.config.ts - nothing needed

// component.ts
@Component({
    template: `<ngt-canvas [sceneGraph]="SceneGraph" />`,
})
export class AppComponent {
    SceneGraph = SceneGraphComponent;
}
```

#### After (v4)

```angular-ts
// app.config.ts
import { provideNgtRenderer } from 'angular-three/dom';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(), // Recommended!
        provideNgtRenderer(), // NEW: App-level renderer
    ],
};

// component.ts
@Component({
    imports: [NgtCanvas],
    template: `
        <ngt-canvas>
            <ng-template canvasContent>
                <app-scene />
            </ng-template>
        </ngt-canvas>
    `,
})
export class AppComponent {}
```

#### Why This Matters

The app-level renderer enables:

- **Full template control**: Angular Three now owns the entire template rendering pipeline
- **Proper DOM fallback**: Mix HTML and Three.js elements seamlessly
- **Working portals**: Create portals to different scenes without hacks
- **Foundation for multiple views**: The architecture now supports patterns like [R3F's View](https://r3f.docs.pmnd.rs/api/canvas#extracting-views-from-the-canvas) for future implementation
- **Simplified routed scenes**: No more complex `EnvironmentInjector` workarounds

### Full Template Control

Because Angular Three now owns the template rendering at the application level, **all elements** on the template pass through Angular Three's custom renderer. This allows Angular Three to detect and render THREE.js elements accordingly, even when declared **outside** of the canvas or **mixed together** with DOM elements.

This architectural change is foundational. It enables Angular Three to properly handle DOM fallback for non-THREE.js elements, makes portals work correctly, and opens the door for future features like multiple views and scissor rendering techniques (similar to [R3F's View](https://r3f.docs.pmnd.rs/api/canvas#extracting-views-from-the-canvas)). Previously, achieving these patterns required complex workarounds or was simply not possible.

The `canvasContent` directive marks where your scene graph begins, and the template context gives you access to both the canvas element and its host container:

```angular-html
<ngt-canvas>
    <ng-template canvasContent let-canvas let-host="host">
        <!-- canvas: HTMLCanvasElement -->
        <!-- host: Host HTMLElement containing the canvas -->
        <app-scene />
    </ng-template>
</ngt-canvas>
```

### Simplified Routed Scenes

One of the most requested features was better routing support. In v3, we had a complex `NgtRouterOutlet` with custom `EnvironmentInjector` logic spanning over 100 lines. In v4, it's just a simple wrapper around Angular's standard `<router-outlet>`:

```angular-ts
// v4 - Simple and clean (~15 lines)
@Component({
    selector: 'ngt-routed-scene',
    template: `<router-outlet />`,
    imports: [RouterOutlet],
})
export class NgtRoutedScene {
    /* just CD trigger on route change */
}
```

#### Real Example: Routed 3D Scenes

Here's a real example from our demos showing how to create routed 3D scenes with shared layout elements. You can see it live at [https://angularthree-demo-next.netlify.app/routed](https://angularthree-demo-next.netlify.app/routed).

The main component sets up the canvas with navigation links:

```angular-ts
@Component({
    template: `
        <div class="h-svh">
            <ngt-canvas shadows [camera]="{ position: [0, 0, 20], fov: 50 }">
                <app-routed-scene *canvasContent />
            </ngt-canvas>
        </div>

        <ul class="absolute top-4 left-4 flex items-center gap-2">
            <li><a routerLink="knot" routerLinkActive="text-blue-500">knot</a></li>
            <li><a routerLink="torus" routerLinkActive="text-blue-500">torus</a></li>
            <li><a routerLink="bomb" routerLinkActive="text-blue-500">bomb</a></li>
        </ul>
    `,
    imports: [RoutedScene, RouterLink, RouterLinkActive, NgtCanvas],
})
export default class Routed {}
```

The scene layout component wraps `<router-outlet>` with shared lighting, environment, and post-processing:

```angular-ts
@Component({
    selector: 'app-routed-scene',
    template: `
        <ngt-color *args="['#e0e0e0']" attach="background" />
        <ngt-spot-light [position]="[20, 20, 10]" [penumbra]="1" [castShadow]="true" />

        <app-current [position]="[0, 0, -10]" [text]="currentRoute()" />

        <ngts-float [options]="{ floatIntensity: 2 }">
            <router-outlet />
        </ngts-float>

        <ngts-contact-shadows [options]="{ scale: 100, position: [0, -7.5, 0] }" />
        <ngts-environment [options]="{ preset: 'city' }">
            <ngts-lightformer * [options]="{ position: [10, 5, 0], scale: [10, 50, 1] }" />
        </ngts-environment>

        <ngtp-effect-composer [options]="{ enableNormalPass: false }">
            <ngtp-n8ao [options]="{ aoRadius: 1, intensity: Math.PI * 2 }" />
            <ngtp-tilt-shift2 [options]="{ blur: 0.2 }" />
        </ngtp-effect-composer>
    `,
    imports: [NgtArgs, NgtsFloat, NgtsContactShadows, NgtsEnvironment, NgtsLightformer, RouterOutlet, ...],
})
export class RoutedScene {
    private router = inject(Router);
    protected currentRoute = toSignal(
        this.router.events.pipe(
            filter((ev): ev is NavigationEnd => ev instanceof NavigationEnd),
            map((ev) => ev.urlAfterRedirects.split('/routed').at(-1) as string),
        ),
        { initialValue: '/knot' },
    );

    constructor() {
        beforeRender(({ camera, pointer, delta }) => {
            easing.damp3(camera.position, [Math.sin(-pointer.x) * 5, pointer.y * 3.5, 15 + Math.cos(pointer.x) * 10], 0.2, delta);
            camera.lookAt(0, 0, 0);
        });
    }
}
```

Each routed component is a simple scene that renders inside the layout's `<router-outlet>`:

```angular-ts
const routes: Routes = [
    { path: 'knot', loadComponent: () => import('./knot') },
    { path: 'torus', loadComponent: () => import('./torus') },
    { path: 'bomb', loadComponent: () => import('./bomb') },
    { path: '', redirectTo: 'knot', pathMatch: 'full' },
];
```

### Pierced Props for Nested Properties

v4 introduces "pierced props" - dot notation for setting nested properties. This is particularly useful when you only need to modify **a single component** of a vector or access nested properties on complex objects.

```angular-html
<!-- When you only need to change ONE component -->
<ngt-mesh [position.y]="5" />

<!-- Instead of specifying the entire vector -->
<ngt-mesh [position]="[0, 5, 0]" />
```

Pierced props shine when working with shadow cameras on lights:

```angular-html
<ngt-directional-light
    [castShadow]="true"
    [shadow.mapSize.width]="2048"
    [shadow.mapSize.height]="2048"
    [shadow.camera.near]="0.5"
    [shadow.camera.far]="500"
    [shadow.camera.left]="-10"
    [shadow.camera.right]="10"
/>
```

Or when you need to set just one rotation axis:

```angular-html
<ngt-mesh [rotation.y]="Math.PI / 4" />
```

:::note
Pierced props are most useful when modifying a **single** nested property. If you're setting multiple components of the same vector (like `position.x` AND `position.y`), the array syntax `[position]="[x, y, z]"` is often cleaner.
:::

### New Element Lifecycle Events

v4 adds lifecycle events for THREE.js elements via the `NgtElementEvents` directive:

```angular-html
<ngt-mesh
    (created)="onCreated($event)"
    (attached)="onAttached($event)"
    (updated)="onUpdated($event)"
/>
```

| Event      | Description                                              |
| ---------- | -------------------------------------------------------- |
| `created`  | Element instantiated                                     |
| `attached` | Element attached to parent (provides `{ parent, node }`) |
| `updated`  | Element properties updated                               |

Additionally, Three.js native events are now exposed: `added`, `removed`, `childadded`, `childremoved`, `change`, `disposed`.

### Angular Resource API Integration

Angular's new [Resource API](https://angular.dev/guide/signals/resource) is perfect for asset loading. v4 embraces this with `loaderResource()` and specialized resource functions in Soba.

#### Core: `loaderResource()`

```angular-ts
import { loaderResource } from 'angular-three';
import { GLTFLoader } from 'three-stdlib';

@Component({
    template: `
        @if (model.value(); as gltf) {
            <ngt-primitive *args="[gltf.scene]" />
        }
    `,
})
export class ModelComponent {
    model = loaderResource(
        () => GLTFLoader,
        () => '/assets/model.gltf'
    );
}
```

#### Soba Resource Functions

For common use cases, Soba provides specialized resource functions. Here's a real example from the [Basic Soba demo](https://angularthree-demo-next.netlify.app/soba/basic) showing how to load a GLTF model with matcap textures:

```angular-ts
import { gltfResource } from 'angular-three-soba/loaders';
import { matcapTextureResource } from 'angular-three-soba/staging';

type BotGLTF = GLTF & {
    nodes: { 'Y-Bot': Object3D; YB_Body: SkinnedMesh; YB_Joints: SkinnedMesh; mixamorigHips: Bone };
    materials: { YB_Body: MeshStandardMaterial; YB_Joints: MeshStandardMaterial };
};

@Component({
    selector: 'app-bot',
    template: `
        @if (gltf.value(); as gltf) {
            <ngt-group [dispose]="null" [animations]="gltf" [referenceRef]="boneRef()">
                <ngt-group [rotation]="[Math.PI / 2, 0, 0]" [scale]="0.01">
                    <ngt-primitive #bone *args="[gltf.nodes.mixamorigHips]" />
                    <ngt-skinned-mesh [geometry]="gltf.nodes.YB_Body.geometry" [skeleton]="gltf.nodes.YB_Body.skeleton">
                        <ngt-mesh-matcap-material [matcap]="matcapBody.resource.value()" />
                    </ngt-skinned-mesh>
                    <ngt-skinned-mesh [geometry]="gltf.nodes.YB_Joints.geometry" [skeleton]="gltf.nodes.YB_Joints.skeleton">
                        <ngt-mesh-matcap-material [matcap]="matcapJoints.resource.value()" />
                    </ngt-skinned-mesh>
                </ngt-group>
            </ngt-group>
        }
    `,
})
export class Bot {
    protected gltf = gltfResource<BotGLTF>(() => './ybot.glb');
    protected matcapBody = matcapTextureResource(() => '293534_B2BFC5_738289_8A9AA7', {
        onLoad: (texture) => (texture.colorSpace = SRGBColorSpace),
    });
    protected matcapJoints = matcapTextureResource(() => '3A2412_A78B5F_705434_836C47', {
        onLoad: (texture) => (texture.colorSpace = SRGBColorSpace),
    });

    protected boneRef = viewChild<ElementRef<Bone>>('bone');
}
```

Other available resource functions:

```angular-ts
import { gltfResource, textureResource, fbxResource, fontResource } from 'angular-three-soba/loaders';
import { environmentResource } from 'angular-three-soba/staging';

// GLTF with automatic Draco/MeshOpt support
const gltf = gltfResource(() => '/model.glb', {
    useDraco: true,  // default
    useMeshOpt: true // default
});

// Bonus: Direct scene access
const scene = gltf.scene(); // THREE.Group

// Textures
const texture = textureResource(() => '/texture.jpg');

// FBX models
const fbx = fbxResource(() => '/model.fbx');

// Fonts for 3D text
const font = fontResource(() => '/font.json');

// Environment maps
const env = environmentResource(() => ({ files: '/hdr/env.hdr' }));
```

#### Static Methods

```angular-ts
// Preload assets
loaderResource.preload(GLTFLoader, '/model.gltf');

// Clear specific cache
loaderResource.clear('/model.gltf');

// Clear all cache
loaderResource.destroy();
```

### Function Renames: Dropping the `inject` Prefix

v4 simplifies function names by dropping the `inject` prefix:

| Before (deprecated)    | After                |
| ---------------------- | -------------------- |
| `injectBeforeRender()` | `beforeRender()`     |
| `injectLoader()`       | `loaderResource()`   |
| `injectFBO()`          | `fbo()`              |
| `injectDepthBuffer()`  | `depthBuffer()`      |
| `injectObjectEvents()` | `objectEvents()`     |
| `getLocalState()`      | `getInstanceState()` |

The old names still work but are deprecated and will be removed in v5.

#### `beforeRender()` Enhancement

Now accepts a Signal for dynamic priority:

```angular-ts
// Before - manual effect setup for dynamic priority
effect((onCleanup) => {
    const priority = this.priority();
    const sub = injectBeforeRender(cb, { priority, injector });
    onCleanup(() => sub());
});

// After - automatic handling
beforeRender(cb, { priority: this.priority }); // priority can be Signal
```

### Simplified Return Types

Some functions now return raw values instead of Signals for simpler usage:

#### `fbo()`

```angular-ts
// Before
const target: Signal<WebGLRenderTarget> = injectFBO();
target().texture; // had to call signal

// After
const target: WebGLRenderTarget = fbo();
target.texture; // direct access
```

#### `depthBuffer()`

```angular-ts
// Before
const depth: Signal<DepthTexture> = injectDepthBuffer();

// After
const depth: DepthTexture = depthBuffer();
```

#### Camera Content Template

```angular-html
<!-- Before: let-texture was Signal<Texture> -->
<ng-template cameraContent let-texture>
    {{ texture() }}
</ng-template>

<!-- After: let-texture is Texture directly -->
<ng-template cameraContent let-texture>
    {{ texture }}
</ng-template>
```

### New Signal Utilities

v4 adds helpful signal utilities:

```angular-ts
import { omit, pick, merge, vector2, vector3, vector4 } from 'angular-three';

// Omit keys from object signal
const rest = omit(options, ['camera', 'domElement']);

// Pick single key (returns value)
const camera = pick(options, 'camera'); // Signal<Camera>

// Pick multiple keys (returns partial object)
const subset = pick(options, 'camera', 'domElement'); // Signal<{camera, domElement}>

// Merge multiple signals
const merged = merge(signal1, signal2, signal3);

// Vector conversions from various input types
const v2 = vector2(input); // Signal<Vector2>
const v3 = vector3(input); // Signal<Vector3>
const v4 = vector4(input); // Signal<Vector4>
```

### Theatre.js Integration (NEW)

v4 introduces `angular-three-theatre` for complex, timeline-based animations with a visual editor:

```angular-ts
import {
    TheatreProject,
    TheatreSheet,
    TheatreSheetObject,
    TheatreStudio
} from 'angular-three-theatre';

@Component({
    imports: [TheatreProject, TheatreSheet, TheatreSheetObject, TheatreStudio],
    template: `
        <theatre-project name="my-animation" [config]="{ state }" studio>
            <ng-container sheet="Scene1" [sequence]="{ autoplay: true }">

                <ng-template sheetObject="Cube" let-values="values">
                    <theatre-transform>
                        <ngt-mesh>
                            <ngt-box-geometry />
                            <ngt-mesh-standard-material />
                        </ngt-mesh>
                    </theatre-transform>
                </ng-template>

            </ng-container>
        </theatre-project>
    `
})
export class AnimatedScene {}
```

#### Features

- **Visual Editor**: Add `studio` attribute for the Theatre.js editor
- **Sequence Control**: Play, pause, reset, and scrub animations
- **Property Sync**: Automatically sync Three.js properties with `[sync]` directive
- **Transformers**: Auto-convert colors, eulers, degrees, and more

### Tweakpane Integration (NEW)

v4 adds `angular-three-tweakpane` for debug UI controls. You can see it in action in the [Epoxy Resin demo](https://angularthree-demo-next.netlify.app/soba/epoxy-resin) and the [Basic Soba demo](https://angularthree-demo-next.netlify.app/soba/basic).

#### Real Example: Material Configuration

Here's how the Epoxy Resin demo uses Tweakpane to control a `MeshTransmissionMaterial`:

```angular-ts
@Component({
    selector: 'app-tweaks',
    template: `
        <tweakpane-pane title="Epoxy Resin" left="8px">
            <tweakpane-text [(value)]="text" label="text" />
            <tweakpane-color [(value)]="shadow" label="Shadow Color" />
            <tweakpane-checkbox [(value)]="autoRotate" label="Auto Rotate" />
            <tweakpane-folder title="Text Material">
                <tweakpane-checkbox [(value)]="backside" label="Backside" />
                <tweakpane-number [(value)]="backsideThickness" label="Backside Thickness" [params]="{ min: 0, max: 2 }" />
                <tweakpane-number [(value)]="samples" label="Samples" [params]="{ min: 1, max: 32, step: 1 }" />
                <tweakpane-number [(value)]="transmission" label="Transmission" [params]="{ min: 0, max: 1 }" />
                <tweakpane-number [(value)]="thickness" label="Thickness" [params]="{ min: 0, max: 5 }" />
                <tweakpane-number [(value)]="chromaticAberration" label="Chromatic Aberration" [params]="{ min: 0, max: 5 }" />
                <tweakpane-color [(value)]="color" label="Color" />
            </tweakpane-folder>
        </tweakpane-pane>
    `,
    imports: [TweakpaneCheckbox, TweakpaneColor, TweakpaneNumber, TweakpaneFolder, TweakpaneText, TweakpanePane],
})
export class Tweaks {
    text = signal('Angular');
    shadow = signal('#750d57');
    autoRotate = signal(false);

    protected backside = signal(true);
    protected transmission = signal(1);
    protected thickness = signal(0.3);
    protected chromaticAberration = signal(5);
    protected color = signal('#ff9cf5');
    // ... more signals

    // Computed config object for the material
    materialConfig = computed(() => ({
        color: this.color(),
        transmission: this.transmission(),
        thickness: this.thickness(),
        chromaticAberration: this.chromaticAberration(),
        backside: this.backside(),
        // ... more properties
    }));
}
```

The scene graph then uses the tweaks component via template reference:

```angular-html
<ngts-text-3d [text]="tweaks.text()" [font]="fontGlyphs">
    <ngts-mesh-transmission-material [options]="tweaks.materialConfig()" />
</ngts-text-3d>

<app-tweaks #tweaks />
```

#### Programmatic Approach

For simpler cases, you can use the `tweaks()` function:

```angular-ts
import { tweaks } from 'angular-three-tweakpane';

const controls = tweaks('Physics', {
    gravity: { value: 9.8, min: 0, max: 20, step: 0.1 },
    debug: false,
    color: { value: '#ff0000', color: true },
    mode: { value: 'normal', options: ['normal', 'debug', 'perf'] },
    reset: { action: () => this.reset() },

    // Nested folder
    advanced: tweaks.folder('Advanced', {
        iterations: { value: 4, min: 1, max: 10 },
    }),
});

// Access as signals
const g = controls.gravity(); // number
const d = controls.debug();   // boolean
```

### New Soba Components

v4 adds several new components to Soba:

| Component             | Package      | Description                              |
| --------------------- | ------------ | ---------------------------------------- |
| `PointerLockControls` | controls     | First-person pointer lock                |
| `TrackballControls`   | controls     | Trackball camera controls                |
| `BVH`                 | performances | Bounding volume hierarchy for raycasting |
| `Cloud`               | staging      | Volumetric clouds                        |
| `Shadow`              | staging      | Shadow plane                             |
| `Sparkles`            | staging      | Particle sparkle effect                  |

### Rapier Physics Updates

#### New Attractor API

A new `angular-three-rapier/addons` entry point provides the Attractor API:

```angular-ts
import { NgtrAttractor } from 'angular-three-rapier/addons';
```

```angular-html
<!-- Simple attractor -->
<ngt-object3D attractor [position]="[0, 5, 0]" />

<!-- With options -->
<ngt-object3D
    [attractor]="{
        strength: 10,
        range: 20,
        type: 'newtonian',
        gravitationalConstant: 0.01
    }"
/>

<!-- Repeller (negative strength) -->
<ngt-object3D [attractor]="{ strength: -5, range: 15 }" />
```

Gravity types: `static`, `linear`, `newtonian`

#### Selector Changes

All `ngtr` prefixes removed from attribute selectors:

| Before                 | After              |
| ---------------------- | ------------------ |
| `[ngtrRigidBody]`      | `[rigidBody]`      |
| `[ngtrCuboidCollider]` | `[cuboidCollider]` |
| `[ngtrBallCollider]`   | `[ballCollider]`   |
| `[ngtrMeshCollider]`   | `[meshCollider]`   |
| ...                    | ...                |

### Plugin Generators

The `@angular-three/plugin` package provides helpful generators:

#### Initialize Angular Three

```bash
nx generate @angular-three/plugin:init
# or
ng generate @angular-three/plugin:init
```

This will:

1. Add dependencies (angular-three, three, @types/three, ngxtension)
2. Enable `skipLibCheck` in tsconfig
3. Add metadata JSON for IDE support
4. Add `provideNgtRenderer()` to your app config
5. Optionally generate a starter scene component

#### Generate Component from GLTF

```bash
nx generate @angular-three/plugin:gltf \
  --modelPath=assets/robot.glb \
  --output=src/app/robot \
  --draco \
  --shadows
```

#### Add Auxiliary Packages

```bash
nx generate @angular-three/plugin:aux
```

Interactive prompt to add: soba, rapier, cannon, postprocessing, tweakpane.

## Migration Guide

### Required Changes

#### 1. Add App-Level Renderer

```angular-ts
// app.config.ts
import { provideNgtRenderer } from 'angular-three/dom';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgtRenderer(),
        // ... other providers
    ],
};
```

#### 2. Update Canvas Usage

```diff lang="angular-html"
- <ngt-canvas [sceneGraph]="SceneGraph" />
+ <ngt-canvas>
+     <ng-template canvasContent>
+         <app-scene />
+     </ng-template>
+ </ngt-canvas>
```

Or with shorthand:

```angular-html
<ngt-canvas>
    <app-scene *canvasContent />
</ngt-canvas>
```

#### 3. Update Rapier Selectors

```diff lang="angular-html"
- <ngt-mesh [ngtrRigidBody]="'dynamic'">
-     <ngt-box-geometry [ngtrCuboidCollider]="[1, 1, 1]" />
- </ngt-mesh>
+ <ngt-mesh [rigidBody]="'dynamic'">
+     <ngt-box-geometry [cuboidCollider]="[1, 1, 1]" />
+ </ngt-mesh>
```

#### 4. Update Soba Scroll Selectors (if used)

| Before               | After                   |
| -------------------- | ----------------------- |
| `[ngtsScrollCanvas]` | `[canvasScrollContent]` |
| `[ngtsScrollHTML]`   | `[htmlScrollContent]`   |
| `[ngtsHTMLContent]`  | `[htmlContent]`         |

### Recommended Changes

#### 1. Update Function Names

```diff lang="angular-ts"
- injectBeforeRender((state, delta) => { ... });
- const gltf = injectLoader(GLTFLoader, '/model.glb');
- const target = injectFBO();
+ beforeRender((state, delta) => { ... });
+ const gltf = loaderResource(() => GLTFLoader, () => '/model.glb');
+ const target = fbo();
```

#### 2. Update FBO/DepthBuffer Usage

```diff lang="angular-ts"
// Before - was Signal
const target = injectFBO();
- target().texture;
+ target.texture; // direct access
```

#### 3. Update Camera Content Templates

```diff lang="angular-html"
<ng-template cameraContent let-texture>
-     <ngt-mesh-basic-material [map]="texture()" />
+     <ngt-mesh-basic-material [map]="texture" />
</ng-template>
```

#### 4. Use Resource API for Loading

```diff lang="angular-ts"
- const gltf = injectGLTF(() => '/model.glb');
+ const gltf = gltfResource(() => '/model.glb');
```

### Migration Checklist

**Required:**

- [ ] Add `provideNgtRenderer()` to app.config.ts
- [ ] Replace `[sceneGraph]="Component"` with `<ng-template canvasContent>`
- [ ] Update Rapier selectors: `[ngtrRigidBody]` -> `[rigidBody]`, etc.
- [ ] Update Soba scroll selectors if used

**Recommended:**

- [ ] Replace `injectBeforeRender` -> `beforeRender`
- [ ] Replace `injectLoader` -> `loaderResource` (or soba resources)
- [ ] Replace `injectFBO` -> `fbo`
- [ ] Replace `getLocalState` -> `getInstanceState`
- [ ] Update fbo/depthBuffer usage (no longer Signals)
- [ ] Update camera content template (let-texture is now direct value)

**New Features to Try:**

- [ ] Pierced props for shadow cameras: `[shadow.camera.near]="0.5"`
- [ ] Element events: `(created)`, `(attached)`, `(updated)`
- [ ] Resource API for asset loading
- [ ] Theatre.js for complex animations
- [ ] Tweakpane for debug UI

## Explore More Examples

Check out these live demos to see Angular Three v4 in action:

| Demo                                                                                               | Description                              |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [Stars](https://angularthree-demo-next.netlify.app/soba/stars)                                     | Starfield with camera controls           |
| [Epoxy Resin](https://angularthree-demo-next.netlify.app/soba/epoxy-resin)                         | MeshTransmissionMaterial with Tweakpane  |
| [Portal Shapes](https://angularthree-demo-next.netlify.app/soba/portal-shapes)                     | Portal rendering with MeshPortalMaterial |
| [Aquarium](https://angularthree-demo-next.netlify.app/soba/aquarium)                               | Underwater scene with caustics           |
| [Camera Scroll](https://angularthree-demo-next.netlify.app/soba/camera-scroll)                     | Scroll-driven camera animation           |
| [Routed Scenes](https://angularthree-demo-next.netlify.app/routed)                                 | Angular routing with 3D scenes           |
| [Instances](https://angularthree-demo-next.netlify.app/soba/instances)                             | Instanced rendering for performance      |
| [Inverted Stencil Buffer](https://angularthree-demo-next.netlify.app/soba/inverted-stencil-buffer) | Stencil buffer techniques                |

Full source code is available on [GitHub](https://github.com/angular-threejs/angular-three/tree/main/apps/examples/src/app).

## Acknowledgements

The journey to Angular Three v4 has been a collaborative effort:

- **The PMNDRS Ecosystem**: We owe a great deal to the [PMNDRS (Poimandres)](https://github.com/pmndrs) community and their various `@pmndrs` packages. Their innovative work in the 3D web space has been a constant source of inspiration.
- **The Angular Team**: We extend our sincere thanks to the Angular team for their continuous improvements to the framework, particularly the [Resource API](https://angular.dev/guide/signals/resource) and zoneless change detection.
- **The Wider Angular Community**: We're grateful to the entire Angular community for your support, enthusiasm, and patience throughout this development process.

## Conclusion

The development of Angular Three v4 has been a long journey, but we're excited to see what you can create with it. The app-level renderer unlocks new possibilities, the simplified APIs reduce boilerplate, and the new integrations with Theatre.js and Tweakpane make it easier than ever to create polished 3D experiences.

If you have any feedback or suggestions, please don't hesitate to reach out to us on [GitHub](https://github.com/angular-threejs/angular-three/issues).

Thank you for reading this blog post. We hope you found it informative and learned something new. Happy coding!
