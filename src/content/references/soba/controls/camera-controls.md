---
credits:
    text: 'Credits: Drei camera controls'
    link: https://codesandbox.io/s/sew669
options:
    extends:
        - name: CameraControls
          link: https://github.com/yomotsu/camera-controls
    properties:
        - name: camera
          type: NgtCamera
          description: >-
              The camera to control. If not provided, the default camera will be used.
        - name: domElement
          type: HTMLElement
          description: >-
              The DOM element to attach the controls to. If not provided, the current connected element will be used.
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
          The event object that is emitted when the camera is changed.
    - name: started
      type: any
      description: >-
          The event object that is emitted when the camera starts moving.
    - name: ended
      type: any
      description: >-
          The event object that is emitted when the camera stops moving.
---

`NgtsCameraControls` is a port of [Drei's CameraControls](https://drei.docs.pmnd.rs/controls/camera-controls) that is a wrapper around [CameraControls](https://github.com/yomotsu/camera-controls) which allows you to control the camera with mouse and touch events.

### Usage

```angular-ts
import { NgtsCameraControls } from 'angular-three-soba/controls';
```

```angular-html
<ngts-camera-controls />
```
