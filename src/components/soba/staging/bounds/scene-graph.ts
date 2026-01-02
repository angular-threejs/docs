import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsBounds } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-bounds [options]="{ fit: true, clip: true, observe: true }">
			<ngt-group>
				<ngt-mesh [position]="[-2, 0, 0]">
					<ngt-box-geometry *args="[1, 1, 1]" />
					<ngt-mesh-standard-material color="#ff6b6b" />
				</ngt-mesh>
				<ngt-mesh [position]="[2, 0, 0]">
					<ngt-sphere-geometry *args="[0.75, 32, 32]" />
					<ngt-mesh-standard-material color="#4ecdc4" />
				</ngt-mesh>
				<ngt-mesh [position]="[0, 2, 0]">
					<ngt-cone-geometry *args="[0.5, 1, 32]" />
					<ngt-mesh-standard-material color="#ffe66d" />
				</ngt-mesh>
			</ngt-group>
		</ngts-bounds>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsBounds],
})
export class SceneGraph {}
