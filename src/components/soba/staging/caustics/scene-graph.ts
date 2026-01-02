import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsMeshTransmissionMaterial } from 'angular-three-soba/materials';
import { NgtsCaustics, NgtsEnvironment } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Floor to receive caustics -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1, 0]">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<!-- Glass sphere with caustics -->
		<ngts-caustics
			[options]="{
				frames: Infinity,
				intensity: 0.05,
				color: 'white',
				lightSource: [5, 5, 5],
				backside: true,
				ior: 0.9,
				backsideIOR: 1.26,
			}"
		>
			<ngt-mesh [position]="[0, 0, 0]">
				<ngt-sphere-geometry *args="[0.8, 64, 64]" />
				<ngts-mesh-transmission-material
					[options]="{
						backside: true,
						backsideThickness: 0.1,
						thickness: 0.05,
						transmission: 1,
						roughness: 0,
						clearcoat: 1,
						clearcoatRoughness: 0,
					}"
				/>
			</ngt-mesh>
		</ngts-caustics>

		<!-- Second glass object -->
		<ngts-caustics
			[options]="{
				frames: Infinity,
				intensity: 0.03,
				color: '#88ccff',
				lightSource: [5, 5, 5],
				ior: 1.1,
			}"
		>
			<ngt-mesh [position]="[2, 0, -1]">
				<ngt-dodecahedron-geometry *args="[0.6]" />
				<ngts-mesh-transmission-material
					[options]="{
						transmission: 1,
						roughness: 0.1,
						thickness: 0.1,
					}"
				/>
			</ngt-mesh>
		</ngts-caustics>

		<!-- Environment for reflections -->
		<ngts-environment [options]="{ preset: 'sunset' }" />

		<!-- Light source -->
		<ngt-directional-light [position]="[5, 5, 5]" [intensity]="Math.PI" />
		<ngt-ambient-light [intensity]="0.3" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsCaustics, NgtsEnvironment, NgtsMeshTransmissionMaterial],
})
export class SceneGraph {
	protected readonly Math = Math;
}
