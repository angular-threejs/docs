---
options:
    properties:
        - name: distance
          type: number
          description: >-
              Distance of the sky sphere from the camera. Default: 1000
        - name: inclination
          type: number
          description: >-
              Vertical angle of the sun (0-1, where 0.5 is horizon). Default: 0.6
        - name: azimuth
          type: number
          description: >-
              Horizontal angle of the sun (0-1, representing full rotation). Default: 0.1
        - name: mieCoefficient
          type: number
          description: >-
              Mie scattering coefficient. Controls haze and sun disc intensity. Default: 0.005
        - name: mieDirectionalG
          type: number
          description: >-
              Mie scattering directional parameter. Controls sun disc size. Default: 0.8
        - name: rayleigh
          type: number
          description: >-
              Rayleigh scattering coefficient. Higher values create bluer skies. Default: 0.5
        - name: turbidity
          type: number
          description: >-
              Atmospheric turbidity. Higher values create hazier atmospheres. Default: 10
        - name: sunPosition
          type: THREE.Vector3
          description: >-
              Direct sun position vector. Overrides inclination/azimuth if set.
---

`NgtsSky` is a port of [Drei's Sky](https://drei.docs.pmnd.rs/staging/sky) which renders a procedural sky dome using atmospheric scattering simulation.

Based on the Three.js Sky shader which simulates realistic sky colors based on sun position.

## Usage

### Basic Sky

```angular-html
<ngts-sky />
```

### Sunset Sky

```angular-html
<ngts-sky
  [options]="{
    turbidity: 8,
    rayleigh: 2,
    inclination: 0.49,
    azimuth: 0.25
  }"
/>
```

### Midday Sky

```angular-html
<ngts-sky
  [options]="{
    turbidity: 10,
    rayleigh: 0.5,
    inclination: 0.6,
    azimuth: 0.1
  }"
/>
```

### Night Sky (Low Sun)

```angular-html
<ngts-sky
  [options]="{
    turbidity: 20,
    rayleigh: 0.1,
    inclination: 0.05,
    azimuth: 0.5
  }"
/>
```

### Dawn/Dusk

```angular-html
<ngts-sky
  [options]="{
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    inclination: 0.52,
    azimuth: 0.25
  }"
/>
```

### Hazy Atmosphere

```angular-html
<ngts-sky
  [options]="{
    turbidity: 20,
    rayleigh: 0.5,
    mieCoefficient: 0.03,
    mieDirectionalG: 0.9,
    inclination: 0.6
  }"
/>
```

### Direct Sun Position

Override inclination/azimuth with a direct position vector:

```angular-html
<ngts-sky
  [options]="{
    sunPosition: sunPosition,
    turbidity: 10,
    rayleigh: 2
  }"
/>
```

```angular-ts
// In component
sunPosition = new THREE.Vector3(100, 50, 100);
```

### Animated Day/Night Cycle

```angular-ts
@Component({
  template: `
    <ngts-sky [options]="{ inclination: inclination(), turbidity: 10, rayleigh: 2 }" />
  `,
})
export class Scene {
  inclination = signal(0.5);

  constructor() {
    // Animate sun position over time
    injectBeforeRender(({ clock }) => {
      const time = clock.getElapsedTime();
      this.inclination.set(0.5 + Math.sin(time * 0.1) * 0.4);
    });
  }
}
```

### With Directional Light

Sync a directional light with the sky's sun position:

```angular-html
<ngts-sky [options]="{ inclination: 0.5, azimuth: 0.25 }" />

<ngt-directional-light
  [position]="sunLightPosition"
  [intensity]="1.5"
  [castShadow]="true"
/>
```

## Parameter Reference

| Parameter         | Effect                  | Low Value       | High Value       |
| ----------------- | ----------------------- | --------------- | ---------------- |
| `turbidity`       | Atmospheric haziness    | Clear sky       | Foggy/dusty      |
| `rayleigh`        | Blue color intensity    | Less blue       | Deeper blue      |
| `mieCoefficient`  | Sun halo/glow intensity | No halo         | Strong halo      |
| `mieDirectionalG` | Sun disc size           | Larger sun disc | Smaller sun disc |
| `inclination`     | Sun height (0-1)        | Below horizon   | Above head       |
| `azimuth`         | Sun rotation (0-1)      | East            | Full circle      |

## Notes

- The sky shader simulates Rayleigh and Mie scattering for realistic atmospheric effects
- `inclination` of 0.5 places the sun at the horizon; values above move it higher
- `azimuth` controls horizontal rotation of the sun around the scene
- Use `sunPosition` for precise control, overriding inclination/azimuth
- Combine with a directional light positioned at the same sun location for accurate shadows
- The `distance` parameter affects how large the sky sphere appears
