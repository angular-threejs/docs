---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: fit
          type: boolean
          description: >-
              Fits the current view on first render. Default: false
        - name: clip
          type: boolean
          description: >-
              Sets the camera's near/far planes based on the bounding box. Default: false
        - name: observe
          type: boolean
          description: >-
              Triggers recalculation on window resize. Default: false
        - name: maxDuration
          type: number
          description: >-
              The animation length in seconds. Default: 1.0
        - name: margin
          type: number
          description: >-
              Margin factor applied to the calculated camera distance. Default: 1.2
        - name: interpolateFunc
          type: '(t: number) => number'
          description: >-
              Custom interpolation function for camera animation. Should be increasing in [0, 1]. Default: damping-based function
---

`NgtsBounds` is a port of [Drei's Bounds](https://drei.docs.pmnd.rs/staging/bounds) which calculates a boundary box around its children and provides methods to fit the camera to view them.

If you are using camera controls, make sure to pass them the `makeDefault` option for proper integration.

## Usage

### Basic Bounds

```angular-html
<ngts-bounds [options]="{ fit: true, clip: true, observe: true }">
  <ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material />
  </ngt-mesh>
</ngts-bounds>

<ngts-orbit-controls [options]="{ makeDefault: true }" />
```

### Fit Multiple Objects

```angular-html
<ngts-bounds [options]="{ fit: true, margin: 1.5 }">
  <ngt-mesh [position]="[-2, 0, 0]">
    <ngt-sphere-geometry />
    <ngt-mesh-standard-material color="red" />
  </ngt-mesh>

  <ngt-mesh [position]="[2, 0, 0]">
    <ngt-box-geometry />
    <ngt-mesh-standard-material color="blue" />
  </ngt-mesh>
</ngts-bounds>

<ngts-orbit-controls [options]="{ makeDefault: true }" />
```

### With GLTF Model

```angular-html
<ngts-bounds [options]="{ fit: true, clip: true, observe: true }">
  @if (gltf(); as gltf) {
    <ngt-primitive *args="[gltf.scene]" />
  }
</ngts-bounds>

<ngts-orbit-controls [options]="{ makeDefault: true }" />
```

### Custom Animation Duration

```angular-html
<ngts-bounds [options]="{ fit: true, maxDuration: 2.0, margin: 1.3 }">
  <app-model />
</ngts-bounds>
```

### Custom Interpolation Function

```angular-html
<ngts-bounds
  [options]="{
    fit: true,
    interpolateFunc: easeOutCubic
  }"
>
  <app-scene />
</ngts-bounds>
```

```angular-ts
// In component
easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
```

### Responsive Bounds

The `observe` option recalculates bounds when the window resizes:

```angular-html
<ngts-bounds [options]="{ fit: true, clip: true, observe: true }">
  <app-responsive-model />
</ngts-bounds>

<ngts-orbit-controls [options]="{ makeDefault: true }" />
```

## API

The `NgtsBounds` component exposes a `boundsApi` that can be accessed via the `bounds` output or via dependency injection:

```angular-ts
@Component({
  template: `
    <ngts-bounds (bounds)="onBoundsReady($event)">
      <app-model />
    </ngts-bounds>
  `,
})
export class Scene {
  onBoundsReady(api: BoundsApi) {
    // Programmatically refresh bounds
    api.refresh();

    // Fit to specific object
    api.refresh(someObject3D).fit();

    // Get current bounds
    const box = api.getSize();
  }
}
```

## Notes

- Use `makeDefault: true` on your camera controls for proper bounds integration
- The `margin` option adds extra space around the fitted view (1.0 = exact fit, 1.2 = 20% margin)
- The `clip` option is useful for preventing near/far clipping issues with the camera
- For animated content, you may want to disable `fit` and call the API manually
