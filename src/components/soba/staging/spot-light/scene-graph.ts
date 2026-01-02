import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { depthBuffer } from 'angular-three-soba/misc';
import { NgtsSpotLight } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Floor -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" receiveShadow>
			<ngt-plane-geometry *args="[20, 20]" />
			<ngt-mesh-standard-material color="#222" />
		</ngt-mesh>

		<!-- Objects to illuminate -->
		<ngt-mesh [position]="[0, 0.5, 0]" castShadow>
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngt-mesh [position]="[-2, 0.4, 1]" castShadow>
			<ngt-sphere-geometry *args="[0.4, 32, 32]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, 0.6, -1]" castShadow>
			<ngt-cone-geometry *args="[0.4, 0.8, 32]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<!-- Volumetric spot lights -->
		<ngts-spot-light
			[options]="{
				position: [-3, 4, 0],
				angle: 0.5,
				penumbra: 0.5,
				intensity: 2,
				color: '#ff005b',
				volumetric: true,
				attenuation: 5,
				anglePower: 5,
				depthBuffer: depth,
			}"
		/>

		<ngts-spot-light
			[options]="{
				position: [3, 4, 0],
				angle: 0.5,
				penumbra: 0.5,
				intensity: 2,
				color: '#0EEC82',
				volumetric: true,
				attenuation: 5,
				anglePower: 5,
				depthBuffer: depth,
			}"
		/>

		<!-- Ambient light for base illumination -->
		<ngt-ambient-light [intensity]="0.1" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsSpotLight],
})
export class SceneGraph {
	protected readonly Math = Math;

	// Depth buffer for soft volumetric lighting
	depth = depthBuffer(() => ({ size: 256, frames: Infinity }));
}
