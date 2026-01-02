---
options:
    properties:
        - name: blend
          type: number
          default: '0'
          description: >-
              Mix the portal's own scene with the world scene. 0 = world only, 0.5 = both, 1 = portal only.
        - name: blur
          type: number
          default: '0'
          description: >-
              Edge fade blur using signed distance field (SDF).
        - name: resolution
          type: number
          default: '512'
          description: >-
              SDF resolution. Smaller values result in faster start-up time.
        - name: worldUnits
          type: boolean
          default: 'false'
          description: >-
              Whether portal contents use world-space coordinates.
        - name: eventPriority
          type: number
          default: '0'
          description: >-
              Event priority for the portal's raycasting.
        - name: renderPriority
          type: number
          default: '0'
          description: >-
              Render priority for the portal scene.
        - name: events
          type: boolean
          default: 'false'
          description: >-
              Whether to enable events inside the portal.
---

`NgtsMeshPortalMaterial` is a port of [Drei's MeshPortalMaterial](https://drei.docs.pmnd.rs/shaders/mesh-portal-material) that creates a portal effect, rendering a separate scene inside a mesh. It supports smooth blending between the portal scene and the world scene, edge blur, and automatic visibility culling.

### Usage

```angular-ts
import { NgtsMeshPortalMaterial } from 'angular-three-soba/materials';
```

```angular-html
<ngt-mesh>
    <ngt-plane-geometry />
    <ngts-mesh-portal-material [options]="{ blend: 1, blur: 0.5 }">
        <ng-template>
            <!-- Portal scene content -->
            <ngt-mesh>
                <ngt-box-geometry />
                <ngt-mesh-basic-material color="red" />
            </ngt-mesh>
        </ng-template>
    </ngts-mesh-portal-material>
</ngt-mesh>
```

### Example with Animated Blend

```angular-ts
@Component({
    template: `
        <ngt-mesh (pointerenter)="hovered.set(true)" (pointerleave)="hovered.set(false)">
            <ngt-plane-geometry *args="[2, 3]" />
            <ngts-mesh-portal-material [options]="{ blend: hovered() ? 1 : 0, blur: 0.2 }">
                <ng-template>
                    <ngt-ambient-light [intensity]="0.5" />
                    <ngt-mesh>
                        <ngt-sphere-geometry />
                        <ngt-mesh-standard-material color="orange" />
                    </ngt-mesh>
                </ng-template>
            </ngts-mesh-portal-material>
        </ngt-mesh>
    `
})
export class PortalScene {
    hovered = signal(false);
}
```

The portal creates an isolated scene that can have its own lighting, objects, and environment. Use `blend` to smoothly transition between seeing the world and seeing the portal contents.
