import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpBloom, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Glowing orbs -->
		<ngt-mesh #mesh1 [position]="[-1.5, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff0066" [emissive]="'#ff0066'" [emissiveIntensity]="2" />
		</ngt-mesh>

		<ngt-mesh #mesh2 [position]="[0, 0, 0]">
			<ngt-sphere-geometry *args="[0.6, 32, 32]" />
			<ngt-mesh-standard-material color="#00ffff" [emissive]="'#00ffff'" [emissiveIntensity]="2" />
		</ngt-mesh>

		<ngt-mesh #mesh3 [position]="[1.5, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ffff00" [emissive]="'#ffff00'" [emissiveIntensity]="2" />
		</ngt-mesh>

		<ngt-ambient-light [intensity]="0.1" />

		<ngtp-effect-composer>
			<ngtp-bloom
				[options]="{
					luminanceThreshold: 0.2,
					luminanceSmoothing: 0.9,
					intensity: 1.5,
					mipmapBlur: true,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpBloom],
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

			mesh1.position.y = Math.sin(t * 2) * 0.5;
			mesh2.position.y = Math.sin(t * 2 + 2) * 0.5;
			mesh3.position.y = Math.sin(t * 2 + 4) * 0.5;
		});
	}
}
