import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpChromaticAberration, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-knot-geometry *args="[1, 0.35, 128, 32]" />
			<ngt-mesh-standard-material color="white" [metalness]="0.5" [roughness]="0.2" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-chromatic-aberration
				[options]="{
					offset: [0.006, 0.006],
					radialModulation: true,
					modulationOffset: 0.5,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpChromaticAberration],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.3;
			mesh.rotation.y += delta * 0.4;
		});
	}
}
