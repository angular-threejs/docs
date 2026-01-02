import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsSky } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh [position]="[0, 0.5, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, 0, 0]">
			<ngt-plane-geometry *args="[20, 20]" />
			<ngt-mesh-standard-material color="#4a5568" />
		</ngt-mesh>

		<ngt-directional-light [position]="[5, 5, 5]" [intensity]="1" />
		<ngt-ambient-light [intensity]="0.3" />

		<ngts-sky [options]="{ sunPosition: [1, 0.5, 0], turbidity: 8, rayleigh: 2 }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsSky],
})
export class SceneGraph {
	protected readonly Math = Math;
}
