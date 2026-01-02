import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpNoise, NgtpSepia, NgtpVignette } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-geometry *args="[1, 0.4, 16, 32]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-sepia [options]="{ intensity: 0.8 }" />
			<ngtp-vignette [options]="{ darkness: 0.5 }" />
			<ngtp-noise [options]="{ opacity: 0.05 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpSepia, NgtpVignette, NgtpNoise],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.3;
			mesh.rotation.y += delta * 0.5;
		});
	}
}
