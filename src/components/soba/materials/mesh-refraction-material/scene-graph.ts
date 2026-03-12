import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsCameraContent, NgtsCubeCamera } from 'angular-three-soba/cameras';
import { NgtsMeshRefractionMaterial } from 'angular-three-soba/materials';
import { NgtsEnvironment } from 'angular-three-soba/staging';
import { Mesh } from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-environment [options]="{ preset: 'city', background: true, backgroundBlurriness: 0.1 }" />

		<ngts-cube-camera [options]="{ frames: 6, resolution: 256 }">
			<ng-template cameraContent let-texture>
				<ngt-mesh #crystal [scale]="1.2">
					<ngt-icosahedron-geometry *args="[1, 0]" />
					<ngts-mesh-refraction-material
						[envMap]="texture"
						[options]="{
							bounces: 3,
							ior: 2.4,
							fresnel: 1,
							aberrationStrength: 0.02,
							fastChroma: true,
							toneMapped: false,
						}"
					/>
				</ngt-mesh>
			</ng-template>
		</ngts-cube-camera>

		<ngt-point-light [position]="[-3, 2, 2]" color="#ff6b6b" [intensity]="50" />
		<ngt-point-light [position]="[3, 2, 2]" color="#4ecdc4" [intensity]="50" />
		<ngt-point-light [position]="[0, -2, 3]" color="#ffe66d" [intensity]="50" />

		<ngt-ambient-light [intensity]="0.5" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsMeshRefractionMaterial, NgtsCubeCamera, NgtsCameraContent, NgtsEnvironment],
})
export class SceneGraph {
	private crystalRef = viewChild<ElementRef<Mesh>>('crystal');

	constructor() {
		beforeRender(({ delta }) => {
			const crystal = this.crystalRef()?.nativeElement;
			if (crystal) {
				crystal.rotation.y += delta * 0.2;
				crystal.rotation.x += delta * 0.1;
			}
		});
	}
}
