import { booleanAttribute, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsGrid } from 'angular-three-soba/abstractions';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import * as THREE from 'three';

@Component({
	selector: 'app-soba-wrapper',
	template: `
		<ngt-color attach="background" *args="[background()]" />

		<ng-content />

		@if (lights()) {
			<ngt-ambient-light [intensity]="0.8" />
			<ngt-point-light [intensity]="Math.PI" [position]="[0, 6, 0]" [decay]="0" />
		}

		@let makeDefault = controls();
		@if (makeDefault !== null) {
			<ngts-orbit-controls [options]="{ makeDefault }" />
		}

		@if (grid()) {
			<ngts-grid
				[options]="{
					planeArgs: [10.5, 10.5],
					position: [0, -0.01, 0],
					cellSize: 1,
					cellThickness: 1,
					cellColor: '#6f6f6f',
					sectionSize: 3,
					sectionThickness: 1.5,
					sectionColor: '#563D7C',
					fadeDistance: 25,
					fadeStrength: 1,
					followCamera: false,
					infiniteGrid: true,
					side: DoubleSide,
				}"
			/>
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsOrbitControls, NgtsGrid],
})
export class SobaWrapper {
	protected readonly DoubleSide = THREE.DoubleSide;

	background = input<THREE.ColorRepresentation>('black');
	grid = input(true, { transform: booleanAttribute });
	lights = input(true, { transform: booleanAttribute });
	controls = input(true, {
		transform: (value: unknown) => {
			if (value === null) return null;
			return booleanAttribute(value);
		},
	});

	constructor() {
		extend(THREE);
	}

	protected readonly Math = Math;
}
