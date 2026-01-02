---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: enabled
          type: boolean
          description: >-
              Whether the floating animation is enabled. Default: true
        - name: speed
          type: number
          description: >-
              The speed of the floating animation. Default: 1
        - name: rotationIntensity
          type: number
          description: >-
              The intensity of the rotation during the floating animation. Default: 1
        - name: floatIntensity
          type: number
          description: >-
              The intensity of the vertical movement during the floating animation. Default: 1
        - name: floatingRange
          type: '[number, number]'
          description: >-
              Range of the floating animation [min, max] in world units. Default: [-0.1, 0.1]
        - name: autoInvalidate
          type: boolean
          description: >-
              Automatically invalidates the scene when the frameloop is set to 'demand'. Default: false
---

`NgtsFloat` is a port of [Drei's Float](https://drei.docs.pmnd.rs/staging/float) which simulates floating objects by applying a configurable up-and-down motion with optional rotation.

## Usage

### Basic Floating Object

```angular-html
<ngts-float [options]="{ speed: 1, rotationIntensity: 1, floatIntensity: 1 }">
  <ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-standard-material color="hotpink" />
  </ngt-mesh>
</ngts-float>
```

### Gentle Float with No Rotation

```angular-html
<ngts-float
  [options]="{
    speed: 0.5,
    rotationIntensity: 0,
    floatIntensity: 0.5,
    floatingRange: [-0.05, 0.05]
  }"
>
  <ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material color="skyblue" />
  </ngt-mesh>
</ngts-float>
```

### Dramatic Floating Effect

```angular-html
<ngts-float
  [options]="{
    speed: 2,
    rotationIntensity: 2,
    floatIntensity: 3,
    floatingRange: [-0.5, 0.5]
  }"
>
  <app-model />
</ngts-float>
```

### Conditional Animation

```angular-html
@let isFloating = floatingEnabled();

<ngts-float [options]="{ enabled: isFloating, speed: 1 }">
  <ngt-mesh>
    <ngt-torus-geometry *args="[1, 0.4, 16, 32]" />
    <ngt-mesh-standard-material color="gold" />
  </ngt-mesh>
</ngts-float>
```

### With On-Demand Rendering

When using on-demand rendering (frameloop: 'demand'), enable auto-invalidation:

```angular-html
<ngts-float [options]="{ autoInvalidate: true, speed: 1 }">
  <ngt-mesh>
    <ngt-icosahedron-geometry />
    <ngt-mesh-standard-material color="coral" />
  </ngt-mesh>
</ngts-float>
```

### Floating Text

```angular-html
<ngts-float [options]="{ speed: 0.8, floatIntensity: 0.8, rotationIntensity: 0.3 }">
  <ngts-text3d [options]="{ font: 'fonts/helvetiker_bold.typeface.json' }">
    Hello
    <ngt-mesh-standard-material color="white" />
  </ngts-text3d>
</ngts-float>
```

## Notes

- The floating effect uses sine waves for smooth, natural motion
- Rotation affects all three axes with slight variations
- The `floatingRange` determines the vertical distance of the floating motion
- Use `autoInvalidate` when your scene uses on-demand rendering
