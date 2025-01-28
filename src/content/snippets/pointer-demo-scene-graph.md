```angular-ts
import { DOCUMENT } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Directive,
    ElementRef,
    inject,
    signal,
    viewChild,
} from "@angular/core";
import { extend, injectBeforeRender, injectObjectEvents } from "angular-three";
import { NgtsEnvironment } from "angular-three-soba/staging";
import * as THREE from "three";

@Directive({ selector: "ngt-mesh[cursor]" })
export class Cursor {
    constructor() {
        const document = inject(DOCUMENT);
        const elementRef = inject<ElementRef<THREE.Mesh>>(ElementRef);
        const nativeElement = elementRef.nativeElement;

        if (nativeElement.isMesh) {
            injectObjectEvents(() => nativeElement, {
                pointerover: () => {
                    document.body.style.cursor = "pointer";
                },
                pointerout: () => {
                    document.body.style.cursor = "default";
                },
            });
        }
    }
}

@Component({
    selector: "app-scene-graph",
    template: `
        <ngt-mesh
            #mesh
            cursor
            [scale]="scale()"
            (pointerover)="hovered.set(true)"
            (pointerout)="hovered.set(false)"
            (click)="scale.set(scale() === 2 ? 3 : 2)"
        >
            <ngt-box-geometry />
            <ngt-mesh-standard-material
                [color]="hovered() ? 'mediumpurple' : 'maroon'"
                [roughness]="0.5"
                [metalness]="0.5"
            />
        </ngt-mesh>

        <ngts-environment [options]="{ preset: 'warehouse' }" />
    `,
    imports: [Cursor, NgtsEnvironment],
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
    private meshRef = viewChild.required<ElementRef<THREE.Mesh>>("mesh");

    protected hovered = signal(false);
    protected scale = signal(2);

    constructor() {
        extend(THREE);

        injectBeforeRender(({ delta }) => {
            const mesh = this.meshRef().nativeElement;
            mesh.rotation.x += delta;
            mesh.rotation.y += delta;
        });
    }
}
```
