---
options:
    properties:
        - name: map
          type: THREE.Texture
          description: >-
              The texture to use for the decal
        - name: position
          type: '[number, number, number]'
          description: >-
              Position of the decal. Default: [0, 0, 0]
        - name: rotation
          type: '[number, number, number] | number'
          description: >-
              Rotation of the decal. A single number spins around the normal
        - name: scale
          type: 'number | [number, number, number]'
          description: >-
              Scale of the decal. Default: 1
        - name: debug
          type: boolean
          description: >-
              Makes the bounding box of the decal visible. Default: false
        - name: depthTest
          type: boolean
          description: >-
              Whether to enable depth testing. Default: false
        - name: polygonOffsetFactor
          type: number
          description: >-
              The factor by which the polygon offset is multiplied. Default: -10
---

`NgtsDecal` is an abstraction around THREE.js `DecalGeometry`. It projects textures onto mesh surfaces for effects like stickers, logos, or damage marks.

The decal box must intersect the surface to be visible. If you don't specify a rotation, it will orient toward the parent's center point.

## Usage

### With Custom Material

```angular-html
<ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-basic-material />
    <ngts-decal [options]="{ position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, debug: true }">
        <ngt-mesh-basic-material [map]="texture()" [polygonOffset]="true" [polygonOffsetFactor]="-1" />
    </ngts-decal>
</ngt-mesh>
```

### With Default Material

If you don't specify a material, a transparent `MeshBasicMaterial` with `polygonOffsetFactor: -10` is created automatically:

```angular-html
<ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-basic-material />
    <ngts-decal [options]="{ map: texture() }" />
</ngt-mesh>
```

### With External Mesh Reference

```angular-html
<ngts-decal [mesh]="meshRef()" [options]="{ map: texture() }">
    <ngt-mesh-basic-material [map]="texture()" [polygonOffset]="true" [polygonOffsetFactor]="-1" />
</ngts-decal>
```
