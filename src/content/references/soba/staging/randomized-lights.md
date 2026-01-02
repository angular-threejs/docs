---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: frames
          type: number
          description: >-
              How many frames it will jiggle the lights. Default: 1
        - name: amount
          type: number
          description: >-
              The number of lights to create. Default: 8
        - name: radius
          type: number
          description: >-
              The radius within which the lights will be randomly positioned. Default: 1
        - name: ambient
          type: number
          description: >-
              The ambient light intensity. Default: 0.5
        - name: position
          type: '[number, number, number]'
          description: >-
              The base position of the lights. Default: [0, 0, 0]
        - name: intensity
          type: number
          description: >-
              The intensity of the lights. Default: Math.PI (Three.js 155+)
        - name: bias
          type: number
          description: >-
              The shadow bias for the lights. Default: 0.001
        - name: mapSize
          type: number
          description: >-
              The size of the shadow map for the lights. Default: 512
        - name: size
          type: number
          description: >-
              Size of the shadow camera frustum. Default: 5
        - name: near
          type: number
          description: >-
              Shadow camera near plane distance. Default: 0.5
        - name: far
          type: number
          description: >-
              Shadow camera far plane distance. Default: 500
        - name: castShadow
          type: boolean
          description: >-
              Whether the lights cast shadows. Default: true
---

`NgtsRandomizedLights` is a port of [Drei's RandomizedLights](https://drei.docs.pmnd.rs/staging/accumulative-shadows#randomizedlights) which creates a randomized light that internally runs multiple lights and jiggles them around to create realistic raycast-like shadows and ambient occlusion.

This component is context-aware: when paired with `NgtsAccumulativeShadows`, it will automatically take the number of frames from its parent.

```angular-html
<ngts-accumulative-shadows [options]="{ temporal: true, frames: 100 }">
  <ngts-randomized-lights
    [options]="{
      amount: 8,
      radius: 4,
      ambient: 0.5,
      bias: 0.001,
      position: [5, 5, -10],
      intensity: Math.PI,
      mapSize: 512
    }"
  />
</ngts-accumulative-shadows>
```

You can also use it standalone for dynamic shadow effects:

```angular-html
<ngts-randomized-lights
  [options]="{
    amount: 4,
    radius: 2,
    position: [0, 10, 0],
    castShadow: true
  }"
/>
```
