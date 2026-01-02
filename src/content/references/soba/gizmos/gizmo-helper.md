---
options:
    properties:
        - name: alignment
          type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'"
          description: >-
              Position of the gizmo in the viewport. Default: 'bottom-right'
        - name: margin
          type: '[number, number]'
          description: >-
              Margin from the edge of the viewport in pixels [x, y]. Default: [80, 80]
        - name: renderPriority
          type: number
          description: >-
              Render priority for the gizmo portal. Default: 1
        - name: autoClear
          type: boolean
          description: >-
              Whether to auto-clear the renderer before rendering. Default: undefined
outputs:
    - name: update
      type: void
      description: >-
          Emits when the camera animation updates.
---

`NgtsGizmoHelper` displays an orientation gizmo helper in a corner of the viewport. It renders in a separate portal with its own orthographic camera and allows users to click on axes to animate the camera to predefined views.

### Usage

```angular-ts
import { NgtsGizmoHelper, NgtsGizmoViewcube, NgtsGizmoViewport } from 'angular-three-soba/gizmos';
```

```angular-html
<ngts-gizmo-helper [options]="{ alignment: 'bottom-right', margin: [80, 80] }">
  <ng-template gizmoHelperContent>
    <ngts-gizmo-viewport />
  </ng-template>
</ngts-gizmo-helper>
```

## NgtsGizmoViewcube

A 3D cube-style orientation gizmo with labeled faces (Front, Back, Left, Right, Top, Bottom). Clickable faces, edges, and corners allow users to orient the camera to standard or diagonal views. Must be used inside `NgtsGizmoHelper`.

### Options

| Property      | Type       | Default                                               | Description                            |
| ------------- | ---------- | ----------------------------------------------------- | -------------------------------------- |
| `font`        | `string`   | `'20px Inter var, Arial, sans-serif'`                 | CSS font specification for face labels |
| `opacity`     | `number`   | `1`                                                   | Opacity of the cube faces              |
| `color`       | `string`   | `'#f0f0f0'`                                           | Background color of the cube faces     |
| `hoverColor`  | `string`   | `'#999'`                                              | Color when a face is hovered           |
| `textColor`   | `string`   | `'black'`                                             | Color of the face label text           |
| `strokeColor` | `string`   | `'black'`                                             | Color of the face border stroke        |
| `faces`       | `string[]` | `['Right', 'Left', 'Top', 'Bottom', 'Front', 'Back']` | Labels for each face                   |

### Outputs

| Output  | Description                              |
| ------- | ---------------------------------------- |
| `click` | Emits when a face/edge/corner is clicked |

```angular-html
<ngts-gizmo-helper>
  <ng-template gizmoHelperContent>
    <ngts-gizmo-viewcube [options]="{ color: '#fff', hoverColor: '#ccc' }" />
  </ng-template>
</ngts-gizmo-helper>
```

## NgtsGizmoViewport

A viewport-style gizmo with colored axes (X, Y, Z) and interactive heads. Clicking on axis heads animates the camera to the corresponding view direction. Must be used inside `NgtsGizmoHelper`.

### Options

| Property           | Type                       | Default                               | Description                             |
| ------------------ | -------------------------- | ------------------------------------- | --------------------------------------- |
| `axisColors`       | `[string, string, string]` | `['#ff2060', '#20df80', '#2080ff']`   | Colors for the X, Y, and Z axes         |
| `axisScale`        | `[number, number, number]` | `undefined`                           | Scale of the axis lines [x, y, z]       |
| `labels`           | `[string, string, string]` | `['X', 'Y', 'Z']`                     | Labels for the X, Y, and Z axis heads   |
| `axisHeadScale`    | `number`                   | `1`                                   | Scale factor for the axis head sprites  |
| `labelColor`       | `string`                   | `'#000'`                              | Color of the axis labels                |
| `hideNegativeAxes` | `boolean`                  | `false`                               | Whether to hide the negative axis heads |
| `hideAxisHeads`    | `boolean`                  | `false`                               | Whether to hide all axis heads          |
| `disabled`         | `boolean`                  | `false`                               | Whether the gizmo is non-interactive    |
| `font`             | `string`                   | `'18px Inter var, Arial, sans-serif'` | CSS font specification for axis labels  |

### Outputs

| Output  | Description                   |
| ------- | ----------------------------- |
| `click` | Emits when an axis is clicked |

```angular-html
<ngts-gizmo-helper>
  <ng-template gizmoHelperContent>
    <ngts-gizmo-viewport [options]="{ axisColors: ['red', 'green', 'blue'] }" />
  </ng-template>
</ngts-gizmo-helper>
```
