---
demo: 'cameras/perspective-camera/perspective-camera'
options:
  extends: 'THREE.PerspectiveCamera'
  extendsLink: 'https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera'
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

A responsive [`THREE.PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) with the ability to set itself as the default camera.

### Usage

```angular-ts
import { NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
```

```angular-html
<ngt-canvas>
    <ng-template canvasContent>
        <ngts-perspective-camera [options]="{ makeDefault: true }" />
    </ng-template>
</ngt-canvas>
```

### Content

You can also provide content which will follow the camera as it moves.

```angular-html
<ngts-perspective-camera [options]="{ makeDefault: true }">
    <ngt-mesh>
        <ngt-box-geometry />
    </ngt-mesh>
</ngts-perspective-camera>
```

### Render Target

You can use the `NgtsPerspectiveCamera` to project content onto an FBO, similar to [`THREE.CubeCamera`](https://threejs.org/docs/#api/en/cameras/CubeCamera), via `NgtsCameraContent`. The projected content will **not** follow the camera. `NgtsCameraContent` exposes a `Signal<THREE.Texture>` which you can use to assign to a material.

```angular-html
<ngts-perspective-camera>
    <ngt-mesh *cameraContent="let texture">
        <ngt-mesh-basic-material [map]="texture" />
    </ngt-mesh>
</ngts-perspective-camera>
```
