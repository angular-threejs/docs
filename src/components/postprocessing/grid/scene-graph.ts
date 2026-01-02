import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpBloom, NgtpEffectComposer, NgtpGrid } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-knot-geometry *args="[1, 0.3, 128, 32]" />
			<ngt-mesh-standard-material color="#ff00ff" [emissive]="'#ff00ff'" [emissiveIntensity]="0.3" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-grid [options]="{ scale: 0.6, lineWidth: 0.3 }" />
			<ngtp-bloom [options]="{ intensity: 0.5, luminanceThreshold: 0.4 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpGrid, NgtpBloom],
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
