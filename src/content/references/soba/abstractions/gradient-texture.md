---
options:
    extends:
        - name: THREE.CanvasTexture
          link: 'https://threejs.org/docs/index.html#api/en/textures/CanvasTexture'
    properties:
        - name: size
          type: number
          description: >-
              The size of the canvas texture in pixels. Default: 1024
        - name: width
          type: number
          description: >-
              The width of the canvas texture in pixels. Default: 16
        - name: type
          type: "'linear' | 'radial'"
          description: >-
              The type of the gradient. Default: 'linear'
        - name: innerCircleRadius
          type: number
          description: >-
              The inner radius of the gradient. Default: 0
        - name: outerCircleRadius
          type: string | number
          description: >-
              The outer radius of the gradient. Default: 'auto'
inputs:
    - name: stops
      type: Array<number>
      description: >-
          An array of numbers that define the position of the color stops. These values must be between 0 and 1.
      required: true
    - name: colors
      type: Array<THREE.ColorRepresentation>
      description: >-
          An array of colors that define the color of the gradient. These colors can be in any format that is accepted by THREE.Color.
      required: true
    - name: attach
      type: NgtAttachable
      description: >-
          The attachment point of the texture on the parent. Default: 'map'
---

`NgtsGradientTexture` is a port of [Drei's GradientTexture](https://drei.docs.pmnd.rs/abstractions/gradient-texture) which is a declarative `THREE.CanvasTexture` that attaches to `map` by default. You can use this to create gradient backgrounds.

### Usage

```angular-ts
import { NgtsGradientTexture } from 'angular-three-soba/abstractions';
```

```angular-html
<ngt-mesh>
    <ngt-plane-geometry />
    <ngt-mesh-basic-material>
        <ngts-gradient-texture
            [stops]="[0, 1]"
            [colors]="['turquoise', 'mediumpurple']"
            [options]="{ size: 1024 }"
         />
    </ngt-mesh-basic-material>
</ngt-mesh>
```

### Radial gradient

```angular-html
<ngt-mesh>
    <ngt-plane-geometry />
    <ngt-mesh-basic-material>
        <ngts-gradient-texture
            [stops]="[0, 0.5, 1]"
            [colors]="['aquamarine', 'hotpink', 'yellow']"
            [options]="{ size: 1024, width: 1024, type: 'radial', innerCircleRadius: 0, outerCircleRadius: 'auto' }"/>
    </ngt-mesh-basic-material>
</ngt-mesh>
```
