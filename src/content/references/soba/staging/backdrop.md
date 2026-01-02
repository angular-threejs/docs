---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: floor
          type: number
          description: >-
              Stretches the floor segment. Default: 0.25
        - name: segments
          type: number
          description: >-
              Mesh resolution (number of segments). Default: 20
        - name: receiveShadow
          type: boolean
          description: >-
              Whether the backdrop should receive shadows.
---

`NgtsBackdrop` is a port of [Drei's Backdrop](https://drei.docs.pmnd.rs/staging/backdrop) which creates a curved plane, like a studio backdrop.

This is for presentational purposes, to break up light and shadows more interestingly in product visualization or artistic scenes.

## Usage

### Basic Backdrop

```angular-html
<ngts-backdrop [options]="{ floor: 0.25, segments: 20 }">
  <ngt-mesh-standard-material color="#353540" />
</ngts-backdrop>
```

### With Product Model

```angular-html
<ngts-backdrop
  [options]="{ floor: 0.25, segments: 20, receiveShadow: true }"
  [scale]="[10, 5, 5]"
>
  <ngt-mesh-standard-material color="#f0f0f0" />
</ngts-backdrop>

<app-product-model [position]="[0, 0, 0]" />

<ngt-directional-light [position]="[5, 5, 5]" [castShadow]="true" />
```

### Extended Floor

```angular-html
<ngts-backdrop
  [options]="{ floor: 0.5, segments: 30 }"
  [scale]="[15, 8, 8]"
>
  <ngt-mesh-standard-material color="#2a2a2a" />
</ngts-backdrop>
```

### High Resolution

```angular-html
<ngts-backdrop [options]="{ floor: 0.25, segments: 50 }">
  <ngt-mesh-standard-material color="#404040" />
</ngts-backdrop>
```

### With Shadows

```angular-html
<ngts-backdrop
  [options]="{ receiveShadow: true, floor: 0.25 }"
  [scale]="[12, 6, 6]"
>
  <ngt-mesh-standard-material color="#e0e0e0" />
</ngts-backdrop>

<ngt-mesh [position]="[0, 1, 0]" [castShadow]="true">
  <ngt-sphere-geometry />
  <ngt-mesh-standard-material color="hotpink" />
</ngt-mesh>

<ngt-directional-light
  [position]="[10, 10, 5]"
  [castShadow]="true"
  [intensity]="1.5"
/>
```

### Colored Backdrop

```angular-html
<ngts-backdrop [options]="{ floor: 0.3 }" [scale]="[10, 5, 5]">
  <ngt-mesh-standard-material color="#1a1a2e" />
</ngts-backdrop>
```

### With Gradient Material

```angular-html
<ngts-backdrop [options]="{ floor: 0.25 }" [scale]="[10, 5, 5]">
  <ngt-shader-material
    [vertexShader]="vertexShader"
    [fragmentShader]="fragmentShader"
  />
</ngts-backdrop>
```

### Studio Setup

```angular-html
<!-- Backdrop -->
<ngts-backdrop
  [options]="{ receiveShadow: true, floor: 0.25 }"
  [scale]="[20, 10, 10]"
  [position]="[0, -0.5, -5]"
>
  <ngt-mesh-standard-material color="#fafafa" />
</ngts-backdrop>

<!-- Product -->
<app-product />

<!-- Lighting -->
<ngt-ambient-light [intensity]="0.5" />
<ngt-spot-light
  [position]="[10, 10, 10]"
  [angle]="0.3"
  [castShadow]="true"
/>
<ngt-spot-light
  [position]="[-10, 10, 10]"
  [angle]="0.3"
  [intensity]="0.5"
/>
```

### With Environment

```angular-html
<ngts-environment [options]="{ preset: 'studio' }" />

<ngts-backdrop
  [options]="{ receiveShadow: true, floor: 0.3 }"
  [scale]="[15, 8, 8]"
>
  <ngt-mesh-standard-material
    color="white"
    [roughness]="0.8"
    [metalness]="0"
  />
</ngts-backdrop>

<app-model />
```

## Notes

- The backdrop creates a curved surface transitioning from wall to floor
- `floor` controls how far the floor extends (0 = no floor, 1 = full extension)
- `segments` affects smoothness of the curve (higher = smoother but more geometry)
- Materials are passed as children and applied to the backdrop mesh
- Position and scale the backdrop to fit your scene requirements
- Combine with shadows for realistic grounding of objects
- Works well with `NgtsStage` or custom lighting setups
