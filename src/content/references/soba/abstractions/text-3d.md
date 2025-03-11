---
credits:
    text: 'Credits: Text3D Alignment'
    link: https://codesandbox.io/p/sandbox/text3d-alignment-forked-p8psjr?file=/src/App.js:44,33
options:
    extends:
        - name: THREE.Mesh
          link: https://threejs.org/docs/index.html#api/en/objects/Mesh
        - name: TextGeometryParameters
          link: https://github.com/pmndrs/three-stdlib/blob/main/src/geometries/TextGeometry.ts#L5
    properties:
        - name: bevelSegments
          type: number
          description: >-
              The number of vertical/horizontal segments that make up each glyph's
              rectangular plane. Default: 4
        - name: smooth
          type: number
          description: >-
              Merges vertices with a tolerance and calls computeVertexNormals()
inputs:
    - name: text
      type: string
      description: text to render
      required: true
    - name: font
      type: string
      description: url of the font
      required: true
---

`NgtsText3D` renders 3D text using [TextGeometry](https://threejs.org/docs/index.html#examples/en/geometries/TextGeometry)

### Usage

```angular-ts
import { NgtsText3D } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-text-3d text="hello\nworld" [font]="fontUrl" />
```

### Custom Material

`NgtsText3D` can accept custom material(s) via content projection.

```angular-html
<ngts-text-3d text="hello world" [font]="fontUrl">
    <ngt-mesh-basic-material [color]="color()" />
</ngts-text-3d>
```

### Alignment

You can align `NgtsText3D` by wrapping it with [`NgtsCenter`](/reference/soba/staging/center) component.

```angular-html
<ngts-center [options]="{ top: true, left: true }">
    <ngts-text-3d text="hello\nworld" [font]="fontUrl" />
</ngts-center>
```
