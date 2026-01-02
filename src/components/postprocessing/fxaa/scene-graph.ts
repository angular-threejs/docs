import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpFXAA } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Sharp-edged geometry to show anti-aliasing effect -->
		<ngt-group #group>
			<ngt-mesh [position]="[-1.5, 0.5, 0]" [rotation]="[0.5, 0.5, 0]">
				<ngt-box-geometry *args="[1, 1, 1]" />
				<ngt-mesh-standard-material color="#3b82f6" [metalness]="0.3" [roughness]="0.4" />
			</ngt-mesh>

			<ngt-mesh [position]="[0, 0, 0]" [rotation]="[0.3, 0.7, 0]">
				<ngt-box-geometry *args="[1.2, 1.2, 1.2]" />
				<ngt-mesh-standard-material color="#ef4444" [metalness]="0.3" [roughness]="0.4" />
			</ngt-mesh>

			<ngt-mesh [position]="[1.5, -0.3, 0]" [rotation]="[0.7, 0.3, 0]">
				<ngt-box-geometry *args="[0.8, 0.8, 0.8]" />
				<ngt-mesh-standard-material color="#22c55e" [metalness]="0.3" [roughness]="0.4" />
			</ngt-mesh>

			<!-- Thin lines that benefit from anti-aliasing -->
			<ngt-mesh [position]="[0, -1.5, 0]" [rotation]="[0, 0, Math.PI / 4]">
				<ngt-box-geometry *args="[4, 0.02, 0.02]" />
				<ngt-mesh-standard-material color="white" />
			</ngt-mesh>

			<ngt-mesh [position]="[0, -1.5, 0]" [rotation]="[0, 0, -Math.PI / 4]">
				<ngt-box-geometry *args="[4, 0.02, 0.02]" />
				<ngt-mesh-standard-material color="white" />
			</ngt-mesh>
		</ngt-group>

		<!-- Disable multisampling and use FXAA instead -->
		<ngtp-effect-composer [options]="{ multisampling: 0 }">
			<ngtp-fxaa />
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpFXAA],
})
export class SceneGraph {
	protected readonly Math = Math;

	private groupRef = viewChild.required<ElementRef<THREE.Group>>('group');

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			this.groupRef().nativeElement.rotation.y = t * 0.2;
		});
	}
}
