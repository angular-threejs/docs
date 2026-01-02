---
options:
    extends:
        - name: TrackballControls
          link: https://threejs.org/docs/#examples/en/controls/TrackballControls
    properties:
        - name: camera
          type: THREE.Camera
          description: >-
              The camera to control. If not provided, the default camera will be used.
        - name: domElement
          type: HTMLElement
          description: >-
              The DOM element to attach the controls to. If not provided, the current connected element will be used.
        - name: target
          type: '[number, number, number]'
          description: >-
              The target point to orbit around. Default: [0, 0, 0]
        - name: makeDefault
          type: boolean
          description: >-
              Whether to make this control the default one. Default: false
        - name: regress
          type: boolean
          description: >-
              Whether to regress performance. Default: false
outputs:
    - name: changed
      type: any
      description: >-
          Emits when the camera position/orientation changes.
    - name: started
      type: any
      description: >-
          Emits when user interaction starts.
    - name: ended
      type: any
      description: >-
          Emits when user interaction ends.
---

`NgtsTrackballControls` is a wrapper around Three.js [TrackballControls](https://threejs.org/docs/#examples/en/controls/TrackballControls) which provides trackball-style camera controls. Unlike OrbitControls, TrackballControls have no restrictions on vertical rotation, allowing the camera to flip upside down.

### Usage

```angular-ts
import { NgtsTrackballControls } from 'angular-three-soba/controls';
```

```angular-html
<ngts-trackball-controls />
```

### With Options

```angular-html
<ngts-trackball-controls [options]="{ makeDefault: true }" />
```

### Handling Events

```angular-html
<ngts-trackball-controls
  (changed)="onControlsChange($event)"
  (started)="onStart()"
  (ended)="onEnd()"
/>
```

```angular-ts
onControlsChange(event: any) {
  console.log('Camera changed');
}

onStart() {
  console.log('User interaction started');
}

onEnd() {
  console.log('User interaction ended');
}
```
