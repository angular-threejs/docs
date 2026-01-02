---
options:
    extends:
        - name: THREE.MeshStandardMaterial
          link: https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial
    properties:
        - name: resolution
          type: number
          default: '256'
          description: >-
              Resolution of the reflection render target.
        - name: mixBlur
          type: number
          default: '0'
          description: >-
              Amount of blur mixing applied to the reflection.
        - name: mixStrength
          type: number
          default: '1'
          description: >-
              Strength of the reflection mix.
        - name: blur
          type: '[number, number] | number'
          default: '[0, 0]'
          description: >-
              Blur amount as [x, y] or a single value.
        - name: mirror
          type: number
          default: '0'
          description: >-
              Mirror reflection intensity (0 = no mirror, 1 = full mirror).
        - name: minDepthThreshold
          type: number
          default: '0.9'
          description: >-
              Minimum depth threshold for depth-based effects.
        - name: maxDepthThreshold
          type: number
          default: '1'
          description: >-
              Maximum depth threshold for depth-based effects.
        - name: depthScale
          type: number
          default: '0'
          description: >-
              Scale factor for depth-based effects.
        - name: depthToBlurRatioBias
          type: number
          default: '0.25'
          description: >-
              Bias ratio between depth and blur effects.
        - name: distortion
          type: number
          default: '1'
          description: >-
              Distortion intensity applied to the reflection.
        - name: mixContrast
          type: number
          default: '1'
          description: >-
              Contrast adjustment for the reflection mix.
        - name: reflectorOffset
          type: number
          default: '0'
          description: >-
              Offset of the reflector plane along its normal.
        - name: distortionMap
          type: THREE.Texture
          description: >-
              Optional texture to apply distortion effects.
---

`NgtsMeshReflectorMaterial` is a port of [Drei's MeshReflectorMaterial](https://drei.docs.pmnd.rs/shaders/mesh-reflector-material) that creates realistic reflections on a planar surface. It supports blur, depth-based effects, distortion, and mirror-like reflections.

:::note
The parent mesh should be a flat plane for best results.
:::

### Usage

```angular-ts
import { NgtsMeshReflectorMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]">
    <ngt-plane-geometry *args="[10, 10]" />
    <ngts-mesh-reflector-material
        [options]="{
            blur: [300, 100],
            resolution: 1024,
            mixBlur: 1,
            mixStrength: 50,
            mirror: 0.5,
            color: '#a0a0a0'
        }"
    />
</ngt-mesh>
```

### Floor Reflection Example

```angular-ts
@Component({
    template: `
        <!-- Reflective floor -->
        <ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1, 0]">
            <ngt-plane-geometry *args="[50, 50]" />
            <ngts-mesh-reflector-material
                [options]="{
                    blur: [400, 100],
                    resolution: 1024,
                    mixBlur: 1,
                    mixStrength: 15,
                    depthScale: 1,
                    minDepthThreshold: 0.85,
                    color: '#151515',
                    metalness: 0.6,
                    roughness: 1
                }"
            />
        </ngt-mesh>

        <!-- Objects to reflect -->
        <ngt-mesh [position]="[0, 0, 0]">
            <ngt-box-geometry />
            <ngt-mesh-standard-material color="orange" />
        </ngt-mesh>
    `
})
export class ReflectiveFloor {
    Math = Math;
}
```

The reflection quality depends on the `resolution` setting. Higher values produce sharper reflections but require more GPU resources.
