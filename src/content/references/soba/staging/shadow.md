---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: colorStop
          type: number
          description: >-
              Position of the color stop in the radial gradient (0-1). Default: 0.0
        - name: fog
          type: boolean
          description: >-
              Whether the shadow is affected by fog. Default: false
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the shadow. Default: 'black'
        - name: opacity
          type: number
          description: >-
              Opacity of the shadow (0-1). Default: 0.5
        - name: depthWrite
          type: boolean
          description: >-
              Whether to write to the depth buffer. Default: false
---

`NgtsShadow` is a port of [Drei's Shadow](https://drei.docs.pmnd.rs/staging/shadow) which renders a simple circular drop shadow using a canvas-generated radial gradient texture.

This creates a flat plane with a transparent gradient that simulates a soft shadow beneath objects.

## Usage

### Basic Drop Shadow

```angular-html
<ngt-mesh [position]="[0, 1, 0]">
  <ngt-sphere-geometry />
  <ngt-mesh-standard-material color="hotpink" />
</ngt-mesh>

<ngts-shadow
  [options]="{ color: 'black', opacity: 0.5 }"
  [scale]="[2, 2, 1]"
/>
```

### Colored Shadow

```angular-html
<ngt-mesh [position]="[0, 0.5, 0]">
  <ngt-box-geometry />
  <ngt-mesh-standard-material color="orange" />
</ngt-mesh>

<ngts-shadow
  [options]="{ color: '#8B4513', opacity: 0.4 }"
  [scale]="[1.5, 1.5, 1]"
/>
```

### Adjusted Color Stop

The `colorStop` controls where the gradient transitions:

```angular-html
<!-- Softer, more spread out shadow -->
<ngts-shadow
  [options]="{ colorStop: 0.0, opacity: 0.3 }"
  [scale]="[3, 3, 1]"
/>

<!-- Sharper, more concentrated shadow -->
<ngts-shadow
  [options]="{ colorStop: 0.5, opacity: 0.6 }"
  [scale]="[1.5, 1.5, 1]"
/>
```

### Multiple Shadows

```angular-html
<ngt-group>
  <ngt-mesh [position]="[-1.5, 0.5, 0]">
    <ngt-sphere-geometry *args="[0.5]" />
    <ngt-mesh-standard-material color="red" />
  </ngt-mesh>
  <ngts-shadow
    [position]="[-1.5, 0.01, 0]"
    [options]="{ opacity: 0.4 }"
    [scale]="[1, 1, 1]"
  />

  <ngt-mesh [position]="[1.5, 0.5, 0]">
    <ngt-sphere-geometry *args="[0.5]" />
    <ngt-mesh-standard-material color="blue" />
  </ngt-mesh>
  <ngts-shadow
    [position]="[1.5, 0.01, 0]"
    [options]="{ opacity: 0.4 }"
    [scale]="[1, 1, 1]"
  />
</ngt-group>
```

### With Fog

```angular-html
<!-- Enable fog interaction -->
<ngts-shadow
  [options]="{ fog: true, color: 'black', opacity: 0.5 }"
  [scale]="[2, 2, 1]"
/>
```

### Dynamic Shadow Size

```angular-html
@let shadowScale = calculateShadowScale();

<ngts-shadow
  [options]="{ opacity: 0.5 }"
  [scale]="shadowScale"
  [position]="[0, 0.01, 0]"
/>
```

## Notes

- The shadow is rendered as a flat plane facing upward (Y-up)
- Position the shadow slightly above the ground (e.g., y: 0.01) to prevent z-fighting
- Scale determines the size of the shadow on the X and Y axes
- Use `colorStop` to control the gradient sharpness
- This is a simple, performant alternative to real-time shadow mapping
- Best used for static objects or simple drop shadows
