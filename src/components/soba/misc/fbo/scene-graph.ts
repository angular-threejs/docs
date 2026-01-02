import {
	CUSTOM_ELEMENTS_SCHEMA,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	computed,
	viewChild,
} from '@angular/core';
import { NgtArgs, NgtPortal, NgtPortalContent, beforeRender } from 'angular-three';
import { NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
import { fbo } from 'angular-three-soba/misc';
import * as THREE from 'three';

@Component({
	selector: 'app-spinning-content',
	template: `
		<ngt-mesh #mesh>
			<ngt-torus-knot-geometry *args="[0.5, 0.15, 128, 32]" />
			<ngt-mesh-normal-material />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs],
})
export class SpinningContent {
	private meshRef = viewChild<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		beforeRender(({ delta }) => {
			const mesh = this.meshRef()?.nativeElement;
			if (mesh) {
				mesh.rotation.x += delta;
				mesh.rotation.y += delta * 0.5;
			}
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Off-screen camera for FBO rendering -->
		<ngts-perspective-camera [options]="{ position: [0, 0, 3], makeDefault: false }" />

		<!-- Portal scene rendered to FBO -->
		<ngt-portal [container]="portalScene()">
			<ng-template portalContent>
				<ngt-color *args="['#1a1a2e']" attach="background" />
				<ngt-ambient-light [intensity]="0.5" />
				<ngt-point-light [position]="[5, 5, 5]" [intensity]="Math.PI" />
				<app-spinning-content />
			</ng-template>
		</ngt-portal>

		<!-- Display FBO texture on a box -->
		<ngt-mesh [rotation]="[0, Math.PI / 6, 0]">
			<ngt-box-geometry *args="[2, 2, 2]" />
			<ngt-mesh-basic-material [map]="target.texture" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtPortal, NgtPortalContent, NgtsPerspectiveCamera, SpinningContent],
})
export class SceneGraph {
	protected readonly Math = Math;

	private cameraRef = viewChild(NgtsPerspectiveCamera);

	portalScene = computed(() => new THREE.Scene());
	target = fbo(() => ({ width: 512, height: 512, settings: { samples: 4 } }));

	constructor() {
		beforeRender(({ gl }) => {
			const camera = this.cameraRef()?.cameraRef()?.nativeElement;
			const scene = this.portalScene();
			if (camera && scene) {
				gl.setRenderTarget(this.target);
				gl.render(scene, camera);
				gl.setRenderTarget(null);
			}
		});
	}
}
