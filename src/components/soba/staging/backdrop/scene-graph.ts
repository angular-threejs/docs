import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsBackdrop } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Product showcase object -->
		<ngt-mesh [position]="[0, 0.5, 0]">
			<ngt-dodecahedron-geometry *args="[0.75]" />
			<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<!-- Studio backdrop -->
		<ngts-backdrop [options]="{ floor: 0.5, segments: 20, scale: [10, 5, 3], position: [0, -0.01, -2] }">
			<ngt-mesh-standard-material color="#e0e0e0" />
		</ngts-backdrop>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsBackdrop],
})
export class SceneGraph {}
