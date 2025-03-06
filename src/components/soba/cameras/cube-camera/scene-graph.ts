import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	input,
	viewChild,
} from '@angular/core';
import { extend, injectBeforeRender, NgtArgs, type NgtVector3 } from 'angular-three';
import { NgtsCameraContent, NgtsCubeCamera } from 'angular-three-soba/cameras';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import * as THREE from 'three';

@Component({
	selector: 'app-cube-camera-sphere',
	template: `
		<ngts-cube-camera [options]="{ position: position() }">
			<ngt-mesh *cameraContent="let texture" #mesh>
				<ngt-sphere-geometry *args="[5, 64, 64]" />
				<ngt-mesh-standard-material [roughness]="0" [metalness]="1" [envMap]="texture" />
			</ngt-mesh>
		</ngts-cube-camera>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsCubeCamera, NgtsCameraContent, NgtArgs],
})
export class CubeCameraSphere {
	position = input<NgtVector3>([0, 0, 0]);
	offset = input(0);

	private mesh = viewChild<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		injectBeforeRender(({ clock }) => {
			const mesh = this.mesh()?.nativeElement;
			if (!mesh) return;
			mesh.position.y = Math.sin(this.offset() + clock.elapsedTime) * 5;
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color *args="['#000000']" attach="background" />
		<ngt-fog *args="['#f0f0f0', 100, 200]" attach="fog" />

		<app-cube-camera-sphere [position]="[-10, 10, 0]" />
		<app-cube-camera-sphere [position]="[10, 9, 0]" [offset]="2000" />

		<ngt-mesh [position]="[0, 2.5, 0]">
			<ngt-box-geometry *args="[5, 5, 5]" />
			<ngt-mesh-basic-material color="hotpink" />
		</ngt-mesh>

		<ngt-grid-helper *args="[100, 10]" />

		<ngts-orbit-controls [options]="{ enableZoom: false }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, CubeCameraSphere, NgtsOrbitControls],
})
export class SceneGraph {
	constructor() {
		extend(THREE);
	}
}
