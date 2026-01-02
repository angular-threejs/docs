---
options:
    extends:
        - name: THREE.Points
          link: 'https://threejs.org/docs/index.html#api/en/objects/Points'
    properties:
        - name: count
          type: number
          description: >-
              Number of sparkle particles. Default: 100
        - name: speed
          type: number
          description: >-
              Animation speed factor. Default: 1
        - name: opacity
          type: number
          description: >-
              Opacity of the sparkles. Default: 1
        - name: scale
          type: 'number | [number, number, number]'
          description: >-
              Scale of the sparkles distribution area. Default: 1
        - name: noise
          type: 'number | [number, number, number]'
          description: >-
              Noise factor for particle movement. Default: 1
        - name: size
          type: number
          description: >-
              Size of individual sparkle particles.
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the sparkles.
---

`NgtsSparkles` is a port of [Drei's Sparkles](https://drei.docs.pmnd.rs/staging/sparkles) which renders animated sparkle particles floating in 3D space.

Creates a magical, sparkling effect using GPU-accelerated points with custom shaders.

## Usage

### Basic Sparkles

```angular-html
<ngts-sparkles
  [options]="{ count: 50, scale: 2, size: 6, speed: 0.4, color: 'gold' }"
/>
```

### Around an Object

```angular-html
<ngt-mesh>
  <ngt-icosahedron-geometry />
  <ngt-mesh-standard-material color="hotpink" />
</ngt-mesh>

<ngts-sparkles
  [options]="{
    count: 100,
    scale: [3, 3, 3],
    size: 4,
    speed: 0.5,
    color: 'white'
  }"
/>
```

### Magical Aura Effect

```angular-html
<ngt-group>
  <app-crystal-model />

  <ngts-sparkles
    [options]="{
      count: 200,
      scale: [2, 4, 2],
      size: 3,
      speed: 0.3,
      color: '#88ffff',
      opacity: 0.8
    }"
  />
</ngt-group>
```

### Fairy Dust Trail

```angular-html
<ngts-sparkles
  [options]="{
    count: 150,
    scale: [5, 2, 5],
    size: 2,
    speed: 0.8,
    noise: 2,
    color: '#ffaaff'
  }"
/>
```

### Fireflies Effect

```angular-html
<ngts-sparkles
  [options]="{
    count: 30,
    scale: [10, 5, 10],
    size: 8,
    speed: 0.2,
    noise: 0.5,
    color: '#ffff00',
    opacity: 0.7
  }"
/>
```

### Anisotropic Noise

Different noise values per axis create directional movement:

```angular-html
<ngts-sparkles
  [options]="{
    count: 100,
    scale: [4, 4, 4],
    size: 5,
    speed: 0.5,
    noise: [1, 2, 1],
    color: 'cyan'
  }"
/>
```

### Subtle Background Particles

```angular-html
<ngts-sparkles
  [options]="{
    count: 500,
    scale: 20,
    size: 1,
    speed: 0.1,
    opacity: 0.3,
    color: 'white'
  }"
/>
```

### Dynamic Color

```angular-html
@let sparkleColor = getSparkleColor();

<ngts-sparkles
  [options]="{
    count: 100,
    scale: 3,
    size: 5,
    speed: 0.5,
    color: sparkleColor
  }"
/>
```

## Notes

- Sparkles use a custom shader for GPU-accelerated animation
- The `scale` option defines the bounding box where particles are distributed
- `noise` controls how much particles deviate from their base positions
- Higher `count` values impact performance; balance visual quality with frame rate
- The `size` property sets individual particle size in pixels
- Particles are randomly distributed within the scale bounds on initialization
