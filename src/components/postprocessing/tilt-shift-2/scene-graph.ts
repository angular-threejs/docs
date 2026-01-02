import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpTiltShift2 } from 'angular-three-postprocessing';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -0.5, 0]">
			<ngt-plane-geometry *args="[20, 20]" />
			<ngt-mesh-standard-material color="#444444" />
		</ngt-mesh>

		<!-- City-like buildings -->
		@for (building of buildings; track building.id) {
			<ngt-mesh [position]="building.position">
				<ngt-box-geometry *args="[building.width, building.height, building.depth]" />
				<ngt-mesh-standard-material [color]="building.color" />
			</ngt-mesh>
		}

		<ngtp-effect-composer>
			<!-- TiltShift2 with start/end points for more control -->
			<ngtp-tilt-shift-2
				[options]="{
					blur: 0.2,
					taper: 0.5,
					start: [0.5, 0.3],
					end: [0.5, 0.7],
					samples: 10,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpTiltShift2],
})
export class SceneGraph {
	protected Math = Math;

	buildings = [
		{ id: 1, position: [-3, 1, -2] as const, width: 1, height: 2, depth: 1, color: '#e74c3c' },
		{ id: 2, position: [-1, 1.5, -3] as const, width: 1.2, height: 3, depth: 1.2, color: '#3498db' },
		{ id: 3, position: [1, 0.75, -2] as const, width: 0.8, height: 1.5, depth: 0.8, color: '#2ecc71' },
		{ id: 4, position: [3, 1.25, -3] as const, width: 1, height: 2.5, depth: 1, color: '#f39c12' },
		{ id: 5, position: [-2, 0.5, 0] as const, width: 0.6, height: 1, depth: 0.6, color: '#9b59b6' },
		{ id: 6, position: [0, 1, 0] as const, width: 1.5, height: 2, depth: 1.5, color: '#1abc9c' },
		{ id: 7, position: [2, 0.75, 1] as const, width: 0.8, height: 1.5, depth: 0.8, color: '#e67e22' },
		{ id: 8, position: [-1, 0.6, 2] as const, width: 0.7, height: 1.2, depth: 0.7, color: '#34495e' },
		{ id: 9, position: [1, 0.4, 3] as const, width: 0.5, height: 0.8, depth: 0.5, color: '#c0392b' },
	];
}
