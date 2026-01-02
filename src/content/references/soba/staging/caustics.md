---
options:
    extends:
        - name: THREE.Group
          link: 'https://threejs.org/docs/index.html#api/en/objects/Group'
    properties:
        - name: frames
          type: number
          description: >-
              How many frames to render. Set to Infinity for continuous rendering. Default: 1
        - name: debug
          type: boolean
          description: >-
              Enables visual debugging cues including camera helper. Default: false
        - name: causticsOnly
          type: boolean
          description: >-
              When enabled, displays only caustics and hides the models. Default: false
        - name: backside
          type: boolean
          description: >-
              When enabled, includes back face rendering. Default: false
        - name: ior
          type: number
          description: >-
              The Index of Refraction (IOR) value for front faces. Default: 1.1
        - name: backsideIOR
          type: number
          description: >-
              The Index of Refraction (IOR) value for back faces. Default: 1.1
        - name: worldRadius
          type: number
          description: >-
              The world-space texel size for caustic calculations. Default: 0.3125
        - name: intensity
          type: number
          description: >-
              Intensity of the projected caustics effect. Default: 0.05
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              Color of the caustics effect. Default: 'white'
        - name: resolution
          type: number
          description: >-
              Buffer resolution for caustic texture rendering. Default: 2024
        - name: lightSource
          type: 'THREE.Vector3 | THREE.Object3D | [number, number, number]'
          description: >-
              Light source position or object. Default: [5, 5, 5]
---

`NgtsCaustics` is a port of [Drei's Caustics](https://drei.docs.pmnd.rs/staging/caustics) which renders realistic caustic light patterns on surfaces.

Caustics are the light patterns created when light is refracted or reflected by curved transparent surfaces (like water, glass, or crystals).

## Usage

### Basic Caustics

```angular-html
<ngts-caustics>
  <ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-physical-material [transmission]="1" [roughness]="0" />
  </ngt-mesh>
</ngts-caustics>
```

### Glass Sphere

```angular-html
<ngts-caustics
  [options]="{
    frames: Infinity,
    intensity: 0.05,
    color: 'white',
    ior: 1.5
  }"
>
  <ngt-mesh>
    <ngt-sphere-geometry *args="[1, 64, 64]" />
    <ngt-mesh-physical-material
      [transmission]="1"
      [roughness]="0"
      [thickness]="2"
      [ior]="1.5"
    />
  </ngt-mesh>
</ngts-caustics>
```

### Crystal with Colored Caustics

```angular-html
<ngts-caustics
  [options]="{
    frames: Infinity,
    intensity: 0.1,
    color: '#88ccff',
    ior: 2.0
  }"
>
  <ngt-mesh>
    <ngt-icosahedron-geometry *args="[1, 0]" />
    <ngt-mesh-physical-material
      [transmission]="1"
      [roughness]="0"
      color="white"
    />
  </ngt-mesh>
</ngts-caustics>
```

### With Custom Light Source

```angular-html
<ngt-point-light #light [position]="[10, 10, 10]" />

<ngts-caustics [options]="{ lightSource: light, intensity: 0.08 }">
  <ngt-mesh>
    <ngt-torus-geometry *args="[1, 0.4, 32, 64]" />
    <ngt-mesh-physical-material [transmission]="1" [roughness]="0" />
  </ngt-mesh>
</ngts-caustics>
```

### Backside Rendering

For thick glass objects, enable backside rendering:

```angular-html
<ngts-caustics
  [options]="{
    backside: true,
    ior: 1.5,
    backsideIOR: 1.1,
    intensity: 0.06
  }"
>
  <ngt-mesh>
    <ngt-box-geometry *args="[2, 2, 2]" />
    <ngt-mesh-physical-material [transmission]="1" [roughness]="0" />
  </ngt-mesh>
</ngts-caustics>
```

### Debug Mode

```angular-html
<ngts-caustics [options]="{ debug: true, frames: Infinity }">
  <ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-physical-material [transmission]="1" />
  </ngt-mesh>
</ngts-caustics>
```

### Caustics Only (Hide Object)

```angular-html
<ngts-caustics [options]="{ causticsOnly: true, intensity: 0.1 }">
  <ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-physical-material [transmission]="1" />
  </ngt-mesh>
</ngts-caustics>
```

### High Resolution Caustics

```angular-html
<ngts-caustics [options]="{ resolution: 4096, worldRadius: 0.2, intensity: 0.04 }">
  <ngt-mesh>
    <ngt-sphere-geometry />
    <ngt-mesh-physical-material [transmission]="1" [roughness]="0" />
  </ngt-mesh>
</ngts-caustics>
```

### Water Surface

```angular-html
<ngts-caustics
  [options]="{
    frames: Infinity,
    intensity: 0.15,
    color: '#aaddff',
    ior: 1.33,
    worldRadius: 0.5
  }"
>
  <ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]">
    <ngt-plane-geometry *args="[10, 10, 64, 64]" />
    <ngt-mesh-physical-material
      [transmission]="1"
      [roughness]="0.1"
      color="#88ccff"
    />
  </ngt-mesh>
</ngts-caustics>
```

## IOR Reference

| Material | IOR  |
| -------- | ---- |
| Air      | 1.0  |
| Water    | 1.33 |
| Glass    | 1.5  |
| Crystal  | 2.0  |
| Diamond  | 2.42 |

## Notes

- Caustics require transmissive materials (`transmission: 1` on MeshPhysicalMaterial)
- Higher `resolution` improves quality but increases GPU cost
- `worldRadius` affects the scale of the caustic pattern
- Use `frames: 1` for static scenes to render caustics once
- Use `frames: Infinity` for animated objects or moving lights
- The `lightSource` can be a Vector3 position or an Object3D reference
- Enable `backside` for thick transparent objects to get more accurate refraction
