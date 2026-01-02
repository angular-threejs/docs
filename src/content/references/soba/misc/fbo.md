---
arguments:
    - name: params
      type: '() => NgtsFBOParams'
      description: >-
          Signal returning FBO configuration with width, height, and settings
      required: false
    - name: options
      type: '{ injector?: Injector }'
      description: Optional configuration object with injector
      required: false
returns:
    - type: THREE.WebGLRenderTarget
      description: A WebGLRenderTarget for off-screen rendering
---

`fbo` creates a `WebGLRenderTarget` (Frame Buffer Object) for off-screen rendering. The FBO is automatically sized to the canvas dimensions if width/height are not specified, and is disposed on component destroy.

## Usage

```angular-ts
import { fbo } from 'angular-three-soba/misc';
import { beforeRender } from 'angular-three';

@Component({...})
class MyComponent {
    // Basic usage - sized to canvas
    renderTarget = fbo();

    // Custom size with multisampling
    target = fbo(() => ({
        width: 512,
        height: 512,
        settings: { samples: 4 }
    }));

    constructor() {
        // Render to FBO
        beforeRender(({ gl, scene, camera }) => {
            gl.setRenderTarget(this.target);
            gl.render(scene, camera);
            gl.setRenderTarget(null);
        });
    }
}
```

## NgtsFBOParams

| Property   | Type                  | Description                                                      |
| ---------- | --------------------- | ---------------------------------------------------------------- |
| `width`    | `number`              | Width in pixels. Defaults to canvas width × device pixel ratio   |
| `height`   | `number`              | Height in pixels. Defaults to canvas height × device pixel ratio |
| `settings` | `RenderTargetOptions` | THREE.js render target options                                   |

## Settings Options

| Property        | Type      | Default | Description                                 |
| --------------- | --------- | ------- | ------------------------------------------- |
| `samples`       | `number`  | `0`     | Samples for MSAA                            |
| `depth`         | `boolean` | `false` | Render scene depth into buffer.depthTexture |
| `depthBuffer`   | `boolean` | `true`  | Include a depth buffer                      |
| `stencilBuffer` | `boolean` | `false` | Include a stencil buffer                    |

:::note
`injectFBO` is deprecated. Use `fbo` instead.
:::
