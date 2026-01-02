import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsAccumulativeShadows, NgtsEnvironment, NgtsRandomizedLights } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Objects casting shadows - positioned above shadow plane -->
		<ngt-mesh [position]="[0, 0.5, 0]" castShadow>
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngt-mesh [position]="[-1.2, 0.4, 0.5]" castShadow>
			<ngt-box-geometry *args="[0.6, 0.6, 0.6]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.2, 0.35, 0.3]" castShadow>
			<ngt-cone-geometry *args="[0.4, 0.7, 32]" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<!-- Accumulative shadows plane - positioned at y=0 (ground level) -->
		<ngts-accumulative-shadows
			[options]="{
				temporal: true,
				frames: 100,
				color: '#316d39',
				colorBlend: 2,
				alphaTest: 0.65,
				opacity: 2,
				scale: 14,
				position: [0, 0.001, 0],
			}"
		>
			<ngts-randomized-lights
				[options]="{
					amount: 8,
					radius: 4,
					ambient: 0.5,
					intensity: Math.PI,
					position: [5, 5, -10],
					bias: 0.001,
				}"
			/>
		</ngts-accumulative-shadows>

		<!-- Environment for lighting -->
		<ngts-environment [options]="{ preset: 'city' }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsAccumulativeShadows, NgtsRandomizedLights, NgtsEnvironment],
})
export class SceneGraph {
	protected readonly Math = Math;
}
