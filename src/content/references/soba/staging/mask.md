---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: colorWrite
          type: boolean
          description: >-
              Whether to write color to the framebuffer. Default: false
        - name: depthWrite
          type: boolean
          description: >-
              Whether to write depth to the depth buffer. Default: false
inputs:
    - name: id
      type: number
      description: >-
          The stencil reference ID used for masking. Default: 1
      required: false
---

`NgtsMask` and `mask()` are ports of [Drei's Mask](https://drei.docs.pmnd.rs/staging/mask) which create stencil masks for selective rendering. Objects can be shown or hidden based on mask boundaries.

## Components and Functions

### NgtsMask

Creates a stencil mask shape. Content geometry is placed as children.

### mask() Function

Creates stencil material properties to apply to materials that should respect mask boundaries.

```typescript
function mask(
	id: () => number,
	inverse: () => boolean = () => false,
): Signal<{
	stencilWrite: boolean;
	stencilRef: number;
	stencilFunc: THREE.StencilFunc;
	stencilFail: THREE.StencilOp;
	stencilZFail: THREE.StencilOp;
	stencilZPass: THREE.StencilOp;
}>;
```

## Usage

### Basic Mask Setup

```angular-html
<!-- Define the mask shape -->
<ngts-mask [id]="1">
  <ngt-circle-geometry *args="[0.5, 64]" />
</ngts-mask>

<!-- Object that respects the mask -->
<ngt-mesh [material]="maskedMaterial">
  <ngt-box-geometry />
</ngt-mesh>
```

```typescript
import { mask } from 'angular-three-soba/staging';

@Component({...})
export class MaskDemo {
  // Material that only renders inside the mask
  maskedMaterial = new THREE.MeshStandardMaterial({
    color: 'orange',
    ...mask(() => 1)()
  });
}
```

### Inverted Mask (Render Outside)

```typescript
// Material that only renders OUTSIDE the mask
outsideMaterial = new THREE.MeshStandardMaterial({
	color: 'blue',
	...mask(
		() => 1,
		() => true,
	)(),
});
```

### Multiple Masks with Different IDs

```angular-html
<!-- First mask -->
<ngts-mask [id]="1" [options]="{ position: [-2, 0, 0] }">
  <ngt-circle-geometry *args="[1, 32]" />
</ngts-mask>

<!-- Second mask -->
<ngts-mask [id]="2" [options]="{ position: [2, 0, 0] }">
  <ngt-ring-geometry *args="[0.5, 1, 32]" />
</ngts-mask>

<!-- Object visible only in first mask -->
<ngt-mesh [material]="mask1Material" [position]="[-2, 0, 0]">
  <ngt-box-geometry />
</ngt-mesh>

<!-- Object visible only in second mask -->
<ngt-mesh [material]="mask2Material" [position]="[2, 0, 0]">
  <ngt-sphere-geometry />
</ngt-mesh>
```

```typescript
mask1Material = new THREE.MeshStandardMaterial({
	color: 'red',
	...mask(() => 1)(),
});

mask2Material = new THREE.MeshStandardMaterial({
	color: 'green',
	...mask(() => 2)(),
});
```

### Dynamic Mask ID with Signals

```typescript
maskId = signal(1);

dynamicMaterial = computed(
	() =>
		new THREE.MeshStandardMaterial({
			color: 'purple',
			...mask(this.maskId)(),
		}),
);
```

### Custom Mask Shape

```angular-html
<ngts-mask [id]="1">
  <ngt-shape-geometry *args="[heartShape]" />
</ngts-mask>
```

### Portal Window Effect

Create a "window" that reveals a different scene:

```angular-html
<!-- The window frame (mask) -->
<ngts-mask [id]="1" [options]="{ position: [0, 1.5, 0] }">
  <ngt-plane-geometry *args="[2, 3]" />
</ngts-mask>

<!-- Content visible through the window -->
<ngt-group>
  <ngt-mesh [material]="portalMaterial" [position]="[0, 1.5, -2]">
    <ngt-sphere-geometry />
  </ngt-mesh>

  <ngts-stars [material]="portalMaterial" />
</ngt-group>
```

## Notes

- Masks use WebGL stencil buffer for selective rendering
- Each unique mask ID creates an independent masking region
- The `inverse` parameter in `mask()` flips the visibility behavior
- Mask shapes can be any geometry (circle, plane, custom shapes, etc.)
- Multiple objects can share the same mask ID
