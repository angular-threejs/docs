---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: width
          type: number
          description: >-
              Width of the box (X-axis). Default: 1
        - name: height
          type: number
          description: >-
              Height of the box (Y-axis). Default: 1
        - name: depth
          type: number
          description: >-
              Depth of the box (Z-axis). Default: 1
        - name: radius
          type: number
          description: >-
              Radius of the rounded corners. Default: 0.05
        - name: smoothness
          type: number
          description: >-
              Number of curve segments for corner smoothness. Default: 4
        - name: bevelSegments
          type: number
          description: >-
              Number of bevel segments. Default: 4
        - name: steps
          type: number
          description: >-
              Number of extrusion steps. Default: 1
        - name: creaseAngle
          type: number
          description: >-
              Angle threshold for creased normals calculation (radians). Default: 0.4
---

`NgtsRoundedBox` is a port of [Drei's RoundedBox](https://drei.docs.pmnd.rs/shapes/rounded-box) which renders a box with rounded edges. Creates smooth, beveled corners on all edges of the box.

### Usage

```angular-ts
import { NgtsRoundedBox } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-rounded-box [options]="{ width: 2, height: 1, depth: 1, radius: 0.1 }">
    <ngt-mesh-standard-material color="orange" />
</ngts-rounded-box>
```

### Custom Material

`NgtsRoundedBox` accepts custom material(s) via content projection.

```angular-html
<ngts-rounded-box [options]="{ width: 1.5, height: 1.5, depth: 1.5, radius: 0.2, smoothness: 8 }">
    <ngt-mesh-physical-material [metalness]="0.5" [roughness]="0.3" color="gold" />
</ngts-rounded-box>
```
