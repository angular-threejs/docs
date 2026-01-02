import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpVignette } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-dodecahedron-geometry *args="[1.2, 0]" />
			<ngt-mesh-standard-material color="#e67e22" [flatShading]="true" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-vignette [options]="{ darkness: 0.6, offset: 0.3 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpVignette],
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
