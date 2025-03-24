---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: top
          type: boolean
          description: >-
              Whether to center the children along the top axis.
        - name: right
          type: boolean
          description: >-
              Whether to center the children along the right axis.
        - name: bottom
          type: boolean
          description: >-
              Whether to center the children along the bottom axis.
        - name: left
          type: boolean
          description: >-
              Whether to center the children along the left axis.
        - name: front
          type: boolean
          description: >-
              Whether to center the children along the front axis.
        - name: back
          type: boolean
          description: >-
              Whether to center the children along the back axis.
        - name: disable
          type: boolean
          description: >-
              Disable all axes.
        - name: disableX
          type: boolean
          description: >-
              Disable x-axis centering.
        - name: disableY
          type: boolean
          description: >-
              Disable y-axis centering.
        - name: disableZ
          type: boolean
          description: >-
              Disable z-axis centering.
        - name: precise
          type: boolean
          description: >-
              See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject. Default: true
        - name: cacheKey
          type: any
          description: >-
              Optional cacheKey to keep the component from recalculating on every render.
                Default: 0
outputs:
    - name: centered
      type: NgtsCenterState
      description: >-
          Emits when the component centers its children.
---

`NgtsCenter` is a port of [Drei's Center](https://drei.docs.pmnd.rs/staging/center) which is a component that calculates a bounding box and center its children accordingly.
