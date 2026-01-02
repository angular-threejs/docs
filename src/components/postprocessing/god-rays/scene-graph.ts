import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpGodRays } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Sun mesh - light source for god rays -->
		<ngt-mesh #sun [position]="[0, 2, -8]">
			<ngt-sphere-geometry *args="[1.5, 32, 32]" />
			<ngt-mesh-basic-material color="#ffdd66" />
		</ngt-mesh>

		<!-- Silhouette objects -->
		<ngt-mesh [position]="[-2, -1, 0]">
			<ngt-box-geometry *args="[1, 3, 0.5]" />
			<ngt-mesh-standard-material color="#111111" />
		</ngt-mesh>

		<ngt-mesh [position]="[0, -0.5, 0]">
			<ngt-box-geometry *args="[0.8, 2, 0.5]" />
			<ngt-mesh-standard-material color="#111111" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, -1.2, 0]">
			<ngt-box-geometry *args="[1.2, 2.5, 0.5]" />
			<ngt-mesh-standard-material color="#111111" />
		</ngt-mesh>

		<!-- Ambient light for silhouettes -->
		<ngt-ambient-light [intensity]="0.1" />

		<ngtp-effect-composer>
			<ngtp-god-rays
				[options]="{
					sun: sunRef().nativeElement,
					density: 0.97,
					decay: 0.94,
					weight: 0.6,
					exposure: 0.55,
					samples: 60,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpGodRays],
})
export class SceneGraph {
	sunRef = viewChild.required<ElementRef<THREE.Mesh>>('sun');
}
