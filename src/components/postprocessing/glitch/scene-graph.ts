import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpGlitch } from 'angular-three-postprocessing';
import { GlitchMode } from 'postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh #mesh>
			<ngt-icosahedron-geometry *args="[1.2, 1]" />
			<ngt-mesh-standard-material color="#ff00ff" [flatShading]="true" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-glitch
				[options]="{
					mode: GlitchMode.SPORADIC,
					delay: [0.5, 1],
					duration: [0.1, 0.3],
					strength: [0.1, 0.3],
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpGlitch],
})
export class SceneGraph {
	protected GlitchMode = GlitchMode;

	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += delta * 0.2;
			mesh.rotation.y += delta * 0.3;
		});
	}
}
