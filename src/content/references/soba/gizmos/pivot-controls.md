---
options:
    properties:
        - name: enabled
          type: boolean
          description: >-
              Whether the control is enabled. Default: true
        - name: scale
          type: number
          description: >-
              Scale of the gizmo. Default: 1
        - name: lineWidth
          type: number
          description: >-
              Width of the gizmo lines. Default: 4
        - name: fixed
          type: boolean
          description: >-
              If true, gizmo remains constant in screen size. Default: false
        - name: offset
          type: '[number, number, number]'
          description: >-
              Position offset of the pivot point. Default: [0, 0, 0]
        - name: rotation
          type: '[number, number, number]'
          description: >-
              Starting rotation of the gizmo in radians. Default: [0, 0, 0]
        - name: matrix
          type: Matrix4
          description: >-
              Starting transformation matrix. Default: undefined
        - name: anchor
          type: '[number, number, number]'
          description: >-
              Bounding box anchor point [-1, 0, +1] per axis. Default: undefined
        - name: autoTransform
          type: boolean
          description: >-
              Auto-apply local transform on drag. Default: true
        - name: activeAxes
          type: '[boolean, boolean, boolean]'
          description: >-
              Which axes are active [x, y, z]. Default: [true, true, true]
        - name: disableAxes
          type: boolean
          description: >-
              Disables all translation arrows. Default: false
        - name: disableSliders
          type: boolean
          description: >-
              Disables all plane sliders. Default: false
        - name: disableRotations
          type: boolean
          description: >-
              Disables all rotation handles. Default: false
        - name: disableScaling
          type: boolean
          description: >-
              Disables all scaling spheres. Default: false
        - name: translationLimits
          type: '[[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]'
          description: >-
              Translation limits per axis as [min, max] pairs. Default: undefined
        - name: rotationLimits
          type: '[[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]'
          description: >-
              Rotation limits per axis as [min, max] pairs. Default: undefined
        - name: scaleLimits
          type: '[[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]'
          description: >-
              Scale limits per axis as [min, max] pairs. Default: undefined
        - name: axisColors
          type: '[string, string, string]'
          description: >-
              Colors for the X, Y, and Z axes. Default: ['#ff2060', '#20df80', '#2080ff']
        - name: hoveredColor
          type: string
          description: >-
              Color when a gizmo element is hovered. Default: '#ffff40'
        - name: annotations
          type: boolean
          description: >-
              Whether to show HTML value annotations. Default: false
        - name: depthTest
          type: boolean
          description: >-
              Whether gizmo is occluded by scene geometry. Default: true
        - name: opacity
          type: number
          description: >-
              Opacity of the gizmo elements. Default: 1
        - name: visible
          type: boolean
          description: >-
              Whether the gizmo is visible. Default: true
outputs:
    - name: dragStarted
      type: any
      description: >-
          Emits when drag operation starts.
    - name: dragged
      type: any
      description: >-
          Emits during drag with transform matrices.
    - name: dragEnded
      type: any
      description: >-
          Emits when drag operation ends.
---

`NgtsPivotControls` is an interactive pivot-style gizmo with arrows for translation, plane sliders for 2D movement, rotators for rotation, and spheres for scaling. Supports transformation limits and anchor points.

### Usage

```angular-ts
import { NgtsPivotControls } from 'angular-three-soba/gizmos';
```

Basic usage:

```angular-html
<ngts-pivot-controls [options]="{ scale: 0.5 }">
  <ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material />
  </ngt-mesh>
</ngts-pivot-controls>
```

With limits and callbacks:

```angular-html
<ngts-pivot-controls
  [options]="{
    disableRotations: true,
    disableScaling: true,
    translationLimits: [[-1, 1], undefined, undefined]
  }"
  (dragged)="onDrag($event)"
  (dragStarted)="onDragStart($event)"
  (dragEnded)="onDragEnd()"
>
  <ngt-mesh />
</ngts-pivot-controls>
```
