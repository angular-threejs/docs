import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpColorDepth, NgtpEffectComposer, NgtpPixelation } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh [position]="[-1.5, 0, 0]">
			<ngt-dodecahedron-geometry *args="[1]" />
			<ngt-mesh-standard-material color="limegreen" />
		</ngt-mesh>

		<ngt-mesh #mesh2 [position]="[1.5, 0, 0]">
			<ngt-icosahedron-geometry *args="[1]" />
			<ngt-mesh-standard-material color="coral" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-pixelation [options]="{ granularity: 8 }" />
			<ngtp-color-depth [options]="{ bits: 4 }" />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpPixelation, NgtpColorDepth],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');
	private mesh2Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh2');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			const mesh2 = this.mesh2Ref().nativeElement;
			mesh.rotation.x += delta * 0.4;
			mesh.rotation.y += delta * 0.2;
			mesh2.rotation.x -= delta * 0.3;
			mesh2.rotation.y += delta * 0.4;
		});
	}
}
