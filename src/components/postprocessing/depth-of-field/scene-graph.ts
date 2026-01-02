import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpDepthOfField, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Row of spheres at different depths -->
		<ngt-mesh [position]="[-3, 0, -6]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#e74c3c" />
		</ngt-mesh>

		<ngt-mesh [position]="[-1.5, 0, -3]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#f39c12" />
		</ngt-mesh>

		<ngt-mesh #focusMesh [position]="[0, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#2ecc71" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.5, 0, 3]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#3498db" />
		</ngt-mesh>

		<ngt-mesh [position]="[3, 0, 6]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#9b59b6" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-depth-of-field
				[options]="{
					focusDistance: 0,
					focalLength: 0.05,
					bokehScale: 6,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpDepthOfField],
})
export class SceneGraph {
	private focusMeshRef = viewChild.required<ElementRef<THREE.Mesh>>('focusMesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.focusMeshRef().nativeElement;
			mesh.rotation.y += delta * 0.5;
		});
	}
}
