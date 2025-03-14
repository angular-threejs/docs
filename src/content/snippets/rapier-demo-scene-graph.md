```angular-ts
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    input,
} from "@angular/core";
import { NgtArgs, type NgtVector3 } from "angular-three";
import { NgtrCuboidCollider, NgtrPhysics, NgtrRigidBody } from "angular-three-rapier";
import * as THREE from "three";

@Component({
    selector: "app-floor",
    template: `
        <ngt-object3D rigidBody="fixed" [options]="{ colliders: false }" [position]="[0, -1, 0]" [rotation]="[-Math.PI / 2, 0, 0]">
            <ngt-mesh receiveShadow>
                <ngt-plane-geometry *args="[50, 50]" />
                <ngt-shadow-material [opacity]="0.5" />
            </ngt-mesh>

            <ngt-object3D [cuboidCollider]="[1000, 1000, 0]" />
        </ngt-object3D>
    `,
    imports: [NgtrRigidBody, NgtrCuboidCollider, NgtArgs],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Floor {
    protected readonly Math = Math;
}

@Component({
    selector: "app-box",
    template: `
        <ngt-object3D rigidBody [position]="position()" [rotation]="[0.4, 0.2, 0.5]">
            <ngt-mesh castShadow receiveShadow>
                <ngt-box-geometry />
                <ngt-mesh-standard-material [roughness]="0.5" color="#E3B6ED" />
            </ngt-mesh>
        </ngt-object3D>
    `,
    imports: [NgtrRigidBody],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Box {
    position = input<NgtVector3>([0, 5, 0]);
}

@Component({
    selector: "app-scene-graph",
    template: `
        <ngt-point-light [position]="[-10, -10, 30]" [intensity]="0.25 * Math.PI" [decay]="0" />
        <ngt-spot-light [intensity]="0.3 * Math.PI" [position]="[30, 30, 50]" [angle]="0.2" [penumbra]="1" [decay]="0" castShadow />

        <ngtr-physics [options]="{ debug: true }">
            <ng-template>
                <app-floor />
                @for (position of positions; track $index) {
                    <app-box [position]="position" />
                }
            </ng-template>
        </ngtr-physics>
    `,
    imports: [NgtArgs, NgtrPhysics, Floor, Box],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
    protected readonly Math = Math;
    protected positions: NgtVector3[] = [
        [0.1, 5, 0],
        [0, 10, -1],
        [0, 20, -2],
    ];
}
```
