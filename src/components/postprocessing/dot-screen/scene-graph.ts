import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpBrightnessContrast, NgtpDotScreen, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-geometry *args="[1, 0.4, 32, 64]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-dot-screen [options]="{ scale: 0.8, angle: 0.5 }" />
			<ngtp-brightness-contrast [options]="{ contrast: 0.3 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpDotScreen, NgtpBrightnessContrast],
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
