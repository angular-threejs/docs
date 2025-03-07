import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsOrthographicCamera } from 'angular-three-soba/cameras';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import * as THREE from 'three';

import { positions } from '../positions';

@Component({
	selector: 'app-orthographic-camera-demo',
	template: `
		<ngt-canvas>
			<ng-template canvasContent>
				<ngt-color attach="background" *args="['black']" />

				<ngts-orthographic-camera [options]="{ makeDefault: true, zoom: 40, position: [0, 0, 10] }" />

				<ngt-group [position]="[0, 0, -10]">
					@for (position of positions; track position.id) {
						<ngt-mesh [position]="position.position">
							<ngt-icosahedron-geometry *args="[1, 1]" />
							<ngt-mesh-basic-material color="white" wireframe />
						</ngt-mesh>
					}
				</ngt-group>

				<ngts-orbit-controls />
			</ng-template>
		</ngt-canvas>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, NgtArgs, NgtsOrbitControls, NgtsOrthographicCamera],
})
export default class OrthographicCamera {
	static clientProviders = [provideNgtRenderer()];

	protected readonly positions = positions;

	constructor() {
		extend(THREE);
	}
}
