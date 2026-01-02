import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtpEffectComposer } from 'angular-three-postprocessing';
import { NgtpN8AO } from 'angular-three-postprocessing/n8ao';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -0.5, 0]" [receiveShadow]="true">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<!-- Stacked boxes to show AO in corners -->
		<ngt-mesh [position]="[0, 0, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.2, 0, 0]">
			<ngt-box-geometry *args="[0.8, 0.8, 0.8]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngt-mesh [position]="[-0.8, 0.5, 0.8]">
			<ngt-box-geometry *args="[0.6, 1.5, 0.6]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngt-mesh [position]="[0.5, -0.25, -0.8]">
			<ngt-sphere-geometry *args="[0.4, 32, 32]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-n8ao
				[options]="{
					aoRadius: 1,
					intensity: 3,
					aoSamples: 16,
					denoiseSamples: 8,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpN8AO],
})
export class SceneGraph {
	protected Math = Math;
}
