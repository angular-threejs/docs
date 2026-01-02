import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsFloat } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-float [options]="{ speed: 2, rotationIntensity: 1, floatIntensity: 2 }">
			<ngt-mesh>
				<ngt-dodecahedron-geometry *args="[1]" />
				<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.5" [roughness]="0.3" />
			</ngt-mesh>
		</ngts-float>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsFloat],
})
export class SceneGraph {}
