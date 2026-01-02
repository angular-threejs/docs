import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsMeshWobbleMaterial } from 'angular-three-soba/materials';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-torus-geometry *args="[1, 0.4, 32, 100]" />
			<ngts-mesh-wobble-material
				[options]="{
					color: '#4ecdc4',
					speed: 2,
					factor: 0.6,
				}"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsMeshWobbleMaterial],
})
export class SceneGraph {}
