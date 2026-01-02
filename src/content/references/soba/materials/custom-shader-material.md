---
options:
    properties:
        - name: baseMaterial
          type: Material | Class<Material> | ElementRef<Material>
          required: true
          description: >-
              The base material to extend. Can be a material instance, a material class, or an ElementRef to a material.
        - name: attach
          type: string
          default: "'material'"
          description: >-
              How to attach the material to its parent object.
        - name: vertexShader
          type: string
          description: >-
              The vertex shader code.
        - name: fragmentShader
          type: string
          description: >-
              The fragment shader code.
        - name: uniforms
          type: 'Record<string, { value: any }>'
          description: >-
              An object containing the uniforms for the shader.
        - name: cacheKey
          type: string
          description: >-
              Cache key for shader compilation.
---

`NgtsCustomShaderMaterial` is a port of [three-custom-shader-material](https://github.com/FarazzShaworiya/THREE-CustomShaderMaterial) that allows you to create custom shader materials by extending existing THREE.js materials. It provides a flexible way to define your own shaders while retaining all the features of the base material.

### Usage

```angular-ts
import { NgtsCustomShaderMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-points>
    <ngt-icosahedron-geometry *args="[1, 32]" />
    <ngts-custom-shader-material
        [baseMaterial]="PointsMaterial"
        [options]="{
            vertexShader: myVertexShader,
            fragmentShader: myFragmentShader,
            uniforms: { time: { value: 0 } }
        }"
    />
</ngt-points>
```

### Peer Dependencies

Requires `three-custom-shader-material`:

```bash
npm install three-custom-shader-material
```

### Example with MeshPhysicalMaterial

```angular-ts
import * as THREE from 'three';

@Component({
    template: `
        <ngt-mesh>
            <ngt-sphere-geometry />
            <ngts-custom-shader-material
                [baseMaterial]="MeshPhysicalMaterial"
                [options]="{
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    uniforms: uniforms,
                    roughness: 0.5,
                    metalness: 0.8
                }"
            />
        </ngt-mesh>
    `
})
export class CustomMaterial {
    MeshPhysicalMaterial = THREE.MeshPhysicalMaterial;

    vertexShader = `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
        }
    `;

    fragmentShader = `
        varying vec3 vPosition;
        void main() {
            csm_DiffuseColor = vec4(vPosition * 0.5 + 0.5, 1.0);
        }
    `;

    uniforms = {
        time: { value: 0 }
    };
}
```
