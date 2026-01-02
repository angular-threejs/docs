---
options:
    extends:
        - name: THREE.ExtrudeGeometry
          link: 'https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry'
    properties:
        - name: height
          type: number
          description: >-
              Height of the prism extrusion. Default: 1
        - name: bevelEnabled
          type: boolean
          description: >-
              Enable bevel. Default: false
        - name: steps
          type: number
          description: >-
              Number of points used for subdividing segments along the depth of the extruded spline.
        - name: bevelThickness
          type: number
          description: >-
              How deep into the original shape the bevel goes.
        - name: bevelSize
          type: number
          description: >-
              Distance from the shape outline that the bevel extends.
        - name: bevelOffset
          type: number
          description: >-
              Distance from the shape outline that the bevel starts.
        - name: bevelSegments
          type: number
          description: >-
              Number of bevel layers.
        - name: curveSegments
          type: number
          description: >-
              Number of points on the curves.
inputs:
    - name: vertices
      type: 'Array<[number, number]>'
      description: >-
          Array of 2D vertices defining the base shape.
      required: true
    - name: attach
      type: NgtAttachable
      description: >-
          Defines how the geometry attaches to its parent. Default: 'geometry'
---

`NgtsPrismGeometry` abstracts [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) to create a prism geometry from a 2D shape.

### Usage

```angular-ts
import { NgtsPrismGeometry } from 'angular-three-soba/abstractions';
```

```angular-html
<ngt-mesh>
    <ngts-prism-geometry [vertices]="[[0, 0], [1, 0], [0.5, 1]]" [options]="{ height: 2 }" />
    <ngt-mesh-standard-material color="purple" />
</ngt-mesh>
```

### Triangle Prism

Create a simple triangular prism:

```angular-html
<ngt-mesh>
    <ngts-prism-geometry
        [vertices]="[[0, 0], [2, 0], [1, 1.732]]"
        [options]="{ height: 3 }"
    />
    <ngt-mesh-standard-material color="coral" />
</ngt-mesh>
```

### Rectangular Prism

Create a rectangular prism:

```angular-html
<ngt-mesh>
    <ngts-prism-geometry
        [vertices]="[[0, 0], [2, 0], [2, 1], [0, 1]]"
        [options]="{ height: 1.5 }"
    />
    <ngt-mesh-standard-material color="teal" />
</ngt-mesh>
```

### With Bevel

Add bevel to the prism edges:

```angular-html
<ngt-mesh>
    <ngts-prism-geometry
        [vertices]="[[0, 0], [1, 0], [1, 1], [0, 1]]"
        [options]="{ height: 1, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 3 }"
    />
    <ngt-mesh-standard-material color="gold" />
</ngt-mesh>
```

### Custom Polygon

Create a prism from any polygon shape:

```angular-html
<ngt-mesh>
    <!-- Hexagon base -->
    <ngts-prism-geometry
        [vertices]="[
            [1, 0],
            [0.5, 0.866],
            [-0.5, 0.866],
            [-1, 0],
            [-0.5, -0.866],
            [0.5, -0.866]
        ]"
        [options]="{ height: 0.5 }"
    />
    <ngt-mesh-standard-material color="skyblue" />
</ngt-mesh>
```
