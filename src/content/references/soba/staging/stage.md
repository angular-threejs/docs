---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: preset
          type: "'rembrandt' | 'portrait' | 'upfront' | 'soft' | NgtsStageLightingOptions"
          description: >-
              Lighting preset or custom lighting configuration. Default: 'rembrandt'
        - name: shadows
          type: "false | 'contact' | 'accumulative' | NgtsStageShadowsOptions"
          description: >-
              Shadow type configuration. Default: 'contact'
        - name: adjustCamera
          type: boolean
          description: >-
              Whether to automatically adjust the camera to fit the content. Default: true
        - name: environment
          type: 'string | NgtsEnvironmentOptions | null'
          description: >-
              Environment map configuration: preset name, options object, or null. Default: 'city'
        - name: intensity
          type: number
          description: >-
              Overall lighting intensity multiplier. Default: 0.5
        - name: center
          type: NgtsCenterOptions
          description: >-
              Options for centering the content within the stage.
---

`NgtsStage` is a port of [Drei's Stage](https://drei.docs.pmnd.rs/staging/stage) which provides a complete stage setup for presenting 3D models with lighting, shadows, and environment.

Automatically centers content, sets up professional lighting presets, and configures shadows.

## Usage

### Basic Stage

```angular-html
<ngts-stage>
  <ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material color="orange" />
  </ngt-mesh>
</ngts-stage>
```

### With Lighting Preset

```angular-html
<ngts-stage [options]="{ preset: 'rembrandt' }">
  <app-model />
</ngts-stage>
```

Available presets:

- `rembrandt` - Classic Rembrandt lighting (default)
- `portrait` - Portrait photography lighting
- `upfront` - Front-facing even lighting
- `soft` - Soft, diffused lighting

### Contact Shadows

```angular-html
<ngts-stage [options]="{ shadows: 'contact', preset: 'portrait' }">
  <app-model />
</ngts-stage>
```

### Accumulative Shadows

```angular-html
<ngts-stage [options]="{ shadows: 'accumulative', preset: 'soft' }">
  <app-model />
</ngts-stage>
```

### No Shadows

```angular-html
<ngts-stage [options]="{ shadows: false }">
  <app-model />
</ngts-stage>
```

### Custom Environment

```angular-html
<ngts-stage [options]="{ environment: 'sunset', preset: 'rembrandt' }">
  <app-model />
</ngts-stage>
```

### No Environment

```angular-html
<ngts-stage [options]="{ environment: null }">
  <ngt-ambient-light [intensity]="0.5" />
  <app-model />
</ngts-stage>
```

### Adjusted Intensity

```angular-html
<ngts-stage [options]="{ intensity: 1, preset: 'upfront' }">
  <app-model />
</ngts-stage>
```

### Manual Camera Control

Disable automatic camera adjustment:

```angular-html
<ngts-stage [options]="{ adjustCamera: false }">
  <app-model />
</ngts-stage>

<ngts-orbit-controls />
```

### Custom Shadow Options

```angular-html
<ngts-stage
  [options]="{
    shadows: {
      type: 'contact',
      opacity: 0.8,
      blur: 2,
      far: 10
    }
  }"
>
  <app-model />
</ngts-stage>
```

### With Center Options

```angular-html
<ngts-stage [options]="{ center: { top: true } }">
  <app-model />
</ngts-stage>
```

### Product Showcase

```angular-html
<ngts-stage
  [options]="{
    preset: 'portrait',
    environment: 'studio',
    shadows: 'contact',
    intensity: 0.8
  }"
>
  @if (productGltf(); as gltf) {
    <ngt-primitive *args="[gltf.scene]" />
  }
</ngts-stage>

<ngts-orbit-controls [options]="{ enableZoom: false, autoRotate: true }" />
```

## Lighting Presets

| Preset      | Description                                     |
| ----------- | ----------------------------------------------- |
| `rembrandt` | Classic dramatic lighting with strong shadows   |
| `portrait`  | Flattering front-side lighting for subjects     |
| `upfront`   | Even, front-facing lighting with minimal shadow |
| `soft`      | Diffused, ambient-like lighting                 |

## Notes

- Stage automatically centers its children using `NgtsCenter`
- The `adjustCamera` option uses `NgtsBounds` to fit the camera
- Environment maps are applied using `NgtsEnvironment`
- Shadows can be either `NgtsContactShadows` or `NgtsAccumulativeShadows`
- Use camera controls with `makeDefault: true` for proper bounds integration
- The `intensity` option multiplies the lighting intensity of the preset
