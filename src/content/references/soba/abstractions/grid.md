---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: planeArgs
          type: ConstructorArguments<THREE.PlaneGeometry>
          description: >-
              Arguments for the plane geometry. Default []
        - name: cellThickness
          type: number
          description: >-
              Cell thickness, default: 0.5
        - name: cellColor
          type: THREE.ColorRepresentation
          description: >-
              Cell color, default: black
        - name: sectionSize
          type: number
          description: >-
              Section size, default: 1
        - name: sectionThickness
          type: number
          description: >-
              Section thickness, default: 0.1
        - name: sectionColor
          type: THREE.ColorRepresentation
          description: >-
              Section color, default: black
        - name: followCamera
          type: boolean
          description: >-
              Whether to follow the camera, default: true
        - name: infiniteGrid
          type: boolean
          description: >-
              Whether to make the grid infinite, default: false
        - name: fadeDistance
          type: number
          description: >-
              Fade distance, default: 100
        - name: fadeStrength
          type: number
          description: >-
              Fade strength, default: 10
        - name: fadeFrom
          type: number
          description: >-
              Fade from camera (1) or origin (0), or somewhere in between, default: camera
        - name: side
          type: THREE.Side
          description: >-
              Material side, default: THREE.BackSide
---

`NgtsGrid` is a port of [Drei's Grid](https://drei.docs.pmnd.rs/gizmos/grid#grid) which is a y-up oriented; shader-based grid implementation.
