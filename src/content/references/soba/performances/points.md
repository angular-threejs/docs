---
credits:
    text: 'Credits: Points from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/points'
options:
    properties:
        - name: 'limit'
          type: 'number'
          description: 'Maximum number of points, default to 1000'
        - name: 'range'
          type: 'number'
          description: 'Limits the number of visible points'
inputs:
    - name: 'positions'
      type: 'Float32Array'
      description: 'Float32Array of point positions'
      required: true
    - name: 'colors'
      type: 'Float32Array'
      description: 'Optional Float32Array of RGB colors'
    - name: 'sizes'
      type: 'Float32Array'
      description: 'Optional Float32Array of point sizes'
    - name: 'stride'
      type: 'number'
      description: 'Components per position (2 or 3), default to 3'
---

Components for efficiently rendering point clouds with per-point control over position, color, and size.

### NgtsPointsInstances

Renders many individual points with per-point control. Best for dynamic point clouds where individual points need to be updated.

```angular-ts
import { NgtsPointsInstances, NgtsPoint } from 'angular-three-soba/performances';
```

```angular-html
<ngts-points-instances [options]="{ limit: 100 }">
    <ngt-points-material [size]="0.1" [vertexColors]="true" />

    @for (i of points; track i) {
        <ngts-point [options]="{ position: [i * 2, 0, 0], color: 'red' }" />
    }
</ngts-points-instances>
```

### NgtsPoint

A single point within `NgtsPointsInstances`. Supports position, color, and size.

#### Point Options

| Property   | Description         |
| ---------- | ------------------- |
| `position` | Position [x, y, z]  |
| `color`    | Point color         |
| `size`     | Point size override |

### NgtsPointsBuffer

Optimized for large arrays of pre-computed point data. Ideal for particle systems or data visualizations with thousands of points.

```angular-ts
import { NgtsPointsBuffer } from 'angular-three-soba/performances';
```

```angular-html
<ngts-points-buffer
    [positions]="positionsArray"
    [colors]="colorsArray"
    [sizes]="sizesArray"
>
    <ngt-points-material [vertexColors]="true" />
</ngts-points-buffer>
```

### Creating Point Cloud Data

```angular-ts
@Component({
    template: `
        <ngts-points-buffer [positions]="positions()" [colors]="colors()">
            <ngt-points-material [size]="0.05" [vertexColors]="true" />
        </ngts-points-buffer>
    `
})
export class PointCloud {
    count = 10000;

    positions = computed(() => {
        const arr = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return arr;
    });

    colors = computed(() => {
        const arr = new Float32Array(this.count * 3);
        for (let i = 0; i < this.count; i++) {
            arr[i * 3] = Math.random();     // R
            arr[i * 3 + 1] = Math.random(); // G
            arr[i * 3 + 2] = Math.random(); // B
        }
        return arr;
    });
}
```

### When to Use Which

| Component             | Use Case                             |
| --------------------- | ------------------------------------ |
| `NgtsPointsInstances` | Dynamic points, individual updates   |
| `NgtsPointsBuffer`    | Static/bulk data, large point clouds |

### 2D Points

Use `stride` for 2D point data:

```angular-html
<ngts-points-buffer [positions]="positions2D" [stride]="2">
    <ngt-points-material [size]="0.1" />
</ngts-points-buffer>
```
