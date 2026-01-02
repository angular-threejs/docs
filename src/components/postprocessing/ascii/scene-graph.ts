import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpASCII, NgtpEffectComposer } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-knot-geometry *args="[1, 0.3, 128, 32]" />
			<ngt-mesh-standard-material color="white" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-ascii
				[options]="{
					fontSize: 54,
					cellSize: 12,
					color: '#00ff00',
					characters: ' .:-=+*#%@',
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpASCII],
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.5;
			mesh.rotation.y += delta * 0.3;
		});
	}
}
