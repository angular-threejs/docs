import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsMeshDistortMaterial } from 'angular-three-soba/materials';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-icosahedron-geometry *args="[1, 4]" />
			<ngts-mesh-distort-material
				[options]="{
					color: '#f25042',
					speed: 2,
					distort: 0.5,
					radius: 1,
				}"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsMeshDistortMaterial],
})
export class SceneGraph {}
