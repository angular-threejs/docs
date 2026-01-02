---
options:
    extends:
        - name: THREE.Line2
          link: 'https://threejs.org/docs/index.html#examples/en/lines/Line2'
    properties:
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Line color. Default: 0xffffff
        - name: lineWidth
          type: number
          description: >-
              Line width in pixels. Default: 1
        - name: segments
          type: boolean
          description: >-
              Whether to render as THREE.LineSegments2 instead of THREE.Line2. Default: false
        - name: dashed
          type: boolean
          description: >-
              Whether the line is dashed.
        - name: vertexColors
          type: 'Array<[number, number, number] | [number, number, number, number]>'
          description: >-
              Array of colors for vertex coloring. Supports RGB or RGBA tuples.
inputs:
    - name: points
      type: 'Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>'
      description: >-
          Array of points. Accepts Vector3, Vector2, coordinate tuples, or flat numbers.
      required: true
---

`NgtsLine` is a port of [Drei's Line](https://drei.docs.pmnd.rs/abstractions/line) which renders a `THREE.Line2` or `THREE.LineSegments2` (depending on the value of `segments`).

### Usage

```angular-ts
import { NgtsLine } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-line [points]="[[0, 0, 0], [1, 1, 1], [2, 0, 0]]" [options]="{ color: 'hotpink', lineWidth: 2 }" />
```

### Vertex Colors

You can use vertex colors to create multi-colored lines:

```angular-html
<ngts-line
    [points]="[[0, 0, 0], [1, 1, 0], [2, 0, 0]]"
    [options]="{
        vertexColors: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        lineWidth: 3
    }"
/>
```

### Line Segments

Set `segments: true` to render as `THREE.LineSegments2` for disconnected line pairs:

```angular-html
<ngts-line
    [points]="[[0, 0, 0], [1, 1, 0], [2, 0, 0], [3, 1, 0]]"
    [options]="{ segments: true, color: 'cyan' }"
/>
```

---

## NgtsQuadraticBezierLine

Renders a `THREE.Line2` using `THREE.QuadraticBezierCurve3` for interpolation.

### Usage

```angular-ts
import { NgtsQuadraticBezierLine } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-quadratic-bezier-line
    [start]="[0, 0, 0]"
    [end]="[2, 2, 0]"
    [options]="{ color: 'yellow', lineWidth: 2 }"
/>
```

### Inputs

| Input   | Type  | Description                                               | Default     |
| ------- | ----- | --------------------------------------------------------- | ----------- |
| `start` | Point | Starting point of the bezier curve.                       | `[0, 0, 0]` |
| `end`   | Point | Ending point of the bezier curve.                         | `[0, 0, 0]` |
| `mid`   | Point | Control point. If not provided, automatically calculated. | `undefined` |

### Options

| Property    | Type   | Description                                         | Default |
| ----------- | ------ | --------------------------------------------------- | ------- |
| `segments`  | number | Number of segments to approximate the bezier curve. | `20`    |
| `lineWidth` | number | Line width.                                         | `1`     |

---

## NgtsCubicBezierLine

Renders a `THREE.Line2` using `THREE.CubicBezierCurve3` for interpolation.

### Usage

```angular-ts
import { NgtsCubicBezierLine } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-cubic-bezier-line
    [start]="[0, 0, 0]"
    [end]="[2, 2, 0]"
    [midA]="[0.5, 1, 0]"
    [midB]="[1.5, 1, 0]"
    [options]="{ color: 'magenta', lineWidth: 2 }"
/>
```

### Inputs

| Input   | Type  | Description           | Required |
| ------- | ----- | --------------------- | -------- |
| `start` | Point | Start point.          | Yes      |
| `end`   | Point | End point.            | Yes      |
| `midA`  | Point | First control point.  | Yes      |
| `midB`  | Point | Second control point. | Yes      |

### Options

| Property    | Type   | Description                                         | Default |
| ----------- | ------ | --------------------------------------------------- | ------- |
| `segments`  | number | Number of segments to divide the Bezier curve into. | `20`    |
| `lineWidth` | number | Line width.                                         | `1`     |

---

## NgtsCatmullRomLine

Renders a `THREE.Line2` using `THREE.CatmullRomCurve3` for interpolation.

### Usage

```angular-ts
import { NgtsCatmullRomLine } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-catmull-rom-line
    [points]="[[0, 0, 0], [1, 2, 0], [2, 0, 0], [3, 2, 0]]"
    [options]="{ closed: false, curveType: 'centripetal', tension: 0.5, color: 'lime', lineWidth: 2 }"
/>
```

### Inputs

| Input    | Type         | Description      | Required |
| -------- | ------------ | ---------------- | -------- |
| `points` | Array<Point> | Array of points. | Yes      |

### Options

| Property    | Type                                             | Description                                                | Default         |
| ----------- | ------------------------------------------------ | ---------------------------------------------------------- | --------------- |
| `closed`    | boolean                                          | Whether the curve should be closed (connect end to start). | `false`         |
| `curveType` | `'centripetal'` \| `'chordal'` \| `'catmullrom'` | Type of curve.                                             | `'centripetal'` |
| `tension`   | number                                           | Tension parameter for the curve (0 to 1).                  | `0.5`           |
| `segments`  | number                                           | Number of segments to divide the curve into for rendering. | `20`            |
| `lineWidth` | number                                           | Line width.                                                | `1`             |
