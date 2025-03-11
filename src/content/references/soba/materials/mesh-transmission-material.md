---
options:
    extends:
        - name: THREE.MeshPhysicalMaterial
          link: https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial
        - name: MeshTransmissionMaterial
          link: https://github.com/pmndrs/drei-vanilla/blob/main/src/materials/MeshTransmissionMaterial.ts
    properties:
        - name: anisotropicBlur
          type: number
          description: >-
              The amount of anisotropic blurring used to reduce artifacts.
        - name: buffer
          type: THREE.Texture
          description: >-
              The buffer texture that is used to store the transmission data.
        - name: transmissionSampler
          type: boolean
          description: >-
              transmissionSampler, you can use the threejs transmission sampler texture that is
              generated once for all transmissive materials. The upside is that it can be faster if you
              use multiple MeshPhysical and Transmission materials, the downside is that transmissive materials
              using this can't see other transparent or transmissive objects, default: false
        - name: backside
          type: boolean
          description: >-
              Render the backside of the material (more cost, better results), default: false
        - name: backsideThickness
          type: number
          description: >-
              Backside thickness (when backside is true), default: 0
        - name: backsideEnvMapIntensity
          type: number
          description: >-
              Backside env map intensity (when backside is true), default: 1
        - name: resolution
          type: number
          description: >-
              Resolution of the local buffer, default: undefined (fullscreen)
        - name: backsideResolution
          type: number
          description: >-
              Resolution of the local buffer for backfaces, default: undefined (fullscreen)
        - name: samples
          type: number
          description: >-
              Refraction samples, default: 6
        - name: background
          type: THREE.Texture | THREE.Color | null
          description: >-
              Buffer scene background (can be a texture, a cubetexture or a color), default: null
---

`NgtsMeshTransmissionMaterial`, port from [Drei's MeshTransmissionMaterial](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material), is an enhanced version of [`THREE.MeshPhysicalMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial) with advanced features for realistic transmission effects. It maintains all standard `THREE.MeshPhysicalMaterial` properties (`transmission`, `thickness`, `IOR`, `roughness` etc...) while adding: chromatic aberration, noise-based roughness blur, primitive anisotropic blur support, and ability to _see_ other transmissive/transparent objects.

### Usage

```angular-ts
import { NgtsMeshTransmissionMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-mesh>
    <ngt-mesh-transmission-material />
</ngt-mesh>
```

## Performance Considerations

`NgtsMeshTransmissionMaterial` causes an additional render pass of the scene. You can use low `samples` and `resolution` for better performance.

### Roughness

With `roughness`, you might need to consider a small resolutions (i.e: `32x32`) for good performance with good visuals.

### Opt-out of transmission

For performance and visual reasons, the parent `ngt-mesh` is temporarily removed from the render stack. If you have objects that you do not want to see reflected in the material, you can render those objects as `ngt-mesh` content.

### Sharing buffer textures

For improved performance when using multiple `NgtsMeshTransmissionMaterial`, you can share buffer textures in different ways:

#### Using `transmissionSampler` property

This property enables internal THREE.js buffer used by `THREE.MeshPhysicalMaterial`

```angular-html
<ngt-mesh>
    <ngts-mesh-transmission-material [options]="{ transmissionSampler: true }" />
</ngt-mesh>
<ngt-mesh>
    <ngts-mesh-transmission-material [options]="{ transmissionSampler: true }" />
</ngt-mesh>
```

:::note

With this approach, transmissive materials cannot _see_ other transparent or transmissive objects.

:::

#### With `injectFBO`

You can create an FBO with [`injectFBO`](/reference/soba/misc/fbo) and pass the texture to `buffer` option

```angular-ts
@Component({
    template: `
        <ngt-mesh>
            <ngts-mesh-transmission-material [options]="{ buffer: fbo.texture }" />
        </ngt-mesh>
        <ngt-mesh>
            <ngts-mesh-transmission-material [options]="{ buffer: fbo.texture }" />
        </ngt-mesh>
    `
})
export class MyCmp {
    protected fbo = injectFBO();

    constructor() {
        injectBeforeRender(({ gl, scene, camera }) => {
            gl.setRenderTarget(this.fbo);
            gl.render(scene, camera);
            gl.setRenderTarget(null);
        });
    }
}
```

#### Using `NgtsPerspectiveCamera`

You can also use a [`NgtsPerspectiveCamera`](/reference/soba/cameras/perspective-camera) to create a shared buffer

```angular-html
<ngts-perspective-camera [options]="{ makeDefault: true, fov: 75, position: [10, 0, 15], resolution: 1024 }">
    <ng-template cameraContent let-texture>
        <ngt-mesh>
            <ngts-mesh-transmission-material [options]="{ buffer: texture }" />
        </ngt-mesh>
        <ngt-mesh>
            <ngts-mesh-transmission-material [options]="{ buffer: texture }" />
        </ngt-mesh>
    </ng-template>
</ngts-perspective-camera>
```
