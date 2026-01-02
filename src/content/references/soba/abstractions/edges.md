---
options:
    extends:
        - name: THREE.Line2
          link: 'https://threejs.org/docs/index.html#examples/en/lines/Line2'
    properties:
        - name: geometry
          type: THREE.BufferGeometry
          description: >-
              Geometry to use for the edges. If not provided, uses parent geometry.
        - name: threshold
          type: number
          description: >-
              Angle threshold in degrees for edge detection. Default: 15
        - name: lineWidth
          type: number
          description: >-
              Width of the edge lines. Default: 1
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Line color. Default: 0xffffff
---

`NgtsEdges` is a port of [Drei's Edges](https://drei.docs.pmnd.rs/abstractions/edges) which abstracts [THREE.EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry). It pulls the geometry automatically from its parent, optionally you can ungroup it and give it a `geometry` prop. `NgtsEdges` is based on `NgtsLine` and supports all of its options.

### Usage

```angular-ts
import { NgtsEdges } from 'angular-three-soba/abstractions';
```

```angular-html
<ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-basic-material color="lightblue" />
    <ngts-edges [options]="{ threshold: 15, color: 'darkblue', lineWidth: 2 }" />
</ngt-mesh>
```

### Scaled Edges

You can scale the edges slightly to create an outline effect:

```angular-html
<ngt-mesh>
    <ngt-icosahedron-geometry />
    <ngt-mesh-standard-material color="orange" />
    <ngts-edges [options]="{ scale: 1.05, threshold: 15, color: 'black', lineWidth: 3 }" />
</ngt-mesh>
```

### Custom Geometry

You can provide a custom geometry instead of using the parent's geometry:

```angular-html
<ngts-edges [options]="{ geometry: customGeometry, threshold: 10, color: 'white' }" />
```

### Adjusting Threshold

The `threshold` option controls the angle (in degrees) at which edges are detected. Lower values show more edges, higher values show fewer:

```angular-html
<!-- Shows more edges (sharper angle detection) -->
<ngts-edges [options]="{ threshold: 5 }" />

<!-- Shows fewer edges (only very sharp angles) -->
<ngts-edges [options]="{ threshold: 30 }" />
```
