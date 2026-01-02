---
options:
    properties:
        - name: object
          type: Object3D
          description: >-
              The target object to transform (optional). Can also wrap content directly.
        - name: enabled
          type: boolean
          description: >-
              Whether the controls are enabled. Default: true
        - name: mode
          type: "'translate' | 'rotate' | 'scale'"
          description: >-
              The transformation mode. Default: 'translate'
        - name: axis
          type: "'X' | 'Y' | 'Z' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | null"
          description: >-
              Restricts transformation to specific axis. Default: null
        - name: space
          type: "'world' | 'local'"
          description: >-
              Coordinate space for transformations. Default: 'world'
        - name: size
          type: number
          description: >-
              Size of the gizmo. Default: 1
        - name: showX
          type: boolean
          description: >-
              Whether to show the X axis handle. Default: true
        - name: showY
          type: boolean
          description: >-
              Whether to show the Y axis handle. Default: true
        - name: showZ
          type: boolean
          description: >-
              Whether to show the Z axis handle. Default: true
        - name: translationSnap
          type: number
          description: >-
              Snap increment for translation. Default: null
        - name: rotationSnap
          type: number
          description: >-
              Snap increment for rotation in radians. Default: null
        - name: scaleSnap
          type: number
          description: >-
              Snap increment for scaling. Default: null
        - name: makeDefault
          type: boolean
          description: >-
              Whether to make these the default controls. Default: false
outputs:
    - name: change
      type: any
      description: >-
          Emits on any transformation change.
    - name: mouseDown
      type: any
      description: >-
          Emits when mouse is pressed on gizmo.
    - name: mouseUp
      type: any
      description: >-
          Emits when mouse is released.
    - name: objectChange
      type: any
      description: >-
          Emits when the object's transform changes.
---

`NgtsTransformControls` provides interactive transform controls for manipulating 3D objects. It wraps Three.js TransformControls to provide translation, rotation, and scaling gizmos.

### Usage

```angular-ts
import { NgtsTransformControls } from 'angular-three-soba/gizmos';
```

Wrap content directly:

```angular-html
<ngts-transform-controls [options]="{ mode: 'translate' }">
  <ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material />
  </ngt-mesh>
</ngts-transform-controls>
```

Or attach to an existing object:

```angular-html
<ngts-transform-controls
  [object]="meshRef"
  [options]="{ mode: 'rotate', showX: false }"
  (change)="onTransform($event)"
/>
```
