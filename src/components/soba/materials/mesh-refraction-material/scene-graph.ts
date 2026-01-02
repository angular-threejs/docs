import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsCameraContent, NgtsCubeCamera } from 'angular-three-soba/cameras';
import { NgtsMeshRefractionMaterial } from 'angular-three-soba/materials';
import { NgtsEnvironment } from 'angular-three-soba/staging';
import { Mesh } from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- HDRI Environment - this is what gets refracted through the crystal -->
		<ngts-environment [options]="{ preset: 'sunset', background: true, backgroundBlurriness: 0.3 }" />

		<!-- CubeCamera captures the surrounding environment for refraction calculations -->
		<ngts-cube-camera [options]="{ frames: Infinity, resolution: 256 }">
			<ng-template cameraContent let-texture>
				<!--
					Crystal/Diamond mesh - the refraction material makes it appear
					as a transparent gem that bends light with chromatic aberration
					(rainbow color splitting like a real diamond/prism)
				-->
				<ngt-mesh #crystal [scale]="1.2">
					<!-- Icosahedron with subdivision creates diamond-like facets -->
					<ngt-icosahedron-geometry *args="[1, 0]" />
					<ngts-mesh-refraction-material
						[envMap]="texture"
						[options]="{
							bounces: 4,
							ior: 2.4,
							fresnel: 1,
							aberrationStrength: 0.04,
							fastChroma: true,
							toneMapped: false,
							color: 'red',
						}"
					/>
				</ngt-mesh>
			</ng-template>
		</ngts-cube-camera>

		<!-- Small colored lights to show how they refract through the crystal -->
		<ngt-point-light [position]="[-3, 2, 2]" color="#ff6b6b" [intensity]="50" />
		<ngt-point-light [position]="[3, 2, 2]" color="#4ecdc4" [intensity]="50" />
		<ngt-point-light [position]="[0, -2, 3]" color="#ffe66d" [intensity]="50" />

		<ngt-ambient-light [intensity]="0.2" />
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
