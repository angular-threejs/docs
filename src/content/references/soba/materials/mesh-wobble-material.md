---
options:
    extends:
        - name: THREE.MeshStandardMaterial
          link: https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial
    properties:
        - name: speed
          type: number
          default: '1'
          description: >-
              Animation speed multiplier for the wobble.
        - name: factor
          type: number
          description: >-
              The strength of the wobble effect.
---

`NgtsMeshWobbleMaterial` is a port of [Drei's MeshWobbleMaterial](https://drei.docs.pmnd.rs/shaders/mesh-wobble-material) that applies animated sine-wave wobble distortion to mesh surfaces. It extends `THREE.MeshStandardMaterial` with vertex displacement for organic, jelly-like motion.

### Usage

```angular-ts
import { NgtsMeshWobbleMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-mesh>
    <ngt-torus-geometry />
    <ngts-mesh-wobble-material [options]="{ speed: 2, factor: 0.6, color: 'cyan' }" />
</ngt-mesh>
```

### Jelly Cube Example

```angular-ts
@Component({
    template: `
        <ngt-mesh>
            <ngt-box-geometry *args="[1, 1, 1, 10, 10, 10]" />
            <ngts-mesh-wobble-material
                [options]="{
                    speed: 1.5,
                    factor: 0.4,
                    color: '#ff69b4',
                    roughness: 0,
                    metalness: 0.1
                }"
            />
        </ngt-mesh>
    `
})
export class JellyCube {}
```

### Tips

- The wobble effect works best with geometries that have enough vertices for smooth deformation
- Use higher segment counts in your geometry (e.g., `BoxGeometry(1, 1, 1, 10, 10, 10)`) for smoother wobble
- Combine with low `roughness` and some `metalness` for a jelly-like appearance
- Lower `factor` values create subtle wobble, higher values create dramatic deformation
