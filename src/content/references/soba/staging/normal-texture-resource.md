---
credits:
    text: Normal Maps Repository
    link: https://github.com/emmelleppi/normal-maps
arguments:
    - name: id
      type: '() => string | number'
      description: >-
          Signal containing the normal map ID (index or name from the repository). Default: () => 0
      required: false
    - name: options.settings
      type: '() => { repeat?: number[]; anisotropy?: number; offset?: number[] }'
      description: >-
          Signal containing texture settings for repeat, anisotropy, and offset.
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
            description: Signal containing the resolved normal texture URL.
          - name: resource
            type: ResourceRef<THREE.Texture>
            description: Resource reference for the loaded texture.
          - name: numTot
            type: Signal<number>
            description: Signal containing the total number of available normal maps.
---

`normalTextureResource` and `NgtsNormalTexture` are ports of [Drei's useNormalTexture](https://drei.docs.pmnd.rs/staging/use-normal-texture) which load normal map textures from a repository of pre-made surface details.

Normal maps add surface detail and depth to materials without additional geometry, creating the illusion of bumps, scratches, and other surface imperfections.

> **Note:** `normalTextureResource` is not meant for production environments as it relies on third-party CDN.

## Usage

### Using normalTextureResource

```typescript
import { normalTextureResource } from 'angular-three-soba/staging';

@Component({
	template: `
		@if (normalMap.resource.hasValue()) {
			<ngt-mesh>
				<ngt-sphere-geometry *args="[1, 64, 64]" />
				<ngt-mesh-standard-material [normalMap]="normalMap.resource.value()" />
			</ngt-mesh>
		}
	`,
})
export class NormalMapDemo {
	normalMap = normalTextureResource(() => 42);
}
```

### With Texture Settings

```typescript
normalMap = normalTextureResource(() => 15, {
	settings: () => ({
		repeat: [4, 4],
		anisotropy: 16,
		offset: [0, 0],
	}),
});
```

### Dynamic Normal Map Selection

```typescript
@Component({
	template: `
		@if (normalMap.resource.hasValue()) {
			<ngt-mesh>
				<ngt-plane-geometry *args="[5, 5, 32, 32]" />
				<ngt-mesh-standard-material [normalMap]="normalMap.resource.value()" [normalScale]="[1, 1]" />
			</ngt-mesh>
		}
		<p>Available normal maps: {{ normalMap.numTot() }}</p>
	`,
})
export class DynamicNormalDemo {
	selectedId = signal(0);

	normalMap = normalTextureResource(this.selectedId);

	nextNormalMap() {
		this.selectedId.update((id) => (id + 1) % this.normalMap.numTot());
	}
}
```

### Using NgtsNormalTexture Directive

The structural directive provides a declarative approach:

```angular-html
<ng-template [normalTexture]="{ id: 42, repeat: [2, 2] }" let-resource>
  @if (resource.hasValue()) {
    <ngt-mesh>
      <ngt-box-geometry />
      <ngt-mesh-standard-material
        [normalMap]="resource.value()"
        [normalScale]="[0.5, 0.5]"
      />
    </ngt-mesh>
  }
</ng-template>
```

### With onLoad Callback

```typescript
normalMap = normalTextureResource(() => 100, {
	settings: () => ({ repeat: [2, 2] }),
	onLoad: (texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		console.log('Normal map loaded:', texture);
	},
});
```

### Combining with Other Material Properties

```angular-html
@if (normalMap.resource.hasValue()) {
  <ngt-mesh>
    <ngt-sphere-geometry *args="[1, 128, 128]" />
    <ngt-mesh-standard-material
      color="#888888"
      [metalness]="0.9"
      [roughness]="0.2"
      [normalMap]="normalMap.resource.value()"
      [normalScale]="[0.8, 0.8]"
    />
  </ngt-mesh>
}
```

### Tiled Normal Maps for Floors/Walls

```typescript
floorNormal = normalTextureResource(() => 'concrete', {
	settings: () => ({
		repeat: [10, 10],
		anisotropy: 16,
	}),
	onLoad: (texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
	},
});
```

## Settings Options

| Setting      | Type     | Description                             |
| ------------ | -------- | --------------------------------------- |
| `repeat`     | `[x, y]` | How many times to tile the texture      |
| `anisotropy` | `number` | Anisotropic filtering level for quality |
| `offset`     | `[x, y]` | UV offset for texture positioning       |

## Notes

- Normal maps work best with `MeshStandardMaterial` or `MeshPhysicalMaterial`
- Use `normalScale` on the material to control the intensity of the effect
- Higher repeat values create finer detail patterns
- Anisotropic filtering improves quality at oblique angles
- The repository contains various surface types (fabric, metal, stone, etc.)
