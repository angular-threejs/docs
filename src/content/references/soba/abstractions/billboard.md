---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: 'follow'
          type: 'boolean'
          description: 'whether to follow the camera, default to true'
        - name: 'lockX'
          type: 'boolean'
          description: 'whether to lock the billboard on the X axis, default to false'
        - name: 'lockY'
          type: 'boolean'
          description: 'whether to lock the billboard on the Y axis, default to false'
        - name: 'lockZ'
          type: 'boolean'
          description: 'whether to lock the billboard on the Z axis, default to false'
---

This component is a port from [Drei's Billboard](https://drei.docs.pmnd.rs/abstractions/billboard) which rotates its content to always face the camera.

### Usage

```angular-ts
import { NgtsBillboard } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-billboard [options]="{ follow: true, lockX: false, lockY: false, lockZ: false }">
    <ngt-mesh>
        <ngt-plane-geometry />
        <ngt-mesh-standard-material color="red" />
    </ngt-mesh>
</ngts-billboard>
```
