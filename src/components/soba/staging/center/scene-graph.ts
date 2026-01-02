import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsCenter } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-center [options]="{ top: true }">
			<ngt-mesh>
				<ngt-box-geometry *args="[2, 1, 1]" />
				<ngt-mesh-standard-material color="#ff6b6b" />
			</ngt-mesh>
		</ngts-center>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsCenter],
})
export class SceneGraph {}
