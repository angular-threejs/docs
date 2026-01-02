---
options:
    properties:
        - name: eps
          type: number
          description: >-
              Precision threshold for detecting scroll changes. Default: 0.00001
        - name: horizontal
          type: boolean
          description: >-
              Whether to enable horizontal scrolling instead of vertical. Default: false
        - name: infinite
          type: boolean
          description: >-
              Whether to enable infinite/continuous scrolling (experimental). Default: false
        - name: pages
          type: number
          description: >-
              Defines the length of the scroll area. Each page is height:100%. Default: 1
        - name: distance
          type: number
          description: >-
              A factor that increases scroll bar travel distance. Default: 1
        - name: damping
          type: number
          description: >-
              Friction/smoothing duration in seconds. Default: 0.25
        - name: maxSpeed
          type: number
          description: >-
              Maximum scroll speed in units per second. Default: Infinity
        - name: prepend
          type: boolean
          description: >-
              If true, attaches the scroll container before the canvas element. Default: false
        - name: enabled
          type: boolean
          description: >-
              Whether scroll controls are enabled. Default: true
        - name: style
          type: object
          description: >-
              Additional CSS styles to apply to the scroll container. Default: {}
---

`NgtsScrollControls` enables scroll-based interactions within a Three.js canvas. It creates a scrollable container that can be used to control animations and camera movements based on scroll position.

### Usage

```angular-ts
import { NgtsScrollControls, NgtsCanvasScrollContent } from 'angular-three-soba/controls';
```

```angular-html
<ngts-scroll-controls [options]="{ pages: 3, damping: 0.1 }">
  <ngt-group canvasScrollContent>
    <!-- 3D content that moves with scroll -->
  </ngt-group>
</ngts-scroll-controls>
```

### Companion Directives

#### `NgtsCanvasScrollContent`

A directive that automatically positions a group based on scroll progress. Apply to an `ngt-group` element.

```angular-html
<ngt-group canvasScrollContent>
  <!-- 3D content that moves with scroll -->
</ngt-group>
```

#### `NgtsHTMLScrollContent`

A directive that automatically transforms an HTML element based on scroll progress. Apply to a `div` element.

```angular-html
<div htmlScrollContent>
  <!-- HTML content that scrolls in sync with 3D content -->
</div>
```

### Properties and Methods

| Property/Method                    | Description                                              |
| ---------------------------------- | -------------------------------------------------------- |
| `progress`                         | A model that tracks the current scroll progress (0-1).   |
| `offset`                           | The damped scroll offset value.                          |
| `delta`                            | The change in offset since last frame.                   |
| `range(from, distance, margin?)`   | Returns linear progress (0-1) within a scroll range.     |
| `curve(from, distance, margin?)`   | Returns sinusoidal progress (0-1) within a scroll range. |
| `visible(from, distance, margin?)` | Returns true if currently within the specified range.    |

### Accessing Scroll Utilities

```angular-ts
@Component({
  template: `
    <ngts-scroll-controls [options]="{ pages: 3 }">
      <ngt-group canvasScrollContent>
        <ngt-mesh [position]="[0, 0, 0]">
          <ngt-box-geometry />
          <ngt-mesh-standard-material />
        </ngt-mesh>
      </ngt-group>
    </ngts-scroll-controls>
  `,
  imports: [NgtsScrollControls, NgtsCanvasScrollContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class ScrollScene {
  scrollControls = viewChild.required(NgtsScrollControls);

  constructor() {
    effect(() => {
      // Access scroll utilities
      const visible = this.scrollControls().visible(0, 1 / 3);
      const progress = this.scrollControls().range(0, 1 / 3);
    });
  }
}
```
