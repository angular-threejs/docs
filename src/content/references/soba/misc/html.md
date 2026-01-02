---
options:
    properties:
        - name: occlude
          type: "boolean | 'raycast' | 'blending' | Object3D[]"
          description: >-
              Controls occlusion behavior. Default: false
        - name: transform
          type: boolean
          description: >-
              When true, uses CSS 3D transforms. When false, projects to 2D screen coordinates. Default: false
        - name: castShadow
          type: boolean
          description: >-
              Forward shadow casting to occlusion mesh (blending mode only). Default: false
        - name: receiveShadow
          type: boolean
          description: >-
              Forward shadow receiving to occlusion mesh (blending mode only). Default: false
---

`NgtsHTML` renders HTML content positioned in 3D space. It creates a THREE.Group anchor point in the scene and projects HTML onto the canvas using CSS positioning or CSS 3D transforms.

## Usage

```angular-ts
import { NgtsHTML } from 'angular-three-soba/misc';

@Component({
    imports: [NgtsHTML],
    template: `
        <ngt-mesh [position]="[0, 2, 0]">
            <ngts-html [options]="{ transform: true }">
                <div [htmlContent]="{ distanceFactor: 10 }">Label</div>
            </ngts-html>
        </ngt-mesh>
    `
})
class MyComponent {}
```

## NgtsHTMLContentOptions (for `div[htmlContent]`)

| Property         | Description                                              | Default         |
| ---------------- | -------------------------------------------------------- | --------------- |
| `distanceFactor` | Scales HTML based on distance from camera                | `undefined`     |
| `center`         | Centers the HTML element on the projected point          | `false`         |
| `sprite`         | When true (with transform), HTML always faces the camera | `false`         |
| `zIndexRange`    | Range for automatic z-index calculation `[max, min]`     | `[16777271, 0]` |
| `containerClass` | CSS class applied to the inner container div             | `''`            |
| `containerStyle` | Inline styles applied to the inner container div         | `{}`            |
| `pointerEvents`  | CSS pointer-events value                                 | `'auto'`        |

## Outputs

| Output     | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| `occluded` | Emits when occlusion state changes (true = hidden, false = visible) |
