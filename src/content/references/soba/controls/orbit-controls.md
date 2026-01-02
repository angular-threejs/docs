---
options:
    extends:
        - name: OrbitControls
          link: https://threejs.org/docs/#examples/en/controls/OrbitControls
    properties:
        - name: camera
          type: NgtCamera
          description: >-
              The camera to control. If not provided, the default camera will be used.
        - name: domElement
          type: HTMLElement
          description: >-
              The DOM element to attach the controls to. If not provided, the current connected element will be used.
        - name: target
          type: '[number, number, number]'
          description: >-
              The coordinates that the camera will orbit around. Default: [0, 0, 0]
        - name: makeDefault
          type: boolean
          description: >-
              Whether to make this control the default one. Default: false
        - name: regress
          type: boolean
          description: >-
              Whether to regress performance. Default: false
        - name: enableDamping
          type: boolean
          description: >-
              Whether to enable damping (smoothness) of the camera movement. Default: true
        - name: keyEvents
          type: boolean | HTMLElement
          description: >-
              Whether to enable keyboard events for the controls, or an HTML element to listen on. Default: false
---

`NgtsOrbitControls` is a wrapper around Three.js [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) which allows you to rotate the camera around a target point using mouse and touch events.

### Usage

```angular-ts
import { NgtsOrbitControls } from 'angular-three-soba/controls';
```

```angular-html
<ngts-orbit-controls />
```

### With Options

```angular-html
<ngts-orbit-controls [options]="{ autoRotate: true, enableZoom: false }" />
```

### Make Default

When `makeDefault` is true, the controls will be set as the default controls in the store, allowing other components to access them.

```angular-html
<ngts-orbit-controls [options]="{ makeDefault: true }" />
```
