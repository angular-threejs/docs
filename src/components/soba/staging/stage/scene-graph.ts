import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsStage } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-stage [options]="{ environment: 'city', intensity: 0.5 }">
			<ngt-mesh>
				<ngt-torus-knot-geometry *args="[0.5, 0.2, 128, 32]" />
				<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.8" [roughness]="0.2" />
			</ngt-mesh>
		</ngts-stage>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsStage],
})
export class SceneGraph {}
