---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: opacity
          type: number
          description: >-
              Opacity of the shadows. Default: 1
        - name: width
          type: number
          description: >-
              Width of the shadow plane. Default: 1
        - name: height
          type: number
          description: >-
              Height of the shadow plane. Default: 1
        - name: blur
          type: number
          description: >-
              Blur radius of the shadows. Default: 1
        - name: near
          type: number
          description: >-
              Near clipping plane for the shadow camera. Default: 0
        - name: far
          type: number
          description: >-
              Far distance of the shadow camera. Default: 10
        - name: resolution
          type: number
          description: >-
              Resolution of the shadow map. Default: 512
        - name: smooth
          type: boolean
          description: >-
              Whether to apply smoothing to the shadows. Default: true
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the shadows. Default: '#000000'
        - name: depthWrite
          type: boolean
          description: >-
              Whether the shadows should write to the depth buffer. Default: false
        - name: frames
          type: number
          description: >-
              How many frames it can render, more yields cleaner results. Default: Infinity
        - name: scale
          type: 'number | [number, number]'
          description: >-
              Scale of the shadow plane. Can be a number or [x, y] tuple. Default: 10
---

`NgtsContactShadows` is a port of [Drei's ContactShadows](https://drei.docs.pmnd.rs/staging/contact-shadows) which creates a contact shadow implementation facing upwards (positive Y) by default.

Contact shadows are ideal for grounding objects in a scene without the complexity of traditional shadow mapping.

## Usage

### Basic Contact Shadows

```angular-html
<app-model />

<ngts-contact-shadows
  [options]="{
    opacity: 1,
    scale: 10,
    blur: 1,
    far: 10,
    resolution: 512,
    color: '#000000'
  }"
/>
```

### High-Quality Static Shadows

Since contact shadows can be expensive, you can limit the number of frames for static objects:

```angular-html
<!-- Render only once for static scenes -->
<ngts-contact-shadows [options]="{ frames: 1 }" />
```

### Soft Shadows with Smoothing

```angular-html
<ngts-contact-shadows
  [options]="{
    opacity: 0.8,
    scale: 15,
    blur: 2.5,
    far: 8,
    resolution: 1024,
    smooth: true,
    color: '#1a1a2e'
  }"
/>
```

### Non-Square Shadow Plane

```angular-html
<ngts-contact-shadows
  [options]="{
    scale: [20, 10],
    blur: 1,
    opacity: 0.6
  }"
/>
```

## Notes

- Contact shadows are Y-up oriented and render from above
- Higher resolution and blur values increase quality but also GPU cost
- For animated scenes, keep `frames` at Infinity (default)
- For static scenes, set `frames: 1` for better performance
