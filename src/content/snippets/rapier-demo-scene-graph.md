```angular-ts
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    input,
} from "@angular/core";
import { extend, NgtArgs, type NgtVector3 } from "angular-three";
import { NgtrCuboidCollider, NgtrPhysics, NgtrRigidBody } from "angular-three-rapier";
import * as THREE from "three";

@Component({
    selector: "app-floor",
    template: `
        <ngt-object3D rigidBody="fixed" [options]="{ colliders: false }" [position]="[0, -1, 0]">
            <ngt-mesh receiveShadow [rotation]="[-Math.PI / 2, 0, 0]">
                <ngt-plane-geometry *args="[50, 50]" />
                <ngt-shadow-material [opacity]="0.5" />
            </ngt-mesh>

            <ngt-object3D cuboidCollider [args]="[1000, 0, 1000]" />
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
        <ngt-object3D rigidBody>
            <ngt-mesh #mesh castShadow receiveShadow [position]="position()" [rotation]="[0.4, 0.2, 0.5]">
                <ngt-box-geometry />
                <ngt-mesh-standard-material [roughness]="0.5" color="#E3B6ED" />
            </ngt-mesh>
        </ngt-object3D>
    `,
    imports: [NgtrRigidBody, NgtrCuboidCollider],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Box {
    position = input<NgtVector3>([0, 5, 0]);
}

@Component({
    selector: "app-scene-graph",
    template: `
        <ngt-color attach="background" *args="['lightblue']" />
        <ngt-ambient-light />
        <ngt-directional-light [position]="10" castShadow>
            <ngt-vector2 *args="[2048, 2048]" attach="shadow.mapSize" />
        </ngt-directional-light>

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
    positions: NgtVector3[] = [
        [0.1, 5, 0],
        [0, 10, -1],
        [0, 20, -2],
    ];

    constructor() {
        extend(THREE);
    }
}
```
