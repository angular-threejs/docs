---
inputs:
    - name: envMap
      type: THREE.CubeTexture | THREE.Texture
      required: true
      description: >-
          The environment map used for refraction. Required for the material to work.
    - name: attach
      type: string
      default: "'material'"
      description: >-
          How to attach the material to its parent object.
options:
    properties:
        - name: bounces
          type: number
          default: '2'
          description: >-
              The number of ray-cast bounces for light simulation.
        - name: ior
          type: number
          default: '2.4'
          description: >-
              The refraction index. Diamond is 2.4, glass is 1.5, water is 1.33.
        - name: fresnel
          type: number
          default: '0'
          description: >-
              The Fresnel effect intensity (strip light reflections).
        - name: aberrationStrength
          type: number
          default: '0'
          description: >-
              The RGB chromatic aberration shift intensity.
        - name: color
          type: THREE.ColorRepresentation
          default: "'white'"
          description: >-
              The color of the material.
        - name: fastChroma
          type: boolean
          default: 'true'
          description: >-
              Whether to use fewer ray casts for the RGB shift, sacrificing physical accuracy for performance.
---

`NgtsMeshRefractionMaterial` is a port of [Drei's MeshRefractionMaterial](https://drei.docs.pmnd.rs/shaders/mesh-refraction-material) that simulates realistic light refraction through transparent objects. It uses ray tracing with BVH acceleration for accurate light bending effects, making it ideal for diamonds, crystals, glass, and other transparent materials.

### Peer Dependencies

Requires `three-mesh-bvh`:

```bash
npm install three-mesh-bvh
```

### Usage

```angular-ts
import { NgtsMeshRefractionMaterial } from 'angular-three-soba/materials';
```

If you want the material to reflect other objects in the scene, pair it with `NgtsCubeCamera`:

```angular-html
<ngts-cube-camera>
    <ngt-mesh *cameraContent="let texture">
        <ngt-dodecahedron-geometry />
        <ngts-mesh-refraction-material [envMap]="texture()" />
    </ngt-mesh>
</ngts-cube-camera>
```

Otherwise, just pass an environment map directly:

```angular-html
<!-- texture = loaderResource(() => RGBELoader, () => 'path/to/texture.hdr') -->
<ngt-mesh>
    <ngt-dodecahedron-geometry />
    <ngts-mesh-refraction-material [envMap]="texture()" />
</ngt-mesh>
```

### Diamond Example

```angular-ts
@Component({
    template: `
        <ngts-cube-camera [options]="{ resolution: 256, frames: 1 }">
            <ngt-mesh *cameraContent="let texture">
                <ngt-dodecahedron-geometry />
                <ngts-mesh-refraction-material
                    [envMap]="texture()"
                    [options]="{
                        bounces: 3,
                        ior: 2.4,
                        fresnel: 1,
                        aberrationStrength: 0.02,
                        color: 'white'
                    }"
                />
            </ngt-mesh>
        </ngts-cube-camera>
    `
})
export class Diamond {}
```

### Common IOR Values

| Material | IOR  |
| -------- | ---- |
| Air      | 1.0  |
| Water    | 1.33 |
| Glass    | 1.5  |
| Crystal  | 2.0  |
| Diamond  | 2.4  |

Higher `bounces` values produce more accurate refractions but require more computation. For most cases, 2-3 bounces provide a good balance between quality and performance.
