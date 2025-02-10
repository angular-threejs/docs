import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
	selector: 'app-step-two-scene-graph',
	template: `
		<ngt-mesh [position.y]="1">
			<ngt-box-geometry />
			<ngt-mesh-basic-material color="mediumpurple" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwo {}
