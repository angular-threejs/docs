---
options:
    extends:
        - name: THREE.MeshPhysicalMaterial
          link: https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial
    properties:
        - name: speed
          type: number
          default: '1'
          description: >-
              Animation speed multiplier for the distortion.
        - name: factor
          type: number
          description: >-
              Distortion intensity factor.
---

`NgtsMeshDistortMaterial` is a port of [Drei's MeshDistortMaterial](https://drei.docs.pmnd.rs/shaders/mesh-distort-material) that applies animated noise-based distortion to mesh surfaces. It extends `THREE.MeshPhysicalMaterial` with vertex displacement using simplex noise.

### Usage

```angular-ts
import { NgtsMeshDistortMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-mesh>
    <ngt-sphere-geometry />
    <ngts-mesh-distort-material [options]="{ speed: 2, factor: 0.5, color: 'hotpink' }" />
</ngt-mesh>
```

### Advanced Example

```angular-ts
@Component({
    template: `
        <ngt-mesh>
            <ngt-icosahedron-geometry *args="[1, 4]" />
            <ngts-mesh-distort-material
                [options]="{
                    speed: 5,
                    factor: 0.8,
                    color: '#ff6b6b',
                    roughness: 0,
                    metalness: 0.8,
                    clearcoat: 1
                }"
            />
        </ngt-mesh>
    `
})
export class DistortedSphere {}
```

The distortion effect works best with geometries that have enough vertices for smooth deformation, such as spheres or icosahedrons with higher subdivisions.
