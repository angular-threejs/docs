---
options:
    extends:
        - name: THREE.OrthographicCamera
          link: 'https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera'
    properties:
        - name: 'frames'
          type: 'number'
          description: 'how many frames to render the FBO, default to Infinity'
        - name: 'resolution'
          type: 'number'
          description: 'the resolution of the FBO, default to 256'
        - name: 'envMap'
          type: 'THREE.Texture'
          description: 'custom environment map that is temporarily set as the scene background'
        - name: 'makeDefault'
          type: 'boolean'
          description: 'registers the camera as the system default, default to false'
        - name: 'manual'
          type: 'boolean'
          description: 'makes the camera manual, default to false'
---

A responsive [`THREE.OrthographicCamera`](https://threejs.org/docs/#api/en/cameras/OrthographicCamera) with the ability to set itself as the default camera.

### Usage

```angular-ts
import { NgtsOrthographicCamera } from 'angular-three-soba/cameras';
```

```angular-html
<ngt-canvas>
    <ng-template canvasContent>
        <ngts-orthographic-camera [options]="{ makeDefault: true }" />
    </ng-template>
</ngt-canvas>
```

`NgtsOrthographicCamera` API is the same as [`NgtsPerspectiveCamera`](../perspective-camera).
