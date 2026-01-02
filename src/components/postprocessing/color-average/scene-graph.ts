import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpColorAverage, NgtpEffectComposer, NgtpVignette } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Colorful scene that will be converted to grayscale -->
		<ngt-mesh #mesh1 [position]="[-1.5, 0, 0]">
			<ngt-torus-knot-geometry *args="[0.4, 0.15, 100, 16]" />
			<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<ngt-mesh #mesh2 [position]="[0, 0, 0]">
			<ngt-dodecahedron-geometry *args="[0.6, 0]" />
			<ngt-mesh-standard-material color="#4ecdc4" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<ngt-mesh #mesh3 [position]="[1.5, 0, 0]">
			<ngt-octahedron-geometry *args="[0.5, 0]" />
			<ngt-mesh-standard-material color="#ffe66d" [metalness]="0.3" [roughness]="0.4" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-color-average />
			<ngtp-vignette [options]="{ darkness: 0.5, offset: 0.3 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpColorAverage, NgtpVignette],
})
export class SceneGraph {
	private mesh1Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh1');
	private mesh2Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh2');
	private mesh3Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh3');

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const mesh1 = this.mesh1Ref().nativeElement;
			const mesh2 = this.mesh2Ref().nativeElement;
			const mesh3 = this.mesh3Ref().nativeElement;

			mesh1.rotation.x = t * 0.5;
			mesh1.rotation.y = t * 0.3;
			mesh2.rotation.x = t * 0.4;
			mesh2.rotation.y = t * 0.6;
			mesh3.rotation.x = t * 0.3;
			mesh3.rotation.y = t * 0.5;
		});
	}
}
