---
options:
    extends:
        - name: PointerLockControls
          link: https://threejs.org/docs/#examples/en/controls/PointerLockControls
    properties:
        - name: camera
          type: THREE.Camera
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
        - name: enabled
          type: boolean
          description: >-
              Whether the controls are enabled. Default: true
        - name: selector
          type: string
          description: >-
              A CSS selector for elements that will trigger pointer lock on click.
outputs:
    - name: lock
      type: void
      description: >-
          Emits when the pointer is locked.
    - name: unlock
      type: void
      description: >-
          Emits when the pointer is unlocked.
    - name: change
      type: any
      description: >-
          Emits when the camera orientation changes.
---

`NgtsPointerLockControls` is a wrapper around Three.js [PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls) which provides first-person style controls by locking the mouse pointer.

### Usage

```angular-ts
import { NgtsPointerLockControls } from 'angular-three-soba/controls';
```

```angular-html
<ngts-pointer-lock-controls />
```

### With Selector

Use the `selector` option to specify which elements should trigger pointer lock when clicked.

```angular-html
<ngts-pointer-lock-controls [options]="{ selector: '#lock-button' }" />
```

### Handling Events

```angular-html
<ngts-pointer-lock-controls
  (lock)="onLock()"
  (unlock)="onUnlock()"
  (change)="onChange($event)"
/>
```

```angular-ts
onLock() {
  console.log('Pointer locked');
}

onUnlock() {
  console.log('Pointer unlocked');
}

onChange(event: any) {
  console.log('Camera orientation changed');
}
```
