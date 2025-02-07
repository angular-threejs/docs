import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
	selector: 'app-step-one-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-box-geometry />
			<ngt-mesh-basic-material />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOne {}
