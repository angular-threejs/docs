import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, extend, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsContactShadows, NgtsEnvironment, NgtsLightformer } from 'angular-three-soba/staging';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-environment [options]="{ background: true, preset: 'sunset' }">
			<ng-template>
				<ngt-color *args="['black']" attach="background" />
				<ngts-lightformer
					[options]="{ position: [0, 0, -5], scale: 10, color: 'red', intensity: 10, form: 'ring' }"
				/>
			</ng-template>
		</ngts-environment>

		<ngt-mesh [position.x]="-1.5">
			<ngt-sphere-geometry />
			<ngt-mesh-standard-material color="orange" />
		</ngt-mesh>

		<ngt-mesh #cube [position.x]="1.5" [scale]="1.5">
			<ngt-box-geometry />
			<ngt-mesh-standard-material color="mediumpurple" />
		</ngt-mesh>

		<ngt-mesh [position.y]="-1" [rotation.x]="-Math.PI / 2" [scale]="10">
			<ngt-plane-geometry />
			<ngt-mesh-standard-material color="greenyellow" />
		</ngt-mesh>

		<ngts-contact-shadows
			[options]="{ position: [0, -0.99, 0], scale: 10, resolution: 512, opacity: 0.4, blur: 2.8 }"
		/>

		<ngts-orbit-controls
			[options]="{ makeDefault: true, autoRotate: true, autoRotateSpeed: 0.5, enablePan: false }"
		/>
	`,
	imports: [NgtsEnvironment, NgtsLightformer, NgtsContactShadows, NgtArgs, NgtsOrbitControls],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
	protected readonly Math = Math;

	private cube = viewChild.required<ElementRef<THREE.Mesh>>('cube');

	constructor() {
		extend(THREE);

		beforeRender(({ delta }) => {
			const cube = this.cube().nativeElement;
			cube.rotation.y += delta * 0.2;
		});
	}
}
