import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtpDepth, NgtpEffectComposer } from 'angular-three-postprocessing';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Objects at various depths to demonstrate depth visualization -->
		<ngt-ambient-light [intensity]="0.5" />
		<ngt-directional-light [position]="[5, 5, 5]" [intensity]="1" />

		<!-- Near objects (will appear white/light) -->
		<ngt-mesh [position]="[-2, 0, 2]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, 0, 1]">
			<ngt-sphere-geometry *args="[0.6, 32, 32]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<!-- Mid-distance objects -->
		<ngt-mesh [position]="[0, 0, -2]">
			<ngt-torus-knot-geometry *args="[0.5, 0.2, 100, 16]" />
			<ngt-mesh-standard-material color="#ffe66d" />
		</ngt-mesh>

		<ngt-mesh [position]="[-1.5, 1, -3]">
			<ngt-cone-geometry *args="[0.5, 1, 32]" />
			<ngt-mesh-standard-material color="#a855f7" />
		</ngt-mesh>

		<!-- Far objects (will appear dark/black) -->
		<ngt-mesh [position]="[1.5, -0.5, -6]">
			<ngt-dodecahedron-geometry *args="[0.8, 0]" />
			<ngt-mesh-standard-material color="#f472b6" />
		</ngt-mesh>

		<ngt-mesh [position]="[0, 1.5, -8]">
			<ngt-icosahedron-geometry *args="[0.7, 0]" />
			<ngt-mesh-standard-material color="#22d3ee" />
		</ngt-mesh>

		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1.5, 0]">
			<ngt-plane-geometry *args="[20, 20]" />
			<ngt-mesh-standard-material color="#374151" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-depth [options]="{ inverted: true }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpDepth],
})
export class SceneGraph {
	protected readonly Math = Math;
}
