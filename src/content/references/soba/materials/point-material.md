---
options:
    extends:
        - name: THREE.PointsMaterial
          link: https://threejs.org/docs/index.html#api/en/materials/PointsMaterial
    properties:
        - name: size
          type: number
          description: >-
              The size of the points.
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              The color of the points.
        - name: sizeAttenuation
          type: boolean
          description: >-
              Whether points should get smaller as they get further from the camera.
        - name: map
          type: THREE.Texture
          description: >-
              A texture to apply to the points.
        - name: transparent
          type: boolean
          description: >-
              Whether the material is transparent.
        - name: opacity
          type: number
          description: >-
              The opacity of the material (0-1).
---

`NgtsPointMaterial` is a port of [Drei's PointMaterial](https://drei.docs.pmnd.rs/shaders/point-material) that renders point clouds with consistent size regardless of distance. It extends `THREE.PointsMaterial` with additional shader modifications for improved point rendering with size attenuation control.

### Usage

```angular-ts
import { NgtsPointMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-points>
    <ngt-buffer-geometry>
        <ngt-buffer-attribute attach="attributes.position" [args]="[positions, 3]" />
    </ngt-buffer-geometry>
    <ngts-point-material [options]="{ size: 0.1, color: 'orange', sizeAttenuation: true }" />
</ngt-points>
```

### Starfield Example

```angular-ts
@Component({
    template: `
        <ngt-points>
            <ngt-buffer-geometry>
                <ngt-buffer-attribute attach="attributes.position" [args]="[positions, 3]" />
            </ngt-buffer-geometry>
            <ngts-point-material
                [options]="{
                    size: 0.02,
                    color: 'white',
                    sizeAttenuation: true,
                    transparent: true,
                    opacity: 0.8
                }"
            />
        </ngt-points>
    `
})
export class Starfield {
    positions = new Float32Array(
        Array.from({ length: 5000 }, () => (Math.random() - 0.5) * 50).flat()
    );
}
```

### With Texture

```angular-ts
@Component({
    template: `
        @if (texture(); as map) {
            <ngt-points>
                <ngt-buffer-geometry>
                    <ngt-buffer-attribute attach="attributes.position" [args]="[positions, 3]" />
                </ngt-buffer-geometry>
                <ngts-point-material
                    [options]="{
                        size: 0.5,
                        map: map,
                        transparent: true,
                        alphaTest: 0.5
                    }"
                />
            </ngt-points>
        }
    `
})
export class TexturedPoints {
    texture = textureResource(() => 'particle.png');
    positions = new Float32Array([/* ... */]);
}
```

The `NgtsPointMaterial` is particularly useful for particle systems, star fields, and other point-based visualizations where you need fine control over point appearance.
