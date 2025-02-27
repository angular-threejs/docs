```angular-ts
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Bot } from './bot';

@Component({
    selector: 'app-scene-graph',
    template: `
        <ngt-color *args="['#303030']" attach="background" />
        <ngt-ambient-light [intensity]="0.8" />
        <ngt-point-light [intensity]="Math.PI" [decay]="0" [position]="[0, 6, 0]" />

        <ngt-grid-helper *args="[10, 20]" />

        <app-bot [positionX]="0.75" [rotationY]="-Math.PI / 2" />
        <app-bot [positionX]="-0.75" [rotationY]="Math.PI / 2" />

        <ngts-orbit-controls />
    `,
    imports: [NgtArgs, Bot, NgtsOrbitControls],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
    protected readonly Math = Math;
}
```
