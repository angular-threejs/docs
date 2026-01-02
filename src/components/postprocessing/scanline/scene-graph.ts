import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import {
	NgtpChromaticAberration,
	NgtpEffectComposer,
	NgtpNoise,
	NgtpScanline,
	NgtpVignette,
} from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-standard-material color="#00ffff" [emissive]="'#004444'" [emissiveIntensity]="0.5" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-scanline [options]="{ density: 1.5 }" />
			<ngtp-noise [options]="{ opacity: 0.15 }" />
			<ngtp-vignette [options]="{ darkness: 0.7 }" />
			<ngtp-chromatic-aberration [options]="{ offset: [0.002, 0.002] }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpScanline, NgtpNoise, NgtpVignette, NgtpChromaticAberration],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.2;
			mesh.rotation.y += delta * 0.4;
		});
	}
}
