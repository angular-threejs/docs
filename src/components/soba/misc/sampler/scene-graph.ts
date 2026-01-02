import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import type { TransformFn } from 'angular-three-soba/misc';
import { NgtsSampler } from 'angular-three-soba/misc';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-sampler [options]="{ count: 500, transform: transformFn }">
			<!-- Source mesh to sample from -->
			<ngt-mesh>
				<ngt-torus-knot-geometry *args="[1, 0.3, 128, 32]" />
				<ngt-mesh-standard-material color="#444" [wireframe]="true" [opacity]="0.3" transparent />
			</ngt-mesh>

			<!-- Instanced mesh for samples -->
			<ngt-instanced-mesh *args="[undefined, undefined, 500]">
				<ngt-sphere-geometry *args="[0.02, 8, 8]" />
				<ngt-mesh-standard-material color="#ff6b6b" />
			</ngt-instanced-mesh>
		</ngts-sampler>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsSampler],
})
export class SceneGraph {
	transformFn: TransformFn = ({ dummy, position, normal }) => {
		dummy.position.copy(position);
		// Orient along surface normal
		dummy.lookAt(position.clone().add(normal));
		// Random scale variation
		dummy.scale.setScalar(0.5 + Math.random() * 1.5);
	};
}
