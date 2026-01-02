import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsEnvironment } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngt-mesh-standard-material [metalness]="1" [roughness]="0" color="white" />
		</ngt-mesh>

		<ngts-environment [options]="{ preset: 'sunset', background: true, blur: 0.5 }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsEnvironment],
})
export class SceneGraph {}
