import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpHueSaturation, NgtpVignette, NgtpWater } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-icosahedron-geometry *args="[1.2, 2]" />
			<ngt-mesh-standard-material color="#1abc9c" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-water [options]="{ factor: 0.4 }" />
			<!-- Blue tint for underwater feel -->
			<ngtp-hue-saturation [options]="{ hue: 0.3, saturation: 0.2 }" />
			<ngtp-vignette [options]="{ darkness: 0.5 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpWater, NgtpHueSaturation, NgtpVignette],
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
