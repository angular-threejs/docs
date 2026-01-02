import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpNoise, NgtpVignette } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-octahedron-geometry *args="[1.2, 0]" />
			<ngt-mesh-standard-material color="#8e44ad" [flatShading]="true" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-noise [options]="{ opacity: 0.15 }" />
			<ngtp-vignette [options]="{ darkness: 0.4 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpNoise, NgtpVignette],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.2;
			mesh.rotation.y += delta * 0.3;
		});
	}
}
