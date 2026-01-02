---
credits:
    text: Matcap Repository
    link: https://github.com/emmelleppi/matcaps
arguments:
    - name: id
      type: '() => number | string'
      description: >-
          Signal containing the matcap ID (index or name from the repository). Default: () => 0
      required: false
    - name: options.format
      type: '() => number'
      description: >-
          Signal containing texture resolution: 64, 128, 256, 512, or 1024. Default: 1024
      required: false
    - name: options.onLoad
      type: '(texture: THREE.Texture) => void'
      description: >-
          Callback when texture loads successfully.
      required: false
    - name: options.injector
      type: Injector
      description: >-
          Optional injector for dependency injection context.
      required: false
returns:
    - type: object
      description: An object containing texture loading state and utilities.
      properties:
          - name: url
            type: Signal<string>
            description: Signal containing the resolved matcap texture URL.
          - name: resource
            type: ResourceRef<THREE.Texture>
            description: Resource reference for the loaded texture.
          - name: numTot
            type: Signal<number>
            description: Signal containing the total number of available matcaps.
---

`matcapTextureResource` and `NgtsMatcapTexture` are ports of [Drei's useMatcapTexture](https://drei.docs.pmnd.rs/staging/use-matcap-texture) which load matcap textures from a repository of pre-made materials.

Matcaps (Material Captures) provide realistic lighting without actual lights in the scene by encoding lighting information directly into the texture.

> **Note:** `matcapTextureResource` is not meant for production environments as it relies on third-party CDN.

## Usage

### Using matcapTextureResource

```typescript
import { matcapTextureResource } from 'angular-three-soba/staging';

@Component({
	template: `
		@if (matcap.resource.hasValue()) {
			<ngt-mesh>
				<ngt-sphere-geometry />
				<ngt-mesh-matcap-material [matcap]="matcap.resource.value()" />
			</ngt-mesh>
		}
	`,
})
export class MatcapDemo {
	matcap = matcapTextureResource(
		() => 42, // matcap ID
		{ format: () => 512 },
	);
}
```

### Using String ID

```typescript
matcap = matcapTextureResource(() => '3E2335_D36A1B_8E4A2E_2842A5');
```

### Dynamic Matcap Selection

```typescript
@Component({
	template: `
		@if (matcap.resource.hasValue()) {
			<ngt-mesh>
				<ngt-torus-geometry *args="[1, 0.4, 16, 32]" />
				<ngt-mesh-matcap-material [matcap]="matcap.resource.value()" />
			</ngt-mesh>
		}
		<p>Total matcaps available: {{ matcap.numTot() }}</p>
	`,
})
export class DynamicMatcapDemo {
	selectedId = signal(0);

	matcap = matcapTextureResource(this.selectedId, { format: () => 1024 });

	nextMatcap() {
		this.selectedId.update((id) => (id + 1) % this.matcap.numTot());
	}
}
```

### Using NgtsMatcapTexture Directive

The structural directive provides a more declarative approach:

```angular-html
<ng-template [matcapTexture]="{ id: 42, format: 512 }" let-resource>
  @if (resource.hasValue()) {
    <ngt-mesh>
      <ngt-sphere-geometry />
      <ngt-mesh-matcap-material [matcap]="resource.value()" />
    </ngt-mesh>
  }
</ng-template>
```

### With onLoad Callback

```typescript
matcap = matcapTextureResource(() => 100, {
	format: () => 256,
	onLoad: (texture) => {
		console.log('Matcap loaded:', texture);
		texture.colorSpace = THREE.SRGBColorSpace;
	},
});
```

## Available Formats

| Format | Resolution | Use Case           |
| ------ | ---------- | ------------------ |
| 64     | 64x64      | Low quality, fast  |
| 128    | 128x128    | Preview quality    |
| 256    | 256x256    | Mobile/performance |
| 512    | 512x512    | Standard quality   |
| 1024   | 1024x1024  | High quality       |

## Notes

- The matcap repository contains hundreds of pre-made material captures
- Use `numTot` signal to know the total available matcaps
- Higher format numbers provide better quality but larger file sizes
- Matcaps work best for stylized, non-photorealistic rendering
