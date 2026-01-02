import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { NgtArgs, beforeRender } from 'angular-three';
import { NgtsMask, mask } from 'angular-three-soba/staging';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Circular mask -->
		<ngts-mask [id]="1">
			<ngt-circle-geometry *args="[1, 64]" />
		</ngts-mask>

		<!-- Content visible INSIDE the mask -->
		<ngt-mesh #maskedMesh>
			<ngt-torus-knot-geometry *args="[0.8, 0.3, 128, 32]" />
			<ngt-mesh-standard-material
				color="#ff6b6b"
				[stencilWrite]="true"
				[stencilRef]="insideMaskProps().stencilRef"
				[stencilFunc]="insideMaskProps().stencilFunc"
			/>
		</ngt-mesh>

		<!-- Content visible OUTSIDE the mask (inverted) -->
		<ngt-mesh [position]="[0, 0, -1]">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngt-mesh-standard-material
				color="#4ecdc4"
				[stencilWrite]="true"
				[stencilRef]="outsideMaskProps().stencilRef"
				[stencilFunc]="outsideMaskProps().stencilFunc"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsMask],
})
export class SceneGraph {
	private maskedMeshRef = viewChild<ElementRef<THREE.Mesh>>('maskedMesh');

	// Show content only inside the mask
	insideMaskProps = mask(() => 1);

	// Show content only outside the mask (inverted)
	outsideMaskProps = mask(
		() => 1,
		() => true,
	);

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.maskedMeshRef()?.nativeElement;
			if (mesh) {
				mesh.rotation.x += delta * 0.5;
				mesh.rotation.y += delta * 0.3;
			}
		});
	}
}
