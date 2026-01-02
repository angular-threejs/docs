---
options:
    properties:
        - name: width
          type: number
          description: >-
              Width of the texture. Default: viewport width
        - name: height
          type: number
          description: >-
              Height of the texture. Default: viewport height
        - name: samples
          type: number
          description: >-
              The number of samples for the texture (anti-aliasing). Default: 8
        - name: stencilBuffer
          type: boolean
          description: >-
              Whether to use a stencil buffer. Default: false
        - name: depthBuffer
          type: boolean
          description: >-
              Whether to use a depth buffer. Default: true
        - name: generateMipmaps
          type: boolean
          description: >-
              Whether to generate mipmaps. Default: false
        - name: renderPriority
          type: number
          description: >-
              The render priority of the texture. Default: 0
        - name: eventPriority
          type: number
          description: >-
              The event priority of the texture. Default: 0
        - name: frames
          type: number
          description: >-
              The number of frames to render. Use Infinity for continuous rendering. Default: Infinity
        - name: compute
          type: function
          description: >-
              A custom function to compute events in the render texture portal.
---

`NgtsRenderTexture` is a port of [Drei's RenderTexture](https://drei.docs.pmnd.rs/staging/render-texture) which allows you to render a live scene into a texture that can be applied to a material.

The contents run inside a portal and are separate from the rest of the canvas, allowing independent events, environment maps, cameras, and more.

## Usage

### Basic Render Texture

Use the `*renderTextureContent` structural directive to define the content rendered to the texture:

```angular-html
<ngt-mesh>
  <ngt-box-geometry />
  <ngt-mesh-basic-material>
    <ngts-render-texture>
      <app-texture-scene *renderTextureContent />
    </ngts-render-texture>
  </ngt-mesh-basic-material>
</ngt-mesh>
```

### With Custom Dimensions

```angular-html
<ngt-mesh>
  <ngt-plane-geometry *args="[4, 4]" />
  <ngt-mesh-basic-material>
    <ngts-render-texture [options]="{ width: 512, height: 512 }">
      <app-mini-scene *renderTextureContent />
    </ngts-render-texture>
  </ngt-mesh-basic-material>
</ngt-mesh>
```

### High-Quality with Samples

```angular-html
<ngt-mesh>
  <ngt-sphere-geometry *args="[1, 32, 32]" />
  <ngt-mesh-standard-material>
    <ngts-render-texture [options]="{ samples: 16, generateMipmaps: true }">
      <app-reflection-scene *renderTextureContent />
    </ngts-render-texture>
  </ngt-mesh-standard-material>
</ngt-mesh>
```

### Static Render (Single Frame)

For static content, render only once for better performance:

```angular-html
<ngt-mesh>
  <ngt-plane-geometry *args="[2, 2]" />
  <ngt-mesh-basic-material>
    <ngts-render-texture [options]="{ frames: 1 }">
      <app-static-scene *renderTextureContent />
    </ngts-render-texture>
  </ngt-mesh-basic-material>
</ngt-mesh>
```

### Portal Content Example

The texture scene component runs in its own portal with independent state:

```angular-ts
@Component({
  selector: 'app-texture-scene',
  template: `
    <ngt-color *args="['#202020']" attach="background" />
    <ngt-ambient-light [intensity]="0.5" />
    <ngt-point-light [position]="[5, 5, 5]" />

    <ngt-mesh (click)="onClick()">
      <ngt-dodecahedron-geometry />
      <ngt-mesh-standard-material color="hotpink" />
    </ngt-mesh>

    <ngts-orbit-controls />
  `,
})
export class TextureScene {
  onClick() {
    console.log('Clicked inside render texture!');
  }
}
```

## Notes

- The render texture creates an off-screen framebuffer that's updated each frame (or specified number of frames)
- Events are independent from the main scene and work within the portal
- Higher samples value improves anti-aliasing but impacts performance
- Use `frames: 1` for static content to avoid unnecessary re-renders
- The texture automatically attaches to the parent material's `map` property
