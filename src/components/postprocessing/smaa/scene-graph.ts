import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpSMAA } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Sharp-edged geometry to show anti-aliasing -->
		<ngt-mesh #mesh [rotation]="[0.5, 0.5, 0]">
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-standard-material color="#3498db" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, 0, -1]" [rotation]="[0.3, 0.7, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#e74c3c" />
		</ngt-mesh>

		<ngt-mesh [position]="[-2, 0, -1]" [rotation]="[0.7, 0.3, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#2ecc71" />
		</ngt-mesh>

		<!-- Disable multisampling and use SMAA instead -->
		<ngtp-effect-composer [options]="{ multisampling: 0 }">
			<ngtp-smaa />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpSMAA],
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
