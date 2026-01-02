import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { injectStore, NgtArgs } from 'angular-three';
import { NgtsCanvasScrollContent, NgtsScrollControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-scroll-content',
	template: `
		<ngt-group canvasScrollContent>
			<!-- Page 1 -->
			<ngt-mesh [position]="[0, 0, 0]">
				<ngt-box-geometry *args="[2, 2, 2]" />
				<ngt-mesh-standard-material color="#ff6b6b" />
			</ngt-mesh>

			<!-- Page 2 -->
			<ngt-mesh [position]="[0, -viewportHeight, 0]">
				<ngt-sphere-geometry *args="[1.2, 32, 32]" />
				<ngt-mesh-standard-material color="#4ecdc4" />
			</ngt-mesh>

			<!-- Page 3 -->
			<ngt-mesh [position]="[0, -viewportHeight * 2, 0]">
				<ngt-torus-knot-geometry *args="[0.8, 0.3, 128, 32]" />
				<ngt-mesh-standard-material color="#a29bfe" />
			</ngt-mesh>
		</ngt-group>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsCanvasScrollContent],
})
export class ScrollContent {
	private store = injectStore();

	viewportHeight = this.store.viewport().height;
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-scroll-controls [(progress)]="progress" [options]="{ pages: 3, damping: 0.15 }">
			<app-scroll-content />
		</ngts-scroll-controls>

		<ngt-ambient-light [intensity]="0.5" />
		<ngt-point-light [position]="[10, 10, 10]" [intensity]="Math.PI" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsScrollControls, ScrollContent],
})
export class SceneGraph {
	protected readonly Math = Math;
	progress = signal(0);
}
