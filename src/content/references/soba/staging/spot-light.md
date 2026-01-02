---
options:
    extends:
        - name: THREE.SpotLight
          link: 'https://threejs.org/docs/index.html#api/en/lights/SpotLight'
    properties:
        - name: depthBuffer
          type: THREE.DepthTexture
          description: >-
              Depth texture for soft volumetric lighting. Default: null
        - name: attenuation
          type: number
          description: >-
              Light attenuation factor. Controls how quickly light fades. Default: 5
        - name: anglePower
          type: number
          description: >-
              Power of the light cone angle falloff. Default: 5
        - name: radiusTop
          type: number
          description: >-
              Radius of the light cone at the top. Default: 0.1
        - name: radiusBottom
          type: number
          description: >-
              Radius of the light cone at the bottom. Default: angle * 7
        - name: opacity
          type: number
          description: >-
              Opacity of the volumetric light cone. Default: 1
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the light. Default: 'white'
        - name: volumetric
          type: boolean
          description: >-
              Whether to render the volumetric light cone mesh. Default: true
        - name: debug
          type: boolean
          description: >-
              Whether to show the SpotLightHelper for debugging. Default: false
        - name: distance
          type: number
          description: >-
              Distance of the light. Default: 5
        - name: angle
          type: number
          description: >-
              Angle of the light cone. Default: 0.15
shadowOptions:
    properties:
        - name: distance
          type: number
          description: >-
              Distance between the shadow caster and light. Default: 0.4
        - name: alphaTest
          type: number
          description: >-
              Sets the alpha value for alpha testing. Default: 0.5
        - name: scale
          type: number
          description: >-
              Scale of the shadow caster plane. Default: 1
        - name: width
          type: number
          description: >-
              Width of the shadow map. Higher = more expensive. Default: 512
        - name: height
          type: number
          description: >-
              Height of the shadow map. Higher = more expensive. Default: 512
        - name: map
          type: THREE.Texture
          description: >-
              Texture pattern for the shadow.
        - name: shader
          type: string
          description: >-
              Custom GLSL shader for shadow effects.
---

`NgtsSpotLight` is a port of [Drei's SpotLight](https://drei.docs.pmnd.rs/staging/spot-light) which provides an enhanced spot light with optional volumetric lighting effect.

Creates a visible light cone that simulates light scattering through atmosphere or dust.

## NgtsSpotLight

### Basic Volumetric Spot Light

```angular-html
<ngts-spot-light
  [options]="{
    position: [0, 5, 0],
    angle: 0.5,
    intensity: 1,
    color: 'white'
  }"
/>
```

### Stage Lighting Effect

```angular-html
<ngts-spot-light
  [options]="{
    position: [5, 10, 0],
    angle: 0.3,
    attenuation: 5,
    anglePower: 5,
    intensity: 2,
    color: '#ffaa00'
  }"
/>
```

### Without Volumetric Cone

```angular-html
<ngts-spot-light
  [options]="{
    position: [0, 5, 0],
    volumetric: false,
    intensity: 1,
    angle: 0.5
  }"
/>
```

### Debug Mode

```angular-html
<ngts-spot-light
  [options]="{
    position: [3, 5, 3],
    debug: true,
    angle: 0.4,
    intensity: 1
  }"
/>
```

### With Depth Buffer for Soft Shadows

```angular-ts
@Component({
  template: `
    <ngts-spot-light
      [options]="{
        position: [0, 5, 0],
        depthBuffer: depthBuffer.texture(),
        angle: 0.5
      }"
    />
  `,
})
export class Scene {
  depthBuffer = depthBuffer();
}
```

### Colored Light Cone

```angular-html
<ngts-spot-light
  [options]="{
    position: [0, 8, 0],
    color: '#ff0066',
    angle: 0.6,
    attenuation: 8,
    opacity: 0.8,
    intensity: 2
  }"
/>
```

### Custom Cone Shape

```angular-html
<ngts-spot-light
  [options]="{
    position: [0, 5, 0],
    radiusTop: 0.05,
    radiusBottom: 2,
    angle: 0.5,
    attenuation: 10
  }"
/>
```

## NgtsSpotLightShadow

A shadow caster that projects textured shadow patterns.

### Basic Shadow Pattern

```angular-html
<ngts-spot-light [options]="{ position: [0, 5, 0], angle: 0.5 }">
  <ngts-spot-light-shadow [options]="{ distance: 0.4, scale: 1 }" />
</ngts-spot-light>
```

### With Texture Pattern

```angular-html
<ngts-spot-light [options]="{ position: [0, 5, 0], angle: 0.5 }">
  <ngts-spot-light-shadow
    [options]="{
      distance: 0.4,
      alphaTest: 0.5,
      scale: 1,
      width: 512,
      height: 512,
      map: shadowTexture
    }"
  />
</ngts-spot-light>
```

### High Resolution Shadow

```angular-html
<ngts-spot-light [options]="{ position: [0, 8, 0], angle: 0.4 }">
  <ngts-spot-light-shadow
    [options]="{
      width: 1024,
      height: 1024,
      map: patternTexture
    }"
  />
</ngts-spot-light>
```

### Custom Shader

Create animated or custom shadow effects with a GLSL shader:

```angular-html
<ngts-spot-light [options]="{ position: [0, 5, 0] }">
  <ngts-spot-light-shadow [shader]="customShader" [options]="{ scale: 2 }" />
</ngts-spot-light>
```

```angular-ts
customShader = `
  varying vec2 vUv;
  uniform sampler2D uShadowMap;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;
    // Animated wave effect
    float wave = sin(uv.x * 10.0 + uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(vec3(wave), 1.0);
  }
`;
```

## Shader Uniforms

The shadow shader provides these uniforms and varyings:

| Type                | Name         | Description                          |
| ------------------- | ------------ | ------------------------------------ |
| `varying vec2`      | `vUv`        | UVs of the shadow casting plane      |
| `uniform sampler2D` | `uShadowMap` | The texture provided to the map prop |
| `uniform float`     | `uTime`      | Current time for animations          |

Output the alpha channel where `1` is opaque shadow and `0` is transparent:

```glsl
gl_FragColor = vec4(vec3(1.), 1.); // Opaque shadow
gl_FragColor = vec4(vec3(0.), 1.); // Transparent (no shadow)
```

## Notes

- Volumetric lighting creates a visible cone mesh simulating light scattering
- The `attenuation` controls how quickly the volumetric effect fades
- Use `depthBuffer` from the `depthBuffer()` function for soft volumetric shadows
- `anglePower` affects the sharpness of the cone's edge falloff
- Shadow patterns require a texture with an alpha channel
- Custom shaders allow for animated or procedural shadow effects
