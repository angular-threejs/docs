---
options:
    properties:
        - name: count
          type: number
          description: >-
              Number of samples to distribute across the mesh surface. Default: 16
        - name: weight
          type: string
          description: >-
              Name of a vertex attribute for weighted sampling. Higher values = more likely to be sampled
        - name: transform
          type: TransformFn
          description: >-
              Custom transform function applied to each sampled instance
---

`NgtsSampler` distributes instances across a mesh surface using THREE.js `MeshSurfaceSampler`. It samples points from a mesh and automatically updates an `InstancedMesh` with the sampled transforms.

## Usage

### With Content Children

```angular-html
<ngts-sampler [options]="{ weight: 'normal', transform: transformPoint, count: 500 }">
    <ngt-mesh>
        <ngt-sphere-geometry *args="[2]" />
    </ngt-mesh>

    <ngt-instanced-mesh *args="[undefined, undefined, 500]">
        <ngt-sphere-geometry *args="[0.1]" />
    </ngt-instanced-mesh>
</ngts-sampler>
```

### Transform Function

The `transform` function receives sample data and should mutate `payload.dummy` to set position, rotation, and scale:

```angular-ts
const transformPoint = ({ dummy, position, normal }: TransformPayload) => {
    dummy.position.copy(position);
    dummy.lookAt(position.clone().add(normal));
    dummy.scale.setScalar(Math.random() * 0.5 + 0.5);
};
```

## surfaceSampler Function

A reactive function that creates a computed signal sampling points on a mesh surface:

```angular-ts
import { surfaceSampler } from 'angular-three-soba/misc';

const samples = surfaceSampler(() => meshRef()?.nativeElement, {
    count: () => 1000,
    instancedMesh: () => instancesRef()?.nativeElement,
    transform: () => ({ dummy, position, normal }) => {
        dummy.position.copy(position);
        dummy.lookAt(position.clone().add(normal));
    }
});
```
