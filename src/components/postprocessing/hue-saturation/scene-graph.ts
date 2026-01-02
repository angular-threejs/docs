import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpHueSaturation } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Colorful spheres -->
		<ngt-mesh [position]="[-1.5, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#e74c3c" />
		</ngt-mesh>

		<ngt-mesh #mesh [position]="[0, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#2ecc71" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.5, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#3498db" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-hue-saturation
				[options]="{
					hue: hueShift,
					saturation: 0.3,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpHueSaturation],
})
export class SceneGraph {
	hueShift = 0;

	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ clock }) => {
			// Animate hue shift over time
			this.hueShift = Math.sin(clock.getElapsedTime() * 0.5) * Math.PI;

			const mesh = this.meshRef().nativeElement;
			mesh.rotation.y += 0.01;
		});
	}
}
