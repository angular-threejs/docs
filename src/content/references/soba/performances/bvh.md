---
credits:
    text: 'Credits: Bvh from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/bvh'
options:
    properties:
        - name: 'enabled'
          type: 'boolean'
          description: 'Whether BVH acceleration is enabled, default to true'
        - name: 'firstHitOnly'
          type: 'boolean'
          description: 'Use raycastFirst for faster single-hit detection, default to false'
        - name: 'strategy'
          type: 'SplitStrategy'
          description: 'Split strategy for BVH construction (SAH recommended), default to SAH'
        - name: 'verbose'
          type: 'boolean'
          description: 'Print warnings during tree construction, default to false'
        - name: 'setBoundingBox'
          type: 'boolean'
          description: 'Set geometry bounding box after BVH construction, default to true'
        - name: 'maxDepth'
          type: 'number'
          description: 'Maximum tree depth, default to 40'
        - name: 'maxLeafTris'
          type: 'number'
          description: 'Target number of triangles per leaf node, default to 10'
        - name: 'indirect'
          type: 'boolean'
          description: 'Use separate buffer for BVH structure (experimental), default to false'
---

`NgtsBVH` applies Bounding Volume Hierarchy (BVH) acceleration to child meshes for significantly faster raycasting performance. It uses [`three-mesh-bvh`](https://github.com/gkjohnson/three-mesh-bvh) under the hood.

BVH is essential for complex geometries where standard raycasting would be too slow.

### Dependencies

```bash
npm install three-mesh-bvh
```

### Usage

```angular-ts
import { NgtsBVH } from 'angular-three-soba/performances';
```

```angular-html
<ngts-bvh [options]="{ firstHitOnly: true }">
    <ngt-mesh>
        <ngt-buffer-geometry />
        <ngt-mesh-standard-material />
    </ngt-mesh>
</ngts-bvh>
```

### When to Use

- Complex meshes with thousands of triangles
- Scenes with many interactive objects
- When raycasting performance is a bottleneck

### Split Strategies

- `SAH` (default): Surface Area Heuristic, best for most cases
- `CENTER`: Split at center of bounding box
- `AVERAGE`: Split at average of triangle centroids

```angular-html
<ngts-bvh [options]="{ strategy: CENTER, maxDepth: 30 }">
    <!-- meshes -->
</ngts-bvh>
```
