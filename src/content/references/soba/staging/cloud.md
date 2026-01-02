---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: seed
          type: number
          description: >-
              Random seed for consistent cloud generation. Default: Math.random()
        - name: segments
          type: number
          description: >-
              Number of segments/particles in the cloud. Default: 20
        - name: bounds
          type: '[number, number, number]'
          description: >-
              Bounding box dimensions for cloud distribution. Default: [5, 1, 1]
        - name: concentrate
          type: "'inside' | 'outside' | 'random'"
          description: >-
              How segments are distributed within bounds. Default: 'inside'
        - name: volume
          type: number
          description: >-
              Volume/thickness of the segments. Default: 6
        - name: smallestVolume
          type: number
          description: >-
              Minimum volume when distributing clouds. Default: 0.25
        - name: distribute
          type: function
          description: >-
              Custom distribution function for precise control over particle placement.
        - name: growth
          type: number
          description: >-
              Growth factor for animated clouds (when speed > 0). Default: 4
        - name: speed
          type: number
          description: >-
              Animation speed factor. Set to 0 to disable animation. Default: 0
        - name: fade
          type: number
          description: >-
              Camera distance at which segments start fading. Default: 10
        - name: opacity
          type: number
          description: >-
              Opacity of the cloud. Default: 1
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the cloud. Default: '#ffffff'
---

`NgtsCloud` components are ports of [Drei's Cloud](https://drei.docs.pmnd.rs/staging/cloud) which render volumetric clouds using instanced billboarded sprites. The clouds consist of depth-sorted particles that face the camera.

## Components

### NgtsClouds

Container component that manages multiple cloud instances using instanced mesh rendering for performance.

| Property        | Type                    | Description                                                 | Default                   |
| --------------- | ----------------------- | ----------------------------------------------------------- | ------------------------- |
| `texture`       | `string`                | URL to the cloud texture image                              | CLOUD_URL (hosted CDN)    |
| `limit`         | `number`                | Maximum number of cloud segments. Keep tight to save memory | 200                       |
| `range`         | `number`                | Number of segments to render. If undefined, renders all     | -                         |
| `material`      | `typeof THREE.Material` | Material class to use for cloud rendering                   | THREE.MeshLambertMaterial |
| `frustumCulled` | `boolean`               | Whether to enable frustum culling                           | true                      |

### NgtsCloudInstance

Individual cloud formations placed inside a `NgtsClouds` container.

### NgtsCloud

Convenience component that renders a single cloud. Automatically wraps itself in a `NgtsClouds` container if not already inside one.

## Usage

### Multiple Clouds with Container

```angular-html
<ngts-clouds [options]="{ limit: 400 }">
  <ngts-cloud-instance
    [options]="{
      segments: 40,
      color: '#f0f0f0',
      speed: 0.4,
      bounds: [6, 2, 2],
      position: [0, 2, 0]
    }"
  />
  <ngts-cloud-instance
    [options]="{
      segments: 20,
      color: 'white',
      position: [5, 0, 0],
      opacity: 0.8
    }"
  />
</ngts-clouds>
```

### Single Cloud (Auto-wrapped)

```angular-html
<ngts-cloud
  [options]="{
    segments: 20,
    bounds: [5, 1, 1],
    color: 'white',
    fade: 10
  }"
/>
```

### Animated Clouds

```angular-html
<ngts-clouds [options]="{ limit: 200 }">
  <ngts-cloud-instance
    [options]="{
      segments: 30,
      speed: 0.2,
      growth: 4,
      color: '#ffe0e0',
      fade: 25
    }"
  />
</ngts-clouds>
```
