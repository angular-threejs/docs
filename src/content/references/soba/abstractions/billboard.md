---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: follow
          type: boolean
          description: Whether the billboard should follow (face) the camera. Default true.
        - name: lockX
          type: boolean
          description: Lock rotation on the X axis, preventing the billboard from rotating around X. Default false.
        - name: lockY
          type: boolean
          description: Lock rotation on the Y axis, preventing the billboard from rotating around Y. Default false.
        - name: lockZ
          type: boolean
          description: Lock rotation on the Z axis, preventing the billboard from rotating around Z. Default false.
---

A component that rotates its contents to always face the camera (billboarding effect). Useful for sprites, labels, or any content that should always face the viewer.
