---
credits:
    text: 'Credits: Segments from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/segments'
options:
    properties:
        - name: 'limit'
          type: 'number'
          description: 'Maximum number of segments, default to 1000'
        - name: 'lineWidth'
          type: 'number'
          description: 'Width of the line segments, default to 1.0'
inputs:
    - name: 'start'
      type: 'NgtVector3'
      description: 'Starting point [x, y, z]'
      required: true
    - name: 'end'
      type: 'NgtVector3'
      description: 'Ending point [x, y, z]'
      required: true
    - name: 'color'
      type: 'THREE.ColorRepresentation'
      description: 'Segment color'
---

`NgtsSegments` efficiently renders multiple line segments using a single draw call via `Line2` from three-stdlib. This is ideal for drawing many independent line segments with consistent performance.

### Usage

```angular-ts
import { NgtsSegments, NgtsSegment } from 'angular-three-soba/performances';
```

```angular-html
<ngts-segments [options]="{ lineWidth: 2, limit: 100 }">
    <ngts-segment [start]="[0, 0, 0]" [end]="[1, 1, 1]" [color]="'red'" />
    <ngts-segment [start]="[1, 1, 1]" [end]="[2, 0, 0]" [color]="'blue'" />
</ngts-segments>
```

### NgtsSegment

A single line segment within `NgtsSegments`. Each segment has a start point, end point, and optional color.

### Drawing a Graph

```angular-ts
@Component({
    template: `
        <ngts-segments [options]="{ lineWidth: 1.5 }">
            @for (edge of edges(); track $index) {
                <ngts-segment
                    [start]="edge.from"
                    [end]="edge.to"
                    [color]="edge.color"
                />
            }
        </ngts-segments>
    `
})
export class GraphVisualization {
    edges = signal<Edge[]>([]);
}
```

### Connecting Objects

```angular-html
<ngts-segments [options]="{ lineWidth: 2 }">
    @for (connection of connections(); track connection.id) {
        <ngts-segment
            [start]="connection.source.position"
            [end]="connection.target.position"
            [color]="connection.active ? 'lime' : 'gray'"
        />
    }
</ngts-segments>
```

### Performance Notes

- All segments share the same material properties (lineWidth, etc.)
- For independent lines with different widths, use `NgtsLine` instead
- Set `limit` based on your expected maximum number of segments
