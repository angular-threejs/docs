---
credits:
    text: 'Credits: Instances from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/instances'
options:
    properties:
        - name: 'limit'
          type: 'number'
          description: 'Maximum number of instances, default to 1000'
        - name: 'range'
          type: 'number'
          description: 'Limits the number of visible instances'
        - name: 'frames'
          type: 'number'
          description: 'Number of frames to update transforms (Infinity = continuous), default to Infinity'
---

`NgtsInstances` efficiently renders many instances of the same geometry and material using a single draw call via `THREE.InstancedMesh`. This dramatically improves performance when rendering many identical objects.

### Usage

```angular-ts
import { NgtsInstances, NgtsInstance } from 'angular-three-soba/performances';
```

```angular-html
<ngts-instances [options]="{ limit: 100 }">
    <ngt-box-geometry />
    <ngt-mesh-standard-material />

    @for (i of items; track i) {
        <ngts-instance [options]="{ position: [i * 2, 0, 0], color: 'red' }" />
    }
</ngts-instances>
```

### NgtsInstance

A single instance within `NgtsInstances`. Each instance can be individually positioned, rotated, scaled, and colored.

#### Instance Options

| Property   | Description                       |
| ---------- | --------------------------------- |
| `position` | Position [x, y, z]                |
| `rotation` | Rotation [x, y, z]                |
| `scale`    | Scale (number or [x, y, z])       |
| `color`    | Instance color (overrides parent) |

### Dynamic Instances

```angular-ts
@Component({
    template: `
        <ngts-instances [options]="{ limit: 1000 }">
            <ngt-sphere-geometry *args="[0.5, 16, 16]" />
            <ngt-mesh-standard-material />

            @for (particle of particles(); track particle.id) {
                <ngts-instance
                    [options]="{
                        position: particle.position,
                        scale: particle.scale,
                        color: particle.color
                    }"
                />
            }
        </ngts-instances>
    `
})
export class ParticleSystem {
    particles = signal<Particle[]>([]);
}
```

### Performance Tips

- Set `limit` to match your expected maximum instances
- Use `range` to limit visible instances for culling
- Set `frames` to a finite number if instances don't move often

```angular-html
<!-- Static instances - only update once -->
<ngts-instances [options]="{ limit: 500, frames: 1 }">
    <!-- ... -->
</ngts-instances>
```
