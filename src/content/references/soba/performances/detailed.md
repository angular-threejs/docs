---
options:
  extends: 'THREE.LOD'
  extendsLink: 'https://threejs.org/docs/index.html#api/en/objects/LOD'
  properties:
    - name: 'hysteresis'
      type: 'number'
      description: 'hysteresis for LOD, default to 0'
inputs:
    - name: 'distances'
      type: 'number[]'
      description: 'distances for LOD'
      required: true
---

An abstraction around [`THREE.LOD`](https://threejs.org/docs/index.html#api/en/objects/LOD). A common technique to improve performance is to swap out high-detail models or meshes for low-detail ones at large distances.

:::note

Check out [Level of Details](/learn/advanced/performance/lod).

:::

### Usage

```angular-ts
import { NgtsDetailed } from 'angular-three-soba/performances';
```

```angular-html
<ngts-detailed [distances]="[0, 50, 150]">
    <ngt-mesh>
        <ngt-icosahedron-geometry *args="[10, 3]" />
        <ngt-mesh-basic-material color="hotpink" wireframe />
    </ngt-mesh>

    <ngt-mesh>
        <ngt-icosahedron-geometry *args="[10, 2]" />
        <ngt-mesh-basic-material color="lightgreen" wireframe />
    </ngt-mesh>

    <ngt-mesh>
        <ngt-icosahedron-geometry *args="[10, 1]" />
        <ngt-mesh-basic-material color="lightblue" wireframe />
    </ngt-mesh>
</ngts-detailed>
```

`distances` length should be equal to the number of children.
