---
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: toneMapped
          type: boolean
          description: >-
              Whether the material is tone mapped. Default: false
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              The color of the lightformer. Default: 'white'
        - name: form
          type: "'circle' | 'ring' | 'rect'"
          description: >-
              The shape of the lightformer. Default: 'rect'
        - name: scale
          type: 'number | [number, number, number]'
          description: >-
              The scale of the lightformer. Can be a number or an array [x, y, z]. Default: 1
        - name: intensity
          type: number
          description: >-
              The intensity of the light emitted by the lightformer. Default: 1
        - name: target
          type: '[number, number, number] | THREE.Vector3'
          description: >-
              The target position for the lightformer to look at.
        - name: map
          type: THREE.Texture
          description: >-
              Texture map to apply to the lightformer.
---

`NgtsLightformer` is a port of [Drei's Lightformer](https://drei.docs.pmnd.rs/staging/lightformer) which draws flat rectangles, circles, or rings that mimic the look of a light-former.

When placed inside an HDRI `NgtsEnvironment`, the lightformer affects scene lighting through emissiveness - acting like a real light without the rendering expense. You can have as many as you want.

## Usage

### Basic Lightformer in Environment

```angular-html
<ngts-environment>
  <ng-template>
    <ngts-lightformer
      [options]="{
        form: 'rect',
        color: 'white',
        intensity: 1,
        scale: [10, 5, 1],
        position: [0, 10, -10]
      }"
    />
  </ng-template>
</ngts-environment>
```

### Multiple Lightformers (Studio Setup)

```angular-html
<ngts-environment [options]="{ background: true }">
  <ng-template>
    <!-- Main key light -->
    <ngts-lightformer
      [options]="{
        form: 'rect',
        color: 'white',
        intensity: 2,
        scale: [10, 5, 1],
        position: [5, 5, -5],
        target: [0, 0, 0]
      }"
    />

    <!-- Fill light -->
    <ngts-lightformer
      [options]="{
        form: 'circle',
        color: '#ffe0d0',
        intensity: 0.5,
        scale: 8,
        position: [-8, 3, 2]
      }"
    />

    <!-- Rim light -->
    <ngts-lightformer
      [options]="{
        form: 'ring',
        color: 'cyan',
        intensity: 1.5,
        scale: 3,
        position: [0, 4, 8]
      }"
    />
  </ng-template>
</ngts-environment>
```

### Colored Accent Lighting

```angular-html
<ngts-environment>
  <ng-template>
    <ngts-lightformer
      [options]="{
        form: 'rect',
        color: 'orange',
        intensity: 3,
        scale: [15, 2, 1],
        position: [0, -5, -10],
        rotation: [Math.PI / 4, 0, 0]
      }"
    />

    <ngts-lightformer
      [options]="{
        form: 'rect',
        color: 'blue',
        intensity: 2,
        scale: [15, 2, 1],
        position: [0, 10, -10],
        rotation: [-Math.PI / 4, 0, 0]
      }"
    />
  </ng-template>
</ngts-environment>
```

### With Texture Map

```angular-html
<ngts-environment>
  <ng-template>
    <ngts-lightformer
      [options]="{
        form: 'rect',
        map: gradientTexture,
        intensity: 2,
        scale: [20, 10, 1],
        position: [0, 0, -15]
      }"
    />
  </ng-template>
</ngts-environment>
```

## Notes

- Lightformers work by emitting light through the environment map
- Higher intensity values create stronger lighting effects
- Use multiple lightformers to create professional studio-like lighting setups
- The `target` option makes the lightformer face a specific point
