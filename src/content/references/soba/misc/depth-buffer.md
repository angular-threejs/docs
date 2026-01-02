---
arguments:
    - name: params
      type: '() => { size?: number; frames?: number }'
      description: >-
          Signal returning configuration object with size (resolution, default 256) 
          and frames (number of frames to render, default Infinity)
      required: false
    - name: options
      type: '{ injector?: Injector }'
      description: Optional configuration object with injector
      required: false
returns:
    - type: THREE.DepthTexture
      description: A depth texture that captures scene depth information
---

`depthBuffer` creates a depth buffer texture that captures scene depth information. It renders the scene to an off-screen FBO with a depth texture attachment, which can be used for effects like soft particles, SSAO, or custom shaders.

## Usage

```angular-ts
import { depthBuffer } from 'angular-three-soba/misc';

@Component({...})
class MyComponent {
    depth = depthBuffer(() => ({
        size: 256,        // Resolution of depth buffer
        frames: Infinity  // Render continuously
    }));

    constructor() {
        effect(() => {
            // Use in a shader
            material.uniforms['depthTexture'].value = this.depth;
        });
    }
}
```

## Performance Tip

Since depth buffer rendering is expensive, limit the number of frames when objects are static:

```angular-ts
// Render only once for static scenes
const depth = depthBuffer(() => ({ frames: 1 }));

// Render every frame for dynamic scenes
const depth = depthBuffer(() => ({ frames: Infinity }));
```

:::note
`injectDepthBuffer` is deprecated. Use `depthBuffer` instead.
:::
