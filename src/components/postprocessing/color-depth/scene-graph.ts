import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpColorDepth, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Gradient sphere to show color banding -->
		<ngt-mesh #mesh1 [position]="[-1.2, 0, 0]">
			<ngt-sphere-geometry *args="[0.7, 32, 32]" />
			<ngt-mesh-standard-material color="#ff9a56" [metalness]="0.2" [roughness]="0.6" />
		</ngt-mesh>

		<ngt-mesh #mesh2 [position]="[1.2, 0, 0]">
			<ngt-torus-geometry *args="[0.5, 0.2, 16, 32]" />
			<ngt-mesh-standard-material color="#56c4ff" [metalness]="0.2" [roughness]="0.6" />
		</ngt-mesh>

		<!-- Ground plane with gradient -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -1.2, 0]">
			<ngt-plane-geometry *args="[8, 8]" />
			<ngt-mesh-standard-material color="#8b5cf6" [metalness]="0.1" [roughness]="0.8" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<!-- Low bit depth creates visible color banding (posterization) -->
			<ngtp-color-depth [options]="{ bits: 3 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpColorDepth],
})
export class SceneGraph {
	protected readonly Math = Math;

	private mesh1Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh1');
	private mesh2Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh2');

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const mesh1 = this.mesh1Ref().nativeElement;
			const mesh2 = this.mesh2Ref().nativeElement;

			mesh1.rotation.y = t * 0.3;
			mesh2.rotation.x = t * 0.4;
			mesh2.rotation.y = t * 0.5;
		});
	}
}
