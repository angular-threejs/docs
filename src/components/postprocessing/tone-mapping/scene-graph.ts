import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpToneMapping } from 'angular-three-postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- High-intensity lights to demonstrate HDR tone mapping -->
		<ngt-ambient-light [intensity]="0.2" />
		<ngt-point-light [position]="[3, 3, 3]" [intensity]="50" color="#ff9500" />
		<ngt-point-light [position]="[-3, 2, 2]" [intensity]="30" color="#00a8ff" />
		<ngt-spot-light [position]="[0, 5, 0]" [intensity]="40" [angle]="0.5" [penumbra]="0.5" />

		<!-- Reflective metallic sphere -->
		<ngt-mesh #sphere [position]="[0, 0, 0]">
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngt-mesh-standard-material color="white" [metalness]="1" [roughness]="0.1" />
		</ngt-mesh>

		<!-- Secondary objects -->
		<ngt-mesh [position]="[-2, -0.5, -1]">
			<ngt-torus-knot-geometry *args="[0.3, 0.1, 100, 16]" />
			<ngt-mesh-standard-material color="white" [metalness]="0.8" [roughness]="0.2" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, 0.5, -1]">
			<ngt-dodecahedron-geometry *args="[0.5, 0]" />
			<ngt-mesh-standard-material color="white" [metalness]="0.9" [roughness]="0.15" />
		</ngt-mesh>

		<!-- Ground plane -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1.5, 0]">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngt-mesh-standard-material color="#222" [metalness]="0.5" [roughness]="0.5" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<!-- ACES Filmic tone mapping for cinematic look -->
			<ngtp-tone-mapping [options]="{ mode: ToneMappingMode.ACES_FILMIC }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpToneMapping],
})
export class SceneGraph {
	protected readonly Math = Math;
	protected readonly ToneMappingMode = ToneMappingMode;

	private sphereRef = viewChild.required<ElementRef<THREE.Mesh>>('sphere');

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			this.sphereRef().nativeElement.rotation.y = t * 0.3;
		});
	}
}
