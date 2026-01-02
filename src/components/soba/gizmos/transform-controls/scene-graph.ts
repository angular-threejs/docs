import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsTransformControls } from 'angular-three-soba/gizmos';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-transform-controls [options]="{ mode: mode() }">
			<ngt-mesh>
				<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
				<ngt-mesh-normal-material />
			</ngt-mesh>
		</ngts-transform-controls>

		<ngt-group [position]="[0, -2, 0]">
			<ngt-mesh [position]="[-2, 0, 0]" (click)="mode.set('translate')">
				<ngt-sphere-geometry *args="[0.3]" />
				<ngt-mesh-basic-material [color]="mode() === 'translate' ? '#ff6b6b' : '#666'" />
			</ngt-mesh>
			<ngt-mesh (click)="mode.set('rotate')">
				<ngt-sphere-geometry *args="[0.3]" />
				<ngt-mesh-basic-material [color]="mode() === 'rotate' ? '#4ecdc4' : '#666'" />
			</ngt-mesh>
			<ngt-mesh [position]="[2, 0, 0]" (click)="mode.set('scale')">
				<ngt-sphere-geometry *args="[0.3]" />
				<ngt-mesh-basic-material [color]="mode() === 'scale' ? '#ffe66d' : '#666'" />
			</ngt-mesh>
		</ngt-group>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsTransformControls],
})
export class SceneGraph {
	mode = signal<'translate' | 'rotate' | 'scale'>('translate');

	@HostListener('document:keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if (event.key === 't') this.mode.set('translate');
		if (event.key === 'r') this.mode.set('rotate');
		if (event.key === 's') this.mode.set('scale');
	}
}
