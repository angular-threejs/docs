import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, loaderResource, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpLUT } from 'angular-three-postprocessing';
import * as THREE from 'three';
import { LUTCubeLoader } from 'three-stdlib';

import cubicleCube from '@common-assets/cubicle-99.CUBE' with { loader: 'file' };

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Colorful scene to demonstrate LUT color grading -->
		<ngt-mesh #mesh1 [position]="[-1.2, 0.5, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<ngt-mesh #mesh2 [position]="[0, 0, 0]">
			<ngt-torus-knot-geometry *args="[0.4, 0.15, 100, 16]" />
			<ngt-mesh-standard-material color="#4ecdc4" [metalness]="0.4" [roughness]="0.3" />
		</ngt-mesh>

		<ngt-mesh #mesh3 [position]="[1.2, -0.3, 0]">
			<ngt-dodecahedron-geometry *args="[0.5, 0]" />
			<ngt-mesh-standard-material color="#ffe66d" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1.2, 0]">
			<ngt-plane-geometry *args="[8, 8]" />
			<ngt-mesh-standard-material color="#e0e0e0" [metalness]="0.1" [roughness]="0.8" />
		</ngt-mesh>

		<ngtp-effect-composer>
			@if (lutResult.value(); as lut) {
				<ngtp-lut [options]="{ lut, tetrahedralInterpolation: true }" />
			}
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpLUT],
})
export class SceneGraph {
	protected readonly Math = Math;

	// Load the LUT cube file
	protected lutResult = loaderResource(
		() => LUTCubeLoader,
		() => cubicleCube,
	);

	private mesh1Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh1');
	private mesh2Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh2');
	private mesh3Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh3');

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const mesh1 = this.mesh1Ref().nativeElement;
			const mesh2 = this.mesh2Ref().nativeElement;
			const mesh3 = this.mesh3Ref().nativeElement;

			mesh1.rotation.y = t * 0.3;
			mesh2.rotation.x = t * 0.4;
			mesh2.rotation.y = t * 0.5;
			mesh3.rotation.x = t * 0.3;
			mesh3.rotation.y = t * 0.4;
		});
	}
}
