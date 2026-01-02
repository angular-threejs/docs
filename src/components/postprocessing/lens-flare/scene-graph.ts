import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtpBloom, NgtpEffectComposer, NgtpLensFlare } from 'angular-three-postprocessing';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Sun/light source -->
		<ngt-mesh [position]="[8, 6, -15]">
			<ngt-sphere-geometry *args="[1.5, 32, 32]" />
			<ngt-mesh-basic-material color="#ffffcc" />
		</ngt-mesh>

		<!-- Scene objects that can occlude the sun -->
		<ngt-mesh [position]="[-2, 0, 0]">
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-standard-material color="#374151" [metalness]="0.5" [roughness]="0.5" />
		</ngt-mesh>

		<ngt-mesh [position]="[1, -0.5, 2]">
			<ngt-cylinder-geometry *args="[0.5, 0.5, 2, 32]" />
			<ngt-mesh-standard-material color="#4b5563" [metalness]="0.5" [roughness]="0.5" />
		</ngt-mesh>

		<ngt-mesh [position]="[3, 0.5, -2]">
			<ngt-torus-geometry *args="[0.6, 0.25, 16, 32]" />
			<ngt-mesh-standard-material color="#6b7280" [metalness]="0.5" [roughness]="0.5" />
		</ngt-mesh>

		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -2, 0]">
			<ngt-plane-geometry *args="[30, 30]" />
			<ngt-mesh-standard-material color="#1f2937" />
		</ngt-mesh>

		<ngt-ambient-light [intensity]="0.3" />
		<ngt-directional-light [position]="[8, 6, -15]" [intensity]="1.5" />

		<ngtp-effect-composer>
			<ngtp-lens-flare
				[options]="{
					position: [8, 6, -15],
					glareSize: 0.5,
					starPoints: 6,
					flareSize: 0.01,
					flareSpeed: 0.3,
					animated: true,
					anamorphic: true,
					secondaryGhosts: true,
					starBurst: true,
					haloScale: 0.6,
					opacity: 0.9,
				}"
			/>
			<ngtp-bloom [options]="{ intensity: 0.3, luminanceThreshold: 0.8 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpLensFlare, NgtpBloom],
})
export class SceneGraph {
	protected readonly Math = Math;
}
