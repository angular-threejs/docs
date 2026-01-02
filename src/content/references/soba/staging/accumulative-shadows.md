---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: frames
          type: number
          description: >-
              How many frames it can render, more yields cleaner results but takes more time. Default: 40
        - name: blend
          type: number
          description: >-
              If frames is set to Infinity, blend controls the refresh ratio. Default: 20
        - name: limit
          type: number
          description: >-
              Limits the amount of frames rendered if frames is set to Infinity, usually to recover performance once a movable scene has settled. Default: Infinity
        - name: scale
          type: number
          description: >-
              Scale of the shadow plane. Default: 10
        - name: temporal
          type: boolean
          description: >-
              Temporal accumulates shadows over time which is more performant but has visual regression over instant results. Default: false
        - name: opacity
          type: number
          description: >-
              Opacity of the shadow plane. Default: 1
        - name: alphaTest
          type: number
          description: >-
              Discards alpha pixels below this threshold. Default: 0.75
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Shadow color. Default: 'black'
        - name: colorBlend
          type: number
          description: >-
              Color blend, how much colors turn to black. 0 is black. Default: 2
        - name: resolution
          type: number
          description: >-
              Buffer resolution for shadow map. Default: 1024
        - name: toneMapped
          type: boolean
          description: >-
              Texture tone mapping. Default: true
---

`NgtsAccumulativeShadows` is a port of [Drei's AccumulativeShadows](https://drei.docs.pmnd.rs/staging/accumulative-shadows) which creates a planar, Y-up oriented shadow-catcher that can accumulate into soft shadows with zero performance impact after all frames have accumulated.

It can be temporal (accumulating over time for better performance) or instantaneous (more expensive depending on frame count).

You must pair it with light sources and scene objects that cast shadows. Best used with `NgtsRandomizedLights`, which jiggles lights around to create realistic raycast-like shadows and ambient occlusion.

```angular-html
<ngt-color *args="['goldenrod']" attach="background" />
<app-scene-objects />

<ngts-accumulative-shadows
  [options]="{
    temporal: true,
    frames: 100,
    color: 'black',
    colorBlend: 2,
    opacity: 0.8,
    scale: 12,
    alphaTest: 0.75
  }"
>
  <ngts-randomized-lights
    [options]="{
      amount: 8,
      radius: 4,
      ambient: 0.5,
      bias: 0.001,
      position: [5, 5, -10]
    }"
  />
</ngts-accumulative-shadows>

<ngts-environment [options]="{ preset: 'city' }" />
```
