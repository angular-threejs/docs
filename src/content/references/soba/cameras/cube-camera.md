---
demo: 'cameras/cube-camera/cube-camera'
options:
  extends: 'THREE.CubeCamera'
  extendsLink: 'https://threejs.org/docs/index.html#api/en/cameras/CubeCamera'
  properties:
    - name: 'frames'
      type: 'number'
      description: 'how many frames to render the FBO, default to Infinity'
    - name: 'resolution'
      type: 'number'
      description: 'the resolution of the FBO, default to 256'
    - name: 'near'
      type: 'number'
      description: 'the near plane of the camera, default to 0.1'
    - name: 'far'
      type: 'number'
      description: 'the far plane of the camera, default to 1000'
    - name: 'envMap'
      type: 'THREE.Texture'
      description: 'custom environment map that is temporarily set as the scene background'
    - name: 'fog'
      type: 'THREE.Fog | THREE.FogExp2'
      description: 'custom fog that is temporarily set as the scene fog'
---

An abstraction around [`THREE.CubeCamera`](https://threejs.org/docs/index.html#api/en/cameras/CubeCamera) that exposes its texture (render target) via `NgtsCameraContent` directive. Before rendering to the render target, `NgtsCameraContent` will be set to invisible to exclude from reflections.

### Usage

```angular-ts
import { NgtsCubeCamera, NgtsCameraContent } from 'angular-three-soba/cameras';
```

```angular-html
<ngts-cube-camera>
    <ngt-mesh *cameraContent="let texture">
        <ngt-sphere-geometry />
        <ngt-mesh-standard-material [envMap]="texture" />
    </ngt-mesh>
</ngts-cube-camera>
```

### Controlling updates

By default, `frames` is set to `Infinity`, which means that the FBO will be rendered on every frame. This is sometimes unnecessary if you have static scenes. You can control the number of frames to render by passing a number to `frames` option via `[options]="{ frames: 10 }"`.

For moving objects, you can keep `frames` as `Infinity` but use a smaller `resolution` instead. For static scenes, a good default is to set `frames` to the same number of `NgtsCubeCamera` instances. This allows each camera to render and then be picked up in each other's reflection.
