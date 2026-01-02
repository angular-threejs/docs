---
options:
    properties:
        - name: background
          type: boolean
          description: >-
              Whether to use the environment map as the scene background. Default: false
        - name: files
          type: 'string | string[]'
          description: >-
              Array of cubemap files OR single equirectangular file path.
        - name: path
          type: string
          description: >-
              Base path to the cubemap files OR single equirectangular file.
        - name: preset
          type: string
          description: >-
              One of the available presets: 'apartment', 'city', 'dawn', 'forest', 'lobby', 'night', 'park', 'studio', 'sunset', 'warehouse'.
        - name: scene
          type: THREE.Scene
          description: >-
              Custom scene to apply the environment map to.
        - name: map
          type: THREE.Texture
          description: >-
              Pre-loaded texture to use as environment map.
        - name: blur
          type: number
          description: >-
              Background blur amount (deprecated, use backgroundBlurriness). Default: 0
        - name: backgroundBlurriness
          type: number
          description: >-
              Background blur amount (0 to 1). Default: 0
        - name: backgroundIntensity
          type: number
          description: >-
              Intensity of the background. Default: 1
        - name: backgroundRotation
          type: '[number, number, number]'
          description: >-
              Rotation of the background as Euler angles. Default: [0, 0, 0]
        - name: environmentIntensity
          type: number
          description: >-
              Intensity of the environment lighting. Default: 1
        - name: environmentRotation
          type: '[number, number, number]'
          description: >-
              Rotation of the environment lighting as Euler angles. Default: [0, 0, 0]
        - name: ground
          type: 'boolean | { height?: number; radius?: number; scale?: number }'
          description: >-
              Configuration for ground-projected environment.
        - name: frames
          type: number
          description: >-
              Number of frames to render the environment cube camera. Default: 1
        - name: near
          type: number
          description: >-
              Near clipping plane for the cube camera. Default: 1
        - name: far
          type: number
          description: >-
              Far clipping plane for the cube camera. Default: 1000
        - name: resolution
          type: number
          description: >-
              Resolution of the cube render target. Default: 256
---

`NgtsEnvironment` is a port of [Drei's Environment](https://drei.docs.pmnd.rs/staging/environment) which sets up a global cubemap affecting the default `scene.environment` and optionally `scene.background`.

## Available Presets

Presets link to common HDRI Haven assets hosted on GitHub CDN:

| Preset      | HDRI File                 |
| ----------- | ------------------------- |
| `apartment` | lebombo_1k.hdr            |
| `city`      | potsdamer_platz_1k.hdr    |
| `dawn`      | kiara_1_dawn_1k.hdr       |
| `forest`    | forest_slope_1k.hdr       |
| `lobby`     | st_fagans_interior_1k.hdr |
| `night`     | dikhololo_night_1k.hdr    |
| `park`      | rooitou_park_1k.hdr       |
| `studio`    | studio_small_03_1k.hdr    |
| `sunset`    | venice_sunset_1k.hdr      |
| `warehouse` | empty_warehouse_01_1k.hdr |

> **Note:** Presets are not meant for production environments as they rely on CDNs.

## Usage

### Using a Preset

```angular-html
<ngts-environment [options]="{ preset: 'city' }" />
```

### With Background

```angular-html
<ngts-environment [options]="{ preset: 'sunset', background: true }" />
```

### Blurred Background

```angular-html
<ngts-environment
  [options]="{
    preset: 'forest',
    background: true,
    backgroundBlurriness: 0.5,
    backgroundIntensity: 0.8
  }"
/>
```

### Custom Environment File

```angular-html
<ngts-environment
  [options]="{
    files: 'path/to/environment.hdr',
    background: true
  }"
/>
```

### Custom Rendered Environment

Render custom content into an environment map using a cube camera:

```angular-html
<ngts-environment [options]="{ background: true }">
  <ng-template>
    <ngt-mesh>
      <ngt-sphere-geometry *args="[10]" />
      <ngt-mesh-basic-material [side]="BackSide" color="skyblue" />
    </ngt-mesh>
  </ng-template>
</ngts-environment>
```

### Ground Projection

Project the environment map onto the ground for more realistic scene integration:

```angular-html
<ngts-environment [options]="{ preset: 'park', ground: true }" />
```

With custom ground options:

```angular-html
<ngts-environment
  [options]="{
    preset: 'warehouse',
    ground: {
      height: 15,
      radius: 60,
      scale: 1000
    }
  }"
/>
```

### Adjusted Lighting Intensity

```angular-html
<ngts-environment
  [options]="{
    preset: 'studio',
    environmentIntensity: 0.5,
    environmentRotation: [0, Math.PI / 2, 0]
  }"
/>
```
