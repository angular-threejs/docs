import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
import { NgtsRenderTexture } from 'angular-three-soba/staging';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Main cube with render texture -->
		<ngt-mesh #cube [rotation]="[0, Math.PI / 6, 0]">
			<ngt-box-geometry *args="[2, 2, 2]" />
			<ngt-mesh-standard-material>
				<ngts-render-texture [options]="{ anisotropy: 16 }">
					<ng-template renderTextureContent>
						<!-- Inner scene camera -->
						<ngts-perspective-camera
							[options]="{ manual: true, makeDefault: true, aspect: 1, position: [0, 0, 5] }"
						/>

						<!-- Inner scene background -->
						<ngt-color attach="background" *args="['#1a1a2e']" />

						<!-- Inner scene lighting -->
						<ngt-ambient-light [intensity]="0.5 * Math.PI" />
						<ngt-point-light [position]="[5, 5, 5]" [intensity]="Math.PI" />

						<!-- Inner scene content - spinning torus knot -->
						<ngt-mesh #innerMesh>
							<ngt-torus-knot-geometry *args="[0.8, 0.3, 128, 32]" />
							<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.5" [roughness]="0.3" />
						</ngt-mesh>
					</ng-template>
				</ngts-render-texture>
			</ngt-mesh-standard-material>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsRenderTexture, NgtsPerspectiveCamera],
})
export class SceneGraph {
	protected readonly Math = Math;

	private cubeRef = viewChild<ElementRef<THREE.Mesh>>('cube');
	private innerMeshRef = viewChild<ElementRef<THREE.Mesh>>('innerMesh');

	constructor() {
		beforeRender(({ delta }) => {
			const cube = this.cubeRef()?.nativeElement;
			const innerMesh = this.innerMeshRef()?.nativeElement;

			if (cube) {
				cube.rotation.y += delta * 0.3;
			}

			if (innerMesh) {
				innerMesh.rotation.x += delta;
				innerMesh.rotation.y += delta * 0.5;
			}
		});
	}
}
