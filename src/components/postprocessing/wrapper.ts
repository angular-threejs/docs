import { booleanAttribute, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import * as THREE from 'three';

@Component({
	selector: 'app-postprocessing-wrapper',
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
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsOrbitControls],
})
export class PostprocessingWrapper {
	background = input<THREE.ColorRepresentation>('#1a1a2e');
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
