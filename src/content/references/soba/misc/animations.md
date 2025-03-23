---
arguments:
    - name: animations
      type: () => NgtsAnimation<TAnimation> | undefined | null
      description: >-
          A signal/function that returns either an array of AnimationClips or an
          object with animations property containing an array of AnimationClips
      required: true
    - name: object
      type: >-
          ElementRef<Object3D> | Object3D | (() => ElementRef<Object3D> | Object3D |
          undefined | null)
      description: The Object3D instance that will be animated
      required: true
    - name: options
      type: '{ injector?: Injector }'
      description: Optional configuration object with injector
      required: false
returns:
    - type: NgtsAnimationApi
      description: The animations API object
      properties:
          - name: clips
            type: 'T[]'
            description: Array of animation clips
          - name: mixer
            type: THREE.AnimationMixer
            description: The AnimationMixer instance
          - name: names
            type: "T['name'][]"
            description: Array of animation names
          - name: isReady
            type: boolean
            description: Whether the animations are initialized and ready to use
          - name: actions
            type: "{ [key in T['name']]: THREE.AnimationAction }"
            description: >-
                Map of animation names to their corresponding AnimationAction (only
                available when isReady is true)
---

`animations` is an abstraction around [`THREE.AnimationMixer`](https://threejs.org/docs/index.html#api/en/animation/AnimationMixer) that provides type-safe animations handling.

### Usage

```angular-ts
import {  animations } from 'angular-three-soba/misc';
```

```angular-ts
export class MyCmp {
    protected gltf = gltfResource(() => 'my/gltf.glb');
    protected animations = animations(this.gltf.value, this.gltf.scene);

    constructor() {
        effect(() => {
            if (!this.animations.isReady) return;
            this.animations.actions; //
        })
    }
}
```

`isReady` is a signal-getter (getter that returns a signal) that indicates whether the animations are ready to use. This also acts as a type-guard to ensure the animations are typed correctly. You should always check `isReady` before accessing `actions`.

### Providing generics

#### With GLTF type

Usually, you will want to provide the GLTF type to `gltfResource` then `animations` will be able to infer the animations type from `this.gltf.value`

```angular-ts
import { NgtsAnimationClips } from 'angular-three-soba/misc';

interface MyGLTF extends GLTF {
    animations: NgtsAnimationClips<'Dance'>[];
}

export class MyCmp {
    protected gltf = gltfResource<MyGLTF>(() => 'my/gltf.glb');
    protected animations = animations(this.gltf.value, this.gltf.scene);
    // this.animations.actions.Dance is strongly-typed
}
```

#### With animations type

If you don't want to or don't have the GLTF type, you can provide the animations type directly to `animations`

```angular-ts
import { NgtsAnimation } from 'angular-three-soba/misc';

export class MyCmp {
    protected animations = animations<NgtsAnimation<'Dance'>>(...);
    // this.animations.actions.Dance is strongly-typed
}
```

### Automatic cleanup

The animations are automatically cleaned up when the component is destroyed:

- Cached actions are cleared
- All actions are stopped
- Actions are uncached from the mixer
